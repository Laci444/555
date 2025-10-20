import os
import random
import sys
from io import BytesIO

import django
import requests
from django.core.files import File
from django.utils import timezone
from hashids import Hashids

# --- Initialize Django environment ---
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "main.settings")
django.setup()

from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Permission
from news.models import Article


# Utility to download an image and return a Django File object
def download_image(url, filename):
    try:
        response = requests.get(url)
        response.raise_for_status()
        img_bytes = BytesIO(response.content)
        return File(img_bytes, name=filename)
    except Exception as e:
        print(f"⚠️ Could not download image {url}: {e}")
        return None


def load_mock_data(force: bool = False):
    User = get_user_model()
    hashids = Hashids(settings.HASHIDS_SALT, settings.HASHIDS_MIN_LENGTH)

    if not force and (User.objects.exists() or Article.objects.exists()):
        print("⚠️ Database is not empty — skipping mock data load.")
        return

    if force:
        print("🧨 Force mode enabled — clearing existing data...")
        Article.objects.all().delete()
        User.objects.all().delete()

    print("🧩 Loading mock data...")

    # --- Get permission object ---
    public_permission = Permission.objects.get(codename="is_public")

    # --- Create users ---
    image_urls = [
        "https://i.pravatar.cc/300?img=1",
        "https://i.pravatar.cc/300?img=2",
        "https://i.pravatar.cc/300?img=3",
        "https://i.pravatar.cc/300?img=4",
        "https://i.pravatar.cc/300?img=5",
        "https://i.pravatar.cc/300?img=6",
    ]

    users_data = [
        {
            "username": "admin",
            "email": "admin@example.com",
            "password": "admin",
            "is_staff": True,
            "is_superuser": True,
            "bio": "System administrator.",
            "first_name": "Admin",
            "last_name": "User",
            "profile_image": None,
            "public": False,
        },
        {
            "username": "alice",
            "email": "alice@example.com",
            "password": "password123",
            "bio": "Journalist covering tech and innovation.",
            "first_name": "Alice",
            "last_name": "Smith",
            "profile_image": random.choice(image_urls),
            "public": True,
        },
        {
            "username": "bob",
            "email": "bob@example.com",
            "password": "password123",
            "bio": "Writes about world news and global affairs.",
            "first_name": "Bob",
            "last_name": "Johnson",
            "profile_image": random.choice(image_urls),
            "public": True,
        },
        {
            "username": "charlie",
            "email": "charlie@example.com",
            "password": "password123",
            "bio": "Sports and entertainment enthusiast.",
            "first_name": "Charlie",
            "last_name": "Brown",
            "profile_image": random.choice(image_urls),
            "public": True,
        },
    ]

    users = []
    for user_data in users_data:
        user = User(
            username=user_data["username"],
            email=user_data["email"],
            bio=user_data["bio"],
            first_name=user_data["first_name"],
            last_name=user_data["last_name"],
            is_staff=user_data.get("is_staff", False),
            is_superuser=user_data.get("is_superuser", False),
        )

        user.set_password(user_data["password"])

        # If profile image URL exists, download and save it to MEDIA_ROOT
        if user_data["profile_image"]:
            ext = user_data["profile_image"].split("?")[0].split(".")[-1]
            filename = f"{user.username}_profile.{ext}"
            file_obj = download_image(user_data["profile_image"], filename)
            if file_obj:
                user.profile_image.save(filename, file_obj, save=False)

        user.save()

        # Assign "is_public" permission only if public=True
        if user_data.get("public", False):
            user.user_permissions.add(public_permission)

        users.append(user)

    non_admin_users = [u for u in users if u.username != "admin"]

    # --- 15 realistic articles ---
    articles_data = [
        {
            "title": "AI Revolutionizes Healthcare",
            "summary": "Artificial intelligence is transforming patient care, diagnostics, and treatment plans.",
            "content": [
                {"type": "header", "data": {"text": "AI in Healthcare", "level": 2}},
                {
                    "type": "paragraph",
                    "data": {
                        "text": "Hospitals are increasingly using AI to improve diagnostics, optimize treatment, and enhance patient care."
                    },
                },
            ],
        },
        {
            "title": "Quantum Computing Breakthrough",
            "summary": "Researchers achieve a new milestone in qubit stability and computation speed.",
            "content": [
                {
                    "type": "header",
                    "data": {"text": "Quantum Computing Advances", "level": 2},
                },
                {
                    "type": "paragraph",
                    "data": {
                        "text": "New quantum algorithms promise faster computation for complex scientific problems."
                    },
                },
            ],
        },
        {
            "title": "Global Economic Outlook 2025",
            "summary": "An analysis of trade, markets, and financial trends around the world.",
            "content": [
                {"type": "header", "data": {"text": "Economy 2025", "level": 2}},
                {
                    "type": "paragraph",
                    "data": {
                        "text": "Global markets are shifting due to technological innovation, inflation, and policy changes."
                    },
                },
            ],
        },
        {
            "title": "SpaceX Plans Mars Mission",
            "summary": "Elon Musk's company announces a new timeline for Mars colonization.",
            "content": [
                {"type": "header", "data": {"text": "Mars Colonization", "level": 2}},
                {
                    "type": "paragraph",
                    "data": {
                        "text": "The mission aims to send humans to Mars within the next decade."
                    },
                },
            ],
        },
        {
            "title": "Climate Change Impacts Agriculture",
            "summary": "Rising temperatures affect crop yields and global food security.",
            "content": [
                {
                    "type": "header",
                    "data": {"text": "Agriculture and Climate", "level": 2},
                },
                {
                    "type": "paragraph",
                    "data": {
                        "text": "Farmers face challenges as unpredictable weather affects harvests and production."
                    },
                },
            ],
        },
        {
            "title": "Renewable Energy Adoption Soars",
            "summary": "Wind, solar, and hydro energy see unprecedented growth in 2025.",
            "content": [
                {"type": "header", "data": {"text": "Renewable Energy", "level": 2}},
                {
                    "type": "paragraph",
                    "data": {
                        "text": "Investments in clean energy are driving down costs and improving sustainability."
                    },
                },
            ],
        },
        {
            "title": "Cybersecurity Threats Increase",
            "summary": "Hackers exploit vulnerabilities as more businesses go digital.",
            "content": [
                {"type": "header", "data": {"text": "Cybersecurity", "level": 2}},
                {
                    "type": "paragraph",
                    "data": {
                        "text": "Organizations must strengthen security protocols to prevent data breaches."
                    },
                },
            ],
        },
        {
            "title": "Virtual Reality in Education",
            "summary": "VR is transforming the way students learn and interact with content.",
            "content": [
                {"type": "header", "data": {"text": "VR in Education", "level": 2}},
                {
                    "type": "paragraph",
                    "data": {
                        "text": "Immersive experiences make learning more engaging and effective."
                    },
                },
            ],
        },
        {
            "title": "Advances in Medicine",
            "summary": "New treatments and technologies improve patient outcomes worldwide.",
            "content": [
                {"type": "header", "data": {"text": "Medical Innovations", "level": 2}},
                {
                    "type": "paragraph",
                    "data": {
                        "text": "From gene editing to wearable devices, medicine is evolving rapidly."
                    },
                },
            ],
        },
        {
            "title": "Global Sports Highlights",
            "summary": "Major events and outcomes from international competitions.",
            "content": [
                {"type": "header", "data": {"text": "Sports 2025", "level": 2}},
                {
                    "type": "paragraph",
                    "data": {
                        "text": "Football, basketball, and esports events capture worldwide attention."
                    },
                },
            ],
        },
        {
            "title": "Smart Cities and Urbanization",
            "summary": "Technology is reshaping cities and how people live in urban areas.",
            "content": [
                {"type": "header", "data": {"text": "Smart Cities", "level": 2}},
                {
                    "type": "paragraph",
                    "data": {
                        "text": "Sensors, AI, and IoT devices are improving infrastructure and services."
                    },
                },
            ],
        },
        {
            "title": "Streaming Services Dominate Media",
            "summary": "OTT platforms continue to transform entertainment consumption.",
            "content": [
                {"type": "header", "data": {"text": "Streaming Media", "level": 2}},
                {
                    "type": "paragraph",
                    "data": {
                        "text": "Original content and subscription models drive viewer engagement."
                    },
                },
            ],
        },
        {
            "title": "Minimalism in Design Trends",
            "summary": "Simple, functional, and aesthetic designs gain popularity.",
            "content": [
                {"type": "header", "data": {"text": "Minimalist Design", "level": 2}},
                {
                    "type": "paragraph",
                    "data": {
                        "text": "Less is more: brands adopt clean layouts and intuitive interfaces."
                    },
                },
            ],
        },
        {
            "title": "AI Ethics Debate",
            "summary": "Discussions on the moral implications of artificial intelligence.",
            "content": [
                {"type": "header", "data": {"text": "AI Ethics", "level": 2}},
                {
                    "type": "paragraph",
                    "data": {
                        "text": "Experts debate bias, accountability, and privacy in AI systems."
                    },
                },
            ],
        },
        {
            "title": "Esports Industry Growth",
            "summary": "Competitive gaming gains legitimacy and global audiences.",
            "content": [
                {"type": "header", "data": {"text": "Esports Boom", "level": 2}},
                {
                    "type": "paragraph",
                    "data": {
                        "text": "Tournaments, sponsorships, and streaming drive the booming industry."
                    },
                },
            ],
        },
    ]

    for data in articles_data:
        author = random.choice(non_admin_users)
        Article.objects.create(
            title=data["title"],
            summary=data["summary"],
            content={
                "time": int(timezone.now().timestamp()),
                "blocks": data["content"],
                "version": "2.29.0",
            },
            author=author,
            visible=True,
        )

    print(
        "✅ Mock data loaded! 15 realistic articles created, admin password is admin."
    )


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(
        description="Load mock data into the Django database."
    )
    parser.add_argument(
        "--force",
        action="store_true",
        help="Force reload and delete existing data first.",
    )
    args = parser.parse_args()

    print(
        "WARNING! This mock data contains an admin user with weak password. Don't use this in production!"
    )

    load_mock_data(force=args.force)
