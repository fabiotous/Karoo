# Karoo - An E-Commerce Web Application

Live Project Link -> https://karoo-production-1602.up.railway.app

## Overview

Karoo is a full-stack e-commerce web application mirroring Amazon app's outlook and features, developed using the MERN stack (MongoDB, Express, React, Node.js). This final iteration builds upon previous versions by integrating a complete client-server architecture, persistent database storage, user authentication, and real-time communication.

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
5. Open your browser and go to: http://localhost:5173

## Routes & API:

### Frontend Routes
- `/` or `/home` → Home Page
- `/about` → About Page
- `/electronics` → Electronic Products Page
- `/beauty` → Beauty Products Page
- `/apparel` → Apparel Products Page
- `/best-seller` → Best Sellers Products Page
- `/cart` → Cart Page
- `/faq` → Frequently Asked Questions Page
- `/privacy` → Privacy Policy Page
- `/terms` → Terms and Conditions Page
- `/shipping` → Shipping and Returns Page
- `/staff` → Staff/Admin Page
- `/underconstruction` → Future Features

### Backend API

| Method | Endpoint                          | Description                             | Status Codes                        |
| ------ | --------------------------------- | --------------------------------------- | ----------------------------------- |
| GET    | /api/products                     | Retrieve the list of available products | 200 OK, 404 Not Found               |
| GET    | /api/products/beauty              | Retrieve the list of beauty products    | 200 OK, 404 Not Found               |
| GET    | /api/products/apparel             | Retrieve the list of apparel products   | 200 OK, 404 Not Found               |
| GET    | /api/products/electronics         | Retrieve the list of electronic products| 200 OK, 404 Not Found               |
| GET    | /api/products/random              | Retrieve the list of random products    | 200 OK, 404 Not Found               |
| GET    | /api/products/search              | Retrieve a specific product by name     | 200 OK, 404 Not Found, 400 No Input |
| GET    | /api/products/:pid                | Retrieve a specific product by PID      | 200 OK, 404 Not Found               |
| GET    | /api/cart/:email                  | Retrieve a specific cart by user email  | 200 OK, 500 Server Error            |
| POST   | /api/products                     | Add a new product to the list           | 201 Created, 400 Bad Request        |
| POST   | /api/products/electronic          | Add a new electronic product to the list| 201 Created, 400 Bad Request        |
| POST   | /api/products/apparel             | Add a new apparel product to the list   | 201 Created, 400 Bad Request        |
| POST   | /api/products/beauty              | Add a new beauty product to the list    | 201 Created, 400 Bad Request        |
| POST   | /api/cart/add                     | Add a product to a user's cart          | 200 OK, 500 Server Error            |
| POST   | /api/cart/remove                  | Remove a product from a user's cart     | 200 OK, 500 Server Error            |
| PATCH  | /api/products/pid/:pid            | Update a product's price                | 200 OK                              |
| PATCH  | /api/products/:pid/cart           | Update a product's in cart status       | 200 OK, 500 Server Error            |
| DELETE | /api/products/pid/:pid            | Delete a product using its unique ID    | 204 OK, 500 Server Error            |

These endpoints enable communication between the client-side pages and the server, demonstrating proper use of HTTP methods and RESTful design principles.

### Key Features
- Full MERN stack implementation
- RESTful API design
- MongoDB database integration
- User authentication system
- Individual user data handling
- Shopping cart functionality
- Real-time communication (Socket.io)
- Responsive and intuitive UI

## Reflection: 

This assignment provided valuable hands-on experience in building a complete web application from the ground up using modern technologies. It allowed us to apply theoretical concepts such as RESTful API design, client-server architecture, and usability principles in a practical setting. Compared to earlier iterations, this final submission helped reinforce our understanding of full-stack development by requiring the integration of multiple technologies into one cohesive system.

Through this assignment, we gained a deeper appreciation for the complexity of real-world applications, particularly in areas such as authentication, database management, and real-time communication. It also emphasized the importance of planning, debugging, and iterative development. Overall, this assignment was a significant learning experience that strengthened both our technical skills and our ability to work collaboratively as a team.

### Challenges

One of the main challenges in this project was integrating all components of the MERN stack while ensuring smooth communication between the frontend, backend, and database. Implementing authentication was particularly complex, as it required securely managing user sessions and ensuring that each user’s data remained separate and protected. Additionally, incorporating real-time communication using Socket.io introduced difficulties related to event handling and maintaining synchronization between multiple clients and the server. Debugging API routes and maintaining consistent data updates across the application also required careful testing and coordination across all parts of the system.

### Successes

A major success of this project was successfully developing a complete full-stack application that meets all the requirements of the MERN architecture. We were able to transition from a basic client-server model to a fully functional application with persistent data storage using MongoDB. The implementation of user authentication and individualized user data significantly enhanced the realism and usability of the application. Additionally, integrating a responsive React frontend with a RESTful API and real-time features demonstrated our understanding of modern web development practices. The project also highlighted strong teamwork, as tasks were effectively divided and integrated into a cohesive final product.
