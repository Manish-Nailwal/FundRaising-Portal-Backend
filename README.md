Sure! Here’s the updated README reflecting the correct directory structure with "backend":

# Fundraising Portal - Backend

Welcome to the Fundraising Portal backend repository! This server-side application supports the frontend by handling user authentication, fundraising campaigns, and donation transactions. It is built using the MERN stack and provides a robust API for managing fundraising activities.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Contributing](#contributing)

## Features
- **User Authentication:** Secure registration and login with JWT tokens.
- **Fundraising Management:** Create, view, and manage fundraising campaigns.
- **Donation Handling:** Process donations and track transactions.
- **Transaction History:** Retrieve donation and fundraising transaction history.

## Technologies Used
- Node.js
- Express
- MongoDB
- Mongoose
- JWT for Authentication
- dotenv for environment variables

## Getting Started

To run the backend application locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Manish-Nailwal/FundRaising-Portal-Backend.git
   ```

2. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Create a `.env` file** in the root directory and add the following variables:
   ```
   PORT=4000
   MONGO_URL=your_mongo_connection_string
   SECRET=your_jwt_secret
   TOKEN_KEY=your_token_key(any)
   DOMAIN=http://localhost:3000
   ```

5. **Start the application:**
   ```bash
   npm run dev
   ```

6. **Open your API client and navigate to:**
   ```
   http://localhost:4000
   ```

## API Endpoints
- **POST** `/signup`: Register a new user.
- **POST** `/login`: Login a user.
- **POST** `/auth`: Verify a user.
- **GET** `/getFunds`: Retrieve all fundraising campaigns.
- **GET** `/getFundInfo/:id`: Retrieve specific fundraising campaigns.
- **POST** `/listFund/:id`: Create a new fundraising campaign.
- **POST** `/donate/:id`: Make a donation to a campaign.
- **GET** `/donate/transactions/:id`: Retrieve transaction history.

## Project Structure
```
FundRaising-Portal-Backend/
└── backend/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── util/
    ├── .env
    ├── app.js
    ├── package.json
    └── README.md
```

## Usage
- Use the provided API endpoints to interact with the backend functionality. Ensure that you have the MongoDB connection string set up correctly in your `.env` file.

## Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue if you encounter any bugs or have suggestions for improvements.


---

Thank you for checking out the Fundraising Portal backend! Together, let's make a positive impact on our communities. 💙
