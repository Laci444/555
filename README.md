# 555 News Portal

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## Table of Contents

- [Overview](#overview)
- [Technologies](#technologies)
- [Architecture & Design](#architecture--design)
- [Features](#features)
- [Deployment & CI/CD](#deployment--cicd)
- [Design Decisions](#design-decisions)
- [Future Improvements](#future-improvements)
- [License](#license)

---

## Overview

**555 News Portal** is a modern full-stack news platform built as a university project. It allows multiple authors to create, manage, and publish articles using a block-based editor. The application provides a responsive Single Page Application (SPA) frontend and a robust backend API, with modular design and containerized deployment.  

The main goals of the project are:

- **High-level modular architecture** separating frontend, backend, and deployment concerns.
- **Flexible content creation** using block-based EditorJS.
- **Rapid development** with mock data and automated CI/CD pipelines.
- **Cross-environment consistency** using Docker and Docker Compose.

---

## Technologies

### Backend

- **Python & Django**  
  REST API with ASGI support for future real-time features.
- **Database**  
  SQLite for storage - Docker volumes for persistency in production.
- **Custom User Model**  
  Extended `Profile` with personal informations
- **Content Management**  
  Block-based articles with `EditorJS` and unique `public_id` generated via `Hashids`.
- **Permissions**  
  Admin and author users with separate capabilities.

### Frontend

- **React (TSX)** with SPA architecture.
- **React Router Framework** for navigation and routing.
- **Tailwind CSS** for responsive design.
- **ShadCN UI components** for forms, buttons, carousel, and other UI elements.
- **EditorJS** for rich article content.
- **JWT-based Authentication** using `react-auth-kit`.
- **Axios** for API calls.

### Build & Deployment

- **Docker & Docker Compose** for multi-service orchestration.
- **Nginx** as reverse proxy and static frontend host.
- **GitHub Actions** for CI/CD:
  - Backend and frontend builds
  - Deployment to GitHub Pages
  - Automated releases with changelogs and deployment files

---

## Architecture & Design

The project follows a **monorepo structure**:
- backend
- frontend
- infrastructure and CI/CD

**Deployment Design:**

| Service        | Responsibility                                    |
|----------------|---------------------------------------------------|
| Init Container | Version management, frontend asset preparation    |
| Backend        | API, authentication, user & article management    |
| Nginx          | Reverse proxy and static file serving             |

**High-level Design Choices:**

- **Separation of Concerns**: Frontend consumes backend API - independent development and testing.
- **SPA Routing**: Nginx handles fallback routes to ensure smooth navigation.
- **Mock Data System**: Enables development without requiring live data.
- **Block-based Editing**: EditorJS allows flexible, structured content creation.
- **Persistent Storage**: Docker volumes for static files, media, and database.

---

## Features

### Articles

- **Create, Edit, View**: Authors can manage their own articles.
- **Block-based content**: Header, paragraph, and custom blocks for structured content.
- **Unique Public IDs**: Automatically generated for every article for shareable links.

### Users

- **Admin Users**: Full access to management and administrative tasks.
- **Author Users**: Can create and publish articles, have profile information (email, bio, profile picture).

### Frontend

- **Interactive UI**: Carousel for featured articles, forms with validation, rich text rendering.
- **Authentication**: JWT login, protected routes, and token refresh handling.
- **Responsive Design**: Tailwind CSS ensures accessibility across devices.

### Development

- **Mock API**: Simulate backend responses during development.
- **Auto-save & Notifications**: EditorJS content automatically saved with feedback.
- **Structured Mock Data**: Predefined users, articles, images, and content for quick testing.

---

## Deployment & CI/CD

- **Docker Compose**: Orchestrates init container, backend, and Nginx.
- **GitHub Actions**:
  - Build backend & frontend
  - Upload frontend artifacts to GitHub Pages
  - Generate Docker Compose files for release
  - Automated changelog creation
- **Easy Deployment**: Single command `docker compose up -d` launches all services.
- **Versioning**: `APP_VERSION` environment variable ensures released versions are pulled.

---

## Design Decisions

- **Frontend-Backend Separation**: Allows independent updates and scalability.
- **SPA Architecture**: Improves user experience with fast, client-side navigation.
- **EditorJS**: Flexible content editing for authors.
- **Containerization**: Ensures consistent environments across development, testing, and production.
- **Mock Data Scripts**: Enable rapid development and testing without needing live backend data.

---

## Future Improvements

- **Automated Production Deployments**: Fetch latest release artifacts and deploy seamlessly.
- **Database Upgrade**: Move from SQLite to PostgreSQL for production use.
- **Monitoring & Logging**: Centralized logs for backend, frontend, and containers.
- **Enhanced UI/UX**: Features like search, tagging, article previews, and notifications.
- **Testing Pipelines**: Integration and end-to-end tests for CI/CD workflows.
