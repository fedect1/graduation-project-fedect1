# White Dwarfs Messenger (WD Messenger)

WD Messenger is a unique social networking platform that focuses on the present moment, offering users a space to express their thoughts and feelings as a way of catharsis. Unlike traditional social media platforms, each user's written expression is limited to a concise 250 words and remains valid for only 6 hours before disappearing. This ephemeral nature of content allows users to freely express themselves without concerns about long-term consequences or judgment. The name of the app refers to stars that are no longer visible, but their light takes a long time to reach Earth. It serves as a metaphor for capturing the essence of the moment in each message.

# Getting Started

These instructions will help you set up and run WD Messenger locally on your system. Ensure you follow the steps correctly.

### Prerequisites

Before you begin, make sure you have the following prerequisites installed on your system:

- Node.js and npm

- Docker and Docker Compose

### Cloning the Repository

If you haven't already, clone the GitHub repository to your local machine:

```bash
  git clone https://github.com/fedect1/graduation-project-fedect1
```

### Backend Configuration

1. Navigate to the backend directory:

```bash
  cd graduation-project-fedect1/backend
```

2. Create an .env file in the backend directory and configure the MongoDB connection string:

```bash
  MONGODB_CONNECTION_STRING=<Your MongoDB Connection String>
  SESSION_SECRET=<Your Session Secret>
```

Replace `<Your MongoDB Connection String>` with your MongoDB connection details and `<Your Session Secret>` with a secret key for session management.

3. Install backend dependencies:

```bash
  npm install
```

### Frontend Configuration

1. Navigate to the frontend directory:

```bash
  cd graduation-project-fedect1/frontend
```

2. Create an .env file in the frontend directory and configure the API base URL:

```bash
  VITE_API_BASE_URL=<Your Backend API URL>
```

Replace `<Your Backend API URL>` with the URL of your backend server.

3. Install frontend dependencies:

```bash
  npm install
```

### Running the Application

Return to the root directory of your project and use Docker Compose to build and run the containers:

```bash
  docker-compose up --build
```

Once the containers are up and running, you can access the frontend of WD Messenger at `http://localhost:5173` in your web browser.

### Stopping the Application

To stop the containers and clean up the resources, run the following command in the root directory of your project:

```bash
  docker-compose down
```

These updated instructions ensure that users install the necessary dependencies for both the backend and frontend before running the application.

---

## PlantUML

> **Note:**
>
> - There is a **class.puml** example file located in the **_architecture_** folder.

To start working **_\*.puml_** files:

- You can continue by editing the **class.puml** file
- Add additional **_\*.puml_** files on that folder too.

If you what to visualize a preview of the **class.puml** file or another **_\*.puml_** file on the project, please select the file and on your keyboard press the following keys:

- _MacOS_: **Option + D**

- _Linux/Windows_: **Alt + D**
  The above commands will automatically open your a window and will show you live any updates that you make on the file.

---

## MIT License

Copyright (c) 2022 Coyotiv

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
