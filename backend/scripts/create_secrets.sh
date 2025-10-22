python -c 'import secrets; print(f"DJANGO_SECRET_KEY={secrets.token_urlsafe(64)}\nHASHIDS_SALT={secrets.token_urlsafe(32)}")' > ../.env
