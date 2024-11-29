# Booksphere

A web application for browsing, adding, editing, deleting, and viewing book reviews, with features for filtering and rating calculations. The backend is built with Node.js and Express, and MongoDB serves as the NoSQL database.

---

## Table of Contents

1. Features
2. Tech Stack
   - Backend
   - Frontend
3. Getting Started
   - Prerequisites
   - Installation
   - Running the Application
4. Database Setup
5. API Documentation
6. Additional Notes

---

## Features

- Browse Reviews: View a list of all book reviews.
- Add Reviews: Submit new reviews with a title, author, rating, and comments.
- Edit Reviews: Update existing reviews.
- Delete Reviews: Remove unwanted reviews.
- View Reviews: Read detailed information about a specific review.
- Filter Reviews: Search and filter reviews based on criteria.
- Rating Calculation: Dynamically calculate and display average ratings.

---

## Tech Stack

### Backend
- Language: Node.js
- Framework: Express
- Database: MongoDB (NoSQL)
- API Endpoints:
  - GET /reviews - Retrieve all reviews
  - POST /reviews - Add a new review
  - PUT /reviews/:id - Update an existing review
  - DELETE /reviews/:id - Delete a specific review

### Frontend
- A user-friendly web interface with forms and lists for managing reviews.

---

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB installed locally or access to a cloud MongoDB instance.

### Installation

1. Clone the repository:
   git clone <repository_url>
2. Navigate to the project directory:
   cd <project_directory>
3. Install dependencies:
   npm install

---

### Running the Application

1. Start the server:
   npm run dev
2. Open your browser and access the application at:
   http://localhost:3000

---

## Database Setup

1. Ensure MongoDB is running locally or provide a MongoDB connection string.
2. Add your connection string to the .env file under the variable MONGO_URI, for example:
   MONGO_URI=mongodb://localhost:27017/booksphere

---

## API Documentation

### Endpoints

- GET /reviews
  - Fetch all book reviews.
  
- POST /reviews
  - Add a new book review.
  - Body Fields:
    - title (String) - Book title
    - author (String) - Author name
    - rating (Integer, 1-5) - Rating value
    - reviewText (String) - Review content

- PUT /reviews/:id
  - Update an existing review.
  - Body Fields:
    - Any of the fields from POST /reviews.

- DELETE /reviews/:id
  - Delete a specific review by ID.

---

## Additional Notes

- Reviews are automatically timestamped upon creation.
- Future enhancements may include:
  - A responsive user interface.
  - Additional filtering options for reviews.

---
