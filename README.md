# User and Post REST API

This is a simple REST API built with NestJS for managing users and posts. This application provides endpoints to create, read, update, and delete users and posts.

## Getting Started

These instructions will help you set up and run the project on your local machine.

### Prerequisites

- Node.js (v14.x or higher)
- npm (v6.x or higher) or yarn (v1.x or higher)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Ennyolar96/warpspeed.git
   cd your-repo
   ```

2. Install the dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Application

1. Start the development server:

   ```bash
   npm run start:dev
   # or
   yarn start:dev
   ```

2. The server will start on `http://localhost:3005`. You can use Postman or any other API client to interact with the API.

3. Set up a docker environment, create a postgresqldb and enter the url in to .env

4. env example

DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"

JWT_SECRET="random string"

### API Endpoints

#### User Endpoints

- **Create User**

  ```http
  POST /auth/register
  ```

  **Request Body:**

  ```json
  {
    "username": "John Doe",
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```

  - **Login User**

  ```http
  POST /auth/login
  ```

  **Request Body:**

  ```json
  {
    "username": "John Doe",
    "password": "password123"
  }
  ```

- **Get Loggedin User**

  ```http
  GET /user
  ```

- **Update User**
  ```http
  PATCH /user/:id
  ```
  **Request Body:**
  ```json
  {
    "firstName": "Doe",
    "lastName": "john",
    "avatar": "https://firebase.com/myimage.jpg"
  }
  ```

#### Post Endpoints

- **Create Post**

  ```http
  POST /post
  ```

  **Request Body:**

  ```json
  {
    "title": "New Post",
    "content": "This is a new post.",
    "category": "news",
    "published": false
  }
  ```

- **Get All Posts**

  ```http
  GET /post
  ```

- **Get Post by slug**

  ```http
  GET /post/:slug
  ```

- **Get Post all user post**

  ```http
  GET /post/user
  ```

- **Update Post**

  ```http
  PATCH /post/:id
  ```

  **Request Body:**

  ```json
  {
    "title": "updated post",
    "content": "new content",
    "published": true
  }
  ```

- **Delete User**
  ```http
  DELETE /users/:id
  ```

### For more clearer documentation

visit http://localhost:3005/docs
