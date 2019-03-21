import os
basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    TESTING = False
    CSRF_ENABLED = True
    SECRET_KEY = 'totally_ubreakable'


class ProductionConfig(Config):
    FLASK_ENV = 'production'
    DEBUG = False


class StagingConfig(Config):
    FLASK_ENV = 'development'
    DEBUG = True


class DevelopmentConfig(Config):
    FLASK_ENV = 'development'
    DEBUG = True


class TestingConfig(Config):
    TESTING = True
