# CPS630 ASSIGNMENT 3 - Karoo (E-Commerce Web Application)

## Names

1. Humaira Adeeb | 501030823
2. Mykhaylo Batashov | 501092777
3. Fabio Tous | 501111871
4. Chloe Chartrand | 500946522

## Overview

Karoo is a full-stack e-commerce web application developed using the MERN stack (MongoDB, Express, React, Node.js). This final iteration builds upon previous versions by integrating a complete client-server architecture, persistent database storage, user authentication, and real-time communication.

The application allows users to browse products, search items, manage a shopping cart, and interact with a dynamic and responsive user interface. Each user has their own account and personalized data, enabled through authentication and database integration.

To meet the project requirements, the application includes:

A React frontend with a user-friendly and responsive UI
A Node.js + Express backend with RESTful API routes
A MongoDB database for persistent data storage
User authentication allowing multiple users to log in and manage their own data
Real-time communication using Socket.io
A UI designed using Nielsen usability principles to ensure usability and accessibility

This project demonstrates a complete modern web application workflow from frontend design to backend API development and database management.

## Documentation

How to Run the Project:

1. Clone or download the project repository.
2. Navigate to the backend folder and install dependencies:
```
npm install
npm install mongoose
```
3. Navigate to the frontend folder and install dependencies:
```
npm install
npm install react-router-dom
```
4. Start the application:
Backend: `npm run start`
Frontend: `npm run dev`
5. Open your browser and go to: http://localhost:3000

## Routes & API:

"/" & "/home" -> lead to the HomePage screen
"/about" -> leads to the About screen
"/underconstruction" -> leads to the Under Construction screen
"/electronics" -> leads to the Electronic Products screen
"/staff" -> leads to the Staff screen
"/cart" -> leads to the Cart screen

| Method | Endpoint                          | Description                             | Status Codes                        |
| ------ | --------------------------------- | --------------------------------------- | ----------------------------------- |
| GET    | /api/products                     | Retrieve the list of available products | 200 OK                              |
| GET    | /api/products/search?title=:input | Retrieve a specific product by name     | 200 OK, 404 Not Found, 400 No Input |
| POST   | /api/products                     | Add a new product to the list           | 201 Created, 400 Bad Request        |
| PATCH  | /api/products/pid/:pid            | Updates a product's price               | 200 OK                              |
| PATCH  | /api/products/:pid/cart           | Updates a product's in cart status      | 200 OK, 400 Bad Request             |
| DELETE | /api/products/pid/:pid            | Delete a product using its unique ID    | 200 OK, 404 Not Found               |

These endpoints enable communication between the client-side pages and the server, demonstrating proper use of HTTP methods and RESTful design principles.

## Reflection: 

### Challenges
### Successes
