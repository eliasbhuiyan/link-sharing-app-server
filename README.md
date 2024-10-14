# Node.js Backend

This is the backend for a link-sharing app built using Node.js and Express. It provides RESTful API endpoints for managing user authentication, links, and user profiles.

## Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Running the Project](#running-the-project)
5. [API Endpoints](#api-endpoints)
6. [Environment Variables](#environment-variables)
7. [Deployment](#deployment)
8. [License](#license)

## Project Overview

This project serves as the backend for a full-stack link-sharing application where users can register, log in, manage their links, and update their profile information. 

## Features

- User registration with email verification.
- User login and session management.
- CRUD operations for user links.
- Profile management for users (including first name, last name, email, and profile picture).
- Input validation for user input.
- Token-based authentication for secure API access.
- Integration with a database (e.g., MongoDB) for persistent storage.

## Tech Stack

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express**: Web framework for building RESTful APIs.
- **Mongoose**: ODM for MongoDB.
- **JWT**: JSON Web Tokens for authentication.
- **Nodemailer**: For sending verification emails.
- **dotenv**: For managing environment variables.
- **bcryptjs**: For hashing passwords.
- **cors**: For enabling Cross-Origin Resource Sharing.

## Getting Started

Follow these steps to set up and run the backend locally.

### Prerequisites

Make sure you have the following installed on your system:

- **Node.js** (v14 or higher)
- **npm** (v6 or higher) or **yarn**
- A MongoDB instance (you can use MongoDB Atlas for cloud hosting).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/link-sharing-app-backend.git
   cd link-sharing-app-backend
