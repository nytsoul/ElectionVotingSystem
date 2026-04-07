from flask import Flask, jsonify, request
from flask_cors import CORS
from supabase import create_client, Client
from config import config
import os
import jwt
from datetime import datetime, timedelta
from functools import wraps
import secrets
import hashlib

# Initialize Flask app
app = Flask(__name__)
app.config.from_object(config[os.getenv('FLASK_ENV', 'development')])

# Enable CORS - allow both development and production origins
cors_origins = [
    "http://localhost:3000",
    "http://localhost:3001",
    os.getenv('FRONTEND_URL', 'http://localhost:3000'),
]
CORS(app, resources={r"/api/*": {"origins": cors_origins}})

# Initialize Supabase
supabase: Client = create_client(
    app.config['SUPABASE_URL'],
    app.config['SUPABASE_KEY']
)

# JWT Token decorator
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'error': 'Token is missing'}), 401
        
        try:
            token = token.split(' ')[1]
            data = jwt.decode(token, app.config['JWT_SECRET'], algorithms=['HS256'])
            current_user = data
        except:
            return jsonify({'error': 'Token is invalid'}), 401
        
        return f(current_user, *args, **kwargs)
    return decorated

# Initialize database (run once to create tables)
def init_db():
    """Create necessary tables in Supabase"""
    try:
        # Create users table
        supabase.table('users').select('*').limit(1).execute()
    except:
        print("Users table already exists or connection successful")

# Health check
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'ok', 'message': 'Voting System API is running'}), 200

# Setup admin account (for development)
@app.route('/api/setup/create-admin', methods=['POST'])
def create_admin():
    """Create an admin account (development only)"""
    try:
        # Check if admin already exists
        admin_response = supabase.table('users').select('*').eq('role', 'admin').execute()
        if admin_response.data:
            return jsonify({'error': 'Admin account already exists', 'admin': admin_response.data[0]['voter_id']}), 409
        
        # Check if request has required fields
        data = request.get_json()
        if not all(k in data for k in ['name', 'voter_id', 'password']):
            return jsonify({'error': 'Missing required fields: name, voter_id, password'}), 400
        
        # Check if voter_id already exists
        existing = supabase.table('users').select('*').eq('voter_id', data['voter_id']).execute()
        if existing.data:
            return jsonify({'error': 'Voter ID already exists'}), 409
        
        # Create admin user
        admin_response = supabase.table('users').insert({
            'name': data['name'],
            'age': 21,  # Default age for admin
            'voter_id': data['voter_id'],
            'password': data['password'],
            'role': 'admin',
            'has_voted': False,
            'created_at': datetime.utcnow().isoformat()
        }).execute()
        
        return jsonify({
            'message': 'Admin account created successfully',
            'admin': {
                'voter_id': data['voter_id'],
                'name': data['name']
            }
        }), 201
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Auth Routes
@app.route('/api/auth/register', methods=['POST'])
def register():
    """Register a new voter"""
    try:
        data = request.get_json()
        
        # Validation
        if not all(k in data for k in ['name', 'age', 'voter_id', 'password']):
            return jsonify({'error': 'Missing required fields'}), 400
        
        if int(data['age']) < 18:
            return jsonify({'error': 'Must be 18 years or older'}), 400
        
        # Check if voter_id already exists
        response = supabase.table('users').select('*').eq('voter_id', data['voter_id']).execute()
        if response.data:
            return jsonify({'error': 'Voter ID already exists'}), 409
        
        # Create user
        user_response = supabase.table('users').insert({
            'name': data['name'],
            'age': int(data['age']),
            'voter_id': data['voter_id'],
            'password': data['password'],
            'role': 'user',
            'has_voted': False,
            'created_at': datetime.utcnow().isoformat()
        }).execute()
        
        return jsonify({
            'message': 'Registration Successful',
            'user': user_response.data[0] if user_response.data else None
        }), 201
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/auth/login', methods=['POST'])
def login():
    """Login user"""
    try:
        data = request.get_json()
        
        if not data.get('voter_id') or not data.get('password'):
            return jsonify({'error': 'Missing voter_id or password'}), 400
        
        # Find user
        response = supabase.table('users').select('*').eq('voter_id', data['voter_id']).execute()
        
        if not response.data:
            return jsonify({'error': 'Invalid credentials'}), 401
        
        user = response.data[0]
        
        # Check password (in production, use hashing)
        if user['password'] != data['password']:
            return jsonify({'error': 'Invalid credentials'}), 401
        
        # Generate JWT token
        token = jwt.encode({
            'user_id': user['id'],
            'voter_id': user['voter_id'],
            'role': user['role'],
            'has_voted': user['has_voted'],
            'exp': datetime.utcnow() + timedelta(hours=24)
        }, app.config['JWT_SECRET'], algorithm='HS256')
        
        return jsonify({
            'message': 'Login successful',
            'token': token,
            'user': {
                'id': user['id'],
                'name': user['name'],
                'voter_id': user['voter_id'],
                'role': user['role'],
                'has_voted': user['has_voted']
            }
        }), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Voting Routes
