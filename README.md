# Backspace

### A business ecommerce REST API created using Nods.js, Express.js and MongoDB

## Manual Installation

Clone the repo:

```bash
git clone 
cd 
```

Install the dependencies:
```bash
npm install
```

Set the environment variables:
```bash
cp .env.example .env

# open .env and modify the environment variables (if needed)
```

## Table of Contents

- [Features](#features)
- [Commands](#commands)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [List of API Endpoints](#api-endpoints)

## Features
- **NoSQL database**: [MongoDB](https://www.mongodb.com) object data modeling using [Mongoose](https://mongoosejs.com)
- **Authentication and authorization**: using [passport](http://www.passportjs.org)
- **Validation**: request data validation using [Joi](https://github.com/hapijs/joi)
- **Logging**: using [winston](https://github.com/winstonjs/winston) and [morgan](https://github.com/expressjs/morgan)
- **Error handling**: centralized error handling mechanism
- **Environment variables**: using [dotenv](https://github.com/motdotla/dotenv)
- **Security**: set security HTTP headers using [helmet](https://helmetjs.github.io)
- **Santizing**: sanitize request data against xss and query injection
- **CORS**: Cross-Origin Resource-Sharing enabled using [cors](https://github.com/expressjs/cors)

## Commands

Running locally:

```bash
node src/server.js or nodemon src/server.js
```

## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
# Port number
PORT=3000

# URL of the Mongo DB
MONGODB_URL=mongodb://127.0.0.1:27017/quizzy-local

# JWT
# JWT secret key
JWT_SECRET=thisisasamplesecret
# Number of minutes after which an access token expires
JWT_ACCESS_EXPIRATION_MINUTES=30
# Number of days after which a refresh token expires
JWT_REFRESH_EXPIRATION_DAYS=30

# SMTP configuration options for the email service
# For testing, you can use a fake SMTP service like Ethereal: https://ethereal.email/create
SMTP_HOST=email-server
SMTP_PORT=587
SMTP_USERNAME=email-server-username
SMTP_PASSWORD=email-server-password
EMAIL_FROM=support@yourapp.com
```

## Project Structure

```
src\
 |--api
  |--controllers\    # Route controllers (controller layer)
  |--middlewares\    # Custom express middlewares
  |--models\         # Mongoose models (data layer)
  |--routes\         # Routes
  |--services\       # Business logic (service layer)
  |--utils\          # Utility classes and functions
  |--validations\    # Request data validation schemas
 |--config\         # Environment variables and configuration related things
 |--app.js          # Express app
 |--server.js        # App entry point
```

## API Endpoints

List of available routes:
