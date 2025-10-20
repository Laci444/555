import os

from dotenv import load_dotenv

from .base import *  # noqa: F403

load_dotenv()

environment = os.environ.get("environment", "production")

if environment == "development":
    from .dev import *  # noqa: F403
elif environment == "production":
    from .prod import *  # noqa: F403
else:
    raise Exception("Incorrect valude for 'environment' variable")
