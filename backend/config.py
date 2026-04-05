import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    """Base configuration"""
    SUPABASE_URL = os.getenv('SUPABASE_URL')
    SUPABASE_KEY = os.getenv('SUPABASE_PUBLISHABLE_DEFAULT_KEY')
    SUPABASE_SECRET_KEY = os.getenv('SUPABASE_SECRET_KEY')
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key')
    JWT_SECRET = os.getenv('JWT_SECRET', 'jwt-secret-key')
    FLASK_ENV = os.getenv('FLASK_ENV', 'development')

class DevelopmentConfig(Config):
    """Development configuration"""
    DEBUG = True

class ProductionConfig(Config):
    """Production configuration"""
    DEBUG = False

config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}
