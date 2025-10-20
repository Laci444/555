import os

from dotenv import load_dotenv

load_dotenv("../../.env")

SECRET_KEY = os.environ["DJANGO_SECRET_KEY"]
HASHIDS_SALT = os.environ["HASHIDS_SALT"]
DEBUG = False
