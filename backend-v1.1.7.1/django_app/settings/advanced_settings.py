import os

import environ
from django.core.management.utils import get_random_secret_key

from .settings import *

root = environ.Path(__file__) - 3  # get root of the project

env = environ.Env()
if os.path.exists(os.path.join(root, ".env")):
    environ.Env.read_env(os.path.join(root, ".env"))

BASE_DIR = Path(__file__).resolve().parent.parent


INSTALLED_APPS += [
    "drf_yasg",
    "rest_framework",
    "drf_spectacular",
    "django_typomatic",
    "django_celery_beat",
    "django_filters",
    "corsheaders",
    "storages",
    "seo",
    "adminsortable2",
    "nested_admin",
    "tinymce",
]

FRONTEND_MODULES = [
    "api",
    "history",
    "modules",
    "project",
    "callback",
    "notification",
    "user",
    "team",
    "bank",
    "setting",
    "career",
    "partners",
    "news",
]

INSTALLED_APPS += FRONTEND_MODULES

LANGUAGE_CODE = "ru-ru"
TIME_ZONE = "Europe/Moscow"

SECRET_KEY = env.str("DJANGO_SECRET_KEY", default=get_random_secret_key())
DEBUG = env.bool("DEBUG", default=True)
ALLOWED_HOSTS = env.list("ALLOWED_HOSTS", default=["*"])

# Project
PROJECT_NAME = env.str("PROJECT_NAME", "Some project")
PROJECT_DESCRIPTION = env.str("PROJECT_DESCRIPTION", "Project Description")
API_INFO = {
    "title": f"{PROJECT_NAME} API",
    "description": f"API for {PROJECT_DESCRIPTION}",
}

# File
MAX_UPLOAD_SIZE = 104857600
DATA_UPLOAD_MAX_MEMORY_SIZE = 104857600
FILE_UPLOAD_MAX_MEMORY_SIZE = 104857600

# Database
LOCAL_DATABASE = env.bool("LOCAL_DATABASE", True)
if LOCAL_DATABASE:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / Path("db.sqlite3"),
            "USER": env.str("DB_USER", "user"),
            "PASSWORD": env.str("DB_PASSWORD", "password"),
        },
    }
else:
    DATABASES = {
        "default": {
            "ENGINE": env.str("DJANGO_DB_ENGINE", None),
            "NAME": env.str("DB_NAME", None),
            "USER": env.str("DB_USER", None),
            "PASSWORD": env.str("DB_PASSWORD", None),
            "HOST": env.str("DJANGO_DB_HOST", None),
            "PORT": env.int("DJANGO_DB_PORT", None),
        },
    }

REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": [],
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "django_app.auth.CsrfExemptSessionAuthentication",
        "rest_framework.authentication.SessionAuthentication",
        "rest_framework.authentication.BasicAuthentication",
    ],
    "DEFAULT_FILTER_BACKENDS": ("django_filters.rest_framework.DjangoFilterBackend",),
}

AUTHENTICATION_BACKENDS = [
    "django.contrib.auth.backends.ModelBackend",
]

SPECTACULAR_SETTINGS = {
    "DISABLE_ERRORS_AND_WARNINGS": True,
    "SERVE_INCLUDE_SCHEMA": False,
    "SERVE_PERMISSIONS": ["api.permissions.RestrictOnProduction"],
    **API_INFO,
}

HOST = env.str("HOST", "http://localhost:8000")

CSRF_TRUSTED_ORIGINS = env.list("DJANGO_CSRF_TRUSTED_ORIGINS", default=[])

if DEBUG:
    CORS_ALLOW_ALL_ORIGINS = True
else:
    CORS_ALLOWED_ORIGINS = env.list("DJANGO_CORS_ALLOWED_ORIGINS", default=[])

CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.redis.RedisCache",
        "LOCATION": env.str("REDIS_URL", "redis://localhost:6379"),
    },
}

# Email
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = env.str("EMAIL_HOST", default="127.0.0.1")
EMAIL_HOST_USER = env.str("EMAIL_HOST_USER", default="")
EMAIL_HOST_PASSWORD = env.str("EMAIL_HOST_PASSWORD", default="")
EMAIL_PORT = env.int("EMAIL_PORT", default=1025)
EMAIL_USE_TLS = env.bool("EMAIL_USE_TLS", default=False)
EMAIL_USE_SSL = env.bool("EMAIL_USE_SSL", default=False)

# Static and media
STATIC_URL = "api/static/"
STATIC_ROOT = BASE_DIR / "static"

MEDIA_URL = "api/media/"
MEDIA_ROOT = BASE_DIR / "media"

# S3 Media
DEFAULT_FILE_STORAGE = "django_app.storages.yandex.YandexS3Storage"
YANDEX_CLIENT_DOCS_BUCKET_NAME = env.str("AWS_STORAGE_BUCKET_NAME", default=None)
AWS_ACCESS_KEY_ID = env.str("AWS_ACCESS_KEY_ID", default=None)
AWS_SECRET_ACCESS_KEY = env.str("AWS_SECRET_ACCESS_KEY", default=None)
AWS_S3_ENDPOINT_URL = "https://storage.yandexcloud.net"
AWS_S3_REGION_NAME = "storage"
AWS_QUERYSTRING_AUTH = False

# SEO
SEO_USE_URL_SEO = False
SEO_DEBUG_MODE = True
SEO_IMAGE_WIDTH = 250
SEO_IMAGE_HEIGHT = 400
SEO_VIEWS_CHOICES = (
    ("index", "Главная страница"),
    ("about", "О нас"),
)

# URL
URL_SITE = env.str("URL_SITE", default=None)

# TinyMCE
TINYMCE_DEFAULT_CONFIG = {
    "theme": "silver",
    "height": 500,
    "menubar": False,
    "browser_spellcheck": True,
    "plugins": "advlist,autolink,lists,link,charmap,"
    "searchreplace,visualblocks,code,fullscreen,insertdatetime,"
    "help,wordcount",
    "toolbar": "undo redo | formatselect | "
    "bold italic backcolor | alignleft aligncenter "
    "alignright alignjustify | bullist numlist outdent indent | "
    "removeformat | help",
    "branding": False,
    "paste_data_images": False,
}
