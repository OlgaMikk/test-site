from .advanced_settings import env

# Celery settings
CELERY_RESULT_BACKEND = env.str("REDIS_URL", "redis://localhost:6379") + "/0"
CELERY_BROKER_URL = env.str("REDIS_URL", "redis://localhost:6379") + "/0"
CELERY_CACHE_BACKEND = "default"
CELERY_CREATE_MISSING_QUEUES = True
