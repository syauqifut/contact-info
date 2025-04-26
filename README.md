# Contact Information API

A simple REST API built with Node.js, Express, and Redis for storing and retrieving contact information.

## Features

- Store contact information (name, email, message)
- Retrieve all stored contacts
- Redis-based data persistence
- CORS enabled for cross-origin requests
- Input validation

## Prerequisites

- Node.js (v14 or higher)
- Redis server
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd contact-info
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
PORT=3000
REDIS_URL=redis://localhost:6379
```

## Running the Application

1. Start the Redis server:
```bash
redis-server
```

2. Start the application:
```bash
node index.js
```

The server will start on the specified port (default: 3000).

## API Endpoints

### POST /post
Store a new contact information.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, this is a test message"
}
```

**Response:**
```json
{
  "id": "1234567890",
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, this is a test message",
  "createdAt": "2024-03-21T12:00:00.000Z"
}
```

### GET /get
Retrieve all stored contacts.

**Response:**
```json
[
  {
    "id": "1234567890",
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Hello, this is a test message",
    "createdAt": "2024-03-21T12:00:00.000Z"
  }
]
```