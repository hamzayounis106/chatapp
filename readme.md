# Socket.IO Chat Application

This repository contains a simple chat application built using Node.js, Express, and Socket.IO. The application supports joining chat rooms and sending messages within those rooms. This README file provides detailed information on setting up and running the project.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Scripts](#scripts)
- [License](#license)

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v12 or higher)
- [npm](https://www.npmjs.com/)

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/your-repository.git
   cd your-repository
   ```

2. Install the dependencies:
   ```sh
   npm install
   ```

## Running the Application

You can run the application in development mode using `nodemon` or directly using `node`.

### Development Mode

To start the server in development mode, use:

```sh
npm run dev
```

### Production Mode

To start the server in production mode, use:

```sh
npm start
```

The server will start on the port specified in the environment variable `PORT` or default to `8080`.

## Project Structure

Here is an overview of the project's structure:

```
.
.
├── .gitignore            # Specifies files and directories that should be ignored by Git.
├── app.js                # Main server-side script responsible for configuring and running the Node.js server with Express and Socket.IO.
├── index.html            # Main HTML file for the client-side of the chat application. Contains the structure and layout of the chat interface.
├── package-lock.json     # Automatically generated file that ensures the exact versions of installed dependencies. Used for package management.
├── package.json          # Contains metadata about the project, such as name, version, description, and dependencies.
├── procfile              # Used by Heroku to determine what commands are run by your application's dynos. It specifies the commands to start the server.
├── readme.md             # README file containing the documentation for your project. Provides information on how to set up and use the application.
└── script_client.js      # Main client-side JavaScript file responsible for handling chat functionalities using Socket.IO. Handles sending and receiving messages.

```

## Usage

1. **Server-Side**

   Ensure your server is running. It should be configured to handle Socket.IO connections and serve the client files.

2. **Client-Side**

   The client should connect to the server using the Socket.IO client library. Ensure the client code points to the correct server URL.

### Setting Up CORS

The server is configured with CORS to allow connections from specific origins. Update the `origin` array in the CORS configuration to include the URLs of the clients that will connect to your server.

```javascript
const io = new Server(httpServer, {
  cors: {
    origin: ["http://127.0.0.1:5500", "https://hamzayounis106.github.io"],
    credentials: true,
  },
});
```

### Handling Connections and Messages

The server handles events such as `send_message` and `join_room` from clients. Ensure the client emits these events appropriately.

## Scripts

The following scripts are available in the `package.json` file:

- `test`: Run the tests (currently a placeholder).
- `dev`: Run the server in development mode with `nodemon`.
- `web`: Run the server using `node`.
- `start`: Run the server using `node` (default for production).

## License

This project is licensed under the ISC License. See the `LICENSE` file for details.