@app.route('/api/voting/candidates', methods=['GET'])
@token_required
def get_candidates(current_user):
    """Get all candidates"""
    try:
        response = supabase.table('candidates').select('*').execute()
        return jsonify(response.data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/voting/vote', methods=['POST'])
@token_required
def vote(current_user):
    """Submit a vote"""
    try:
        data = request.get_json()
        user_id = current_user['user_id']
        
        # Check if user already voted
        user_response = supabase.table('users').select('*').eq('id', user_id).execute()
        user = user_response.data[0]
        
        if user['has_voted']:
            return jsonify({'error': 'You have already voted'}), 403
        
        # Check if election is active
        election_response = supabase.table('elections').select('*').eq('is_active', True).execute()
        if not election_response.data:
            return jsonify({'error': 'Election is closed'}), 403
        
        # Generate unique verification token
        verification_token = secrets.token_hex(16)
        
        # Record the vote with verification token
        vote_response = supabase.table('votes').insert({
            'user_id': user_id,
            'candidate_id': data['candidate_id'],
            'verification_token': verification_token,
            'voted_at': datetime.utcnow().isoformat()
        }).execute()
        
        # Update user has_voted status
        supabase.table('users').update({'has_voted': True}).eq('id', user_id).execute()
        
        return jsonify({
            'message': 'Vote submitted successfully',
            'verification_token': verification_token,
            'vote': vote_response.data[0] if vote_response.data else None
        }), 201
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/voting/status/<int:user_id>', methods=['GET'])
@token_required
def get_vote_status(current_user, user_id):
    """Get user's voting status"""
    try:
        response = supabase.table('users').select('*').eq('id', user_id).execute()
        if not response.data:
            return jsonify({'error': 'User not found'}), 404
        
        user = response.data[0]
        return jsonify({
            'has_voted': user['has_voted'],
            'message': 'You have already voted' if user['has_voted'] else 'You can vote'
        }), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Vote Verification Routes
@app.route('/api/voting/verify', methods=['GET'])
def verify_vote():
    """Verify a vote using verification token"""
    try:
        token = request.args.get('token')
        
        if not token:
            return jsonify({'error': 'Verification token is required'}), 400
        
        # Find vote by verification token
        vote_response = supabase.table('votes').select('*, candidates(name, party, symbol)').eq('verification_token', token).execute()
        
        if not vote_response.data:
            return jsonify({'error': 'Invalid verification token'}), 404
        
        vote = vote_response.data[0]
        candidate = vote.get('candidates', {})
        
        return jsonify({
            'message': 'Vote verified successfully',
            'verified': True,
            'candidate_name': candidate.get('name', 'Unknown'),
            'candidate_party': candidate.get('party', 'Unknown'),
            'candidate_symbol': candidate.get('symbol', ''),
            'voted_at': vote.get('voted_at'),
            'token': token
        }), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/voting/verification-status/<token>', methods=['GET'])
@token_required
def check_verification_status(current_user, token):
    """Check if a verification token exists and is valid"""
    try:
        vote_response = supabase.table('votes').select('*, candidates(name, party)').eq('verification_token', token).execute()
        
        if not vote_response.data:
            return jsonify({'verified': False, 'message': 'Token not found'}), 404
        
        vote = vote_response.data[0]
        candidate = vote.get('candidates', {})
        
        return jsonify({
            'verified': True,
            'message': 'Vote is recorded in the system',
            'candidate_name': candidate.get('name'),
            'candidate_party': candidate.get('party'),
            'voted_at': vote.get('voted_at')
        }), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Admin Routes
@app.route('/api/admin/candidates', methods=['POST'])
@token_required
def add_candidate(current_user):
    """Add a new candidate (Admin only)"""
    try:
        if current_user['role'] != 'admin':
            return jsonify({'error': 'Unauthorized'}), 403
        
        data = request.get_json()
        
        if not data.get('name') or not data.get('party'):
            return jsonify({'error': 'Missing required fields'}), 400
        
        response = supabase.table('candidates').insert({
            'name': data['name'],
            'party': data['party'],
            'symbol': data.get('symbol', ''),
            'votes': 0,
            'created_at': datetime.utcnow().isoformat()
        }).execute()
        
        return jsonify({
            'message': 'Candidate added successfully',
            'candidate': response.data[0] if response.data else None
        }), 201
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/admin/candidates/<int:candidate_id>', methods=['DELETE'])
@token_required
def delete_candidate(current_user, candidate_id):
    """Delete a candidate (Admin only)"""
    try:
        if current_user['role'] != 'admin':
            return jsonify({'error': 'Unauthorized'}), 403
        
        supabase.table('candidates').delete().eq('id', candidate_id).execute()
        
        return jsonify({'message': 'Candidate deleted successfully'}), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/admin/election/start', methods=['POST'])
@token_required
def start_election(current_user):
    """Start election (Admin only)"""
    try:
        if current_user['role'] != 'admin':
            return jsonify({'error': 'Unauthorized'}), 403
        
        response = supabase.table('elections').update({
            'is_active': True,
            'started_at': datetime.utcnow().isoformat()
        }).eq('id', 1).execute()
        
        return jsonify({
            'message': 'Election started',
            'election': response.data[0] if response.data else None
        }), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/admin/election/stop', methods=['POST'])
@token_required
def stop_election(current_user):
    """Stop election (Admin only)"""
    try:
        if current_user['role'] != 'admin':
            return jsonify({'error': 'Unauthorized'}), 403
        
        response = supabase.table('elections').update({
            'is_active': False,
            'ended_at': datetime.utcnow().isoformat()
        }).eq('id', 1).execute()
        
        return jsonify({
            'message': 'Election stopped',
            'election': response.data[0] if response.data else None
        }), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Results Routes
@app.route('/api/results', methods=['GET'])
def get_results():
    """Get election results"""
    try:
        # Get all candidates with vote counts
        candidates_response = supabase.table('candidates').select('*').execute()
        
        # Get votes per candidate
        votes_response = supabase.table('votes').select('*').execute()
        
        results = []
        for candidate in candidates_response.data:
            vote_count = len([v for v in votes_response.data if v['candidate_id'] == candidate['id']])
            results.append({
                'id': candidate['id'],
                'name': candidate['name'],
                'party': candidate['party'],
                'symbol': candidate['symbol'],
                'votes': vote_count
            })
        
        # Find winner
        winner = max(results, key=lambda x: x['votes']) if results else None
        
        return jsonify({
            'results': results,
            'winner': winner
        }), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/election/status', methods=['GET'])
def get_election_status():
    """Get current election status"""
    try:
        response = supabase.table('elections').select('*').eq('id', 1).execute()
        
        if response.data:
            election = response.data[0]
            return jsonify({
                'status': 'Live' if election['is_active'] else 'Closed',
                'is_active': election['is_active']
            }), 200
        
        return jsonify({'status': 'Closed', 'is_active': False}), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Route not found'}), 404

@app.errorhandler(500)
def server_error(error):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    init_db()
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('FLASK_ENV', 'development') == 'development'
    app.run(debug=debug, port=port, host='0.0.0.0')
