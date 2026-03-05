OVERVIEW

This iteration of the project largely consisted of porting over the featurettes from assignment 1 to react in the case of the frontend and mongodb in the case of the 
backend, as well as the addition of a cart functionality for users. Currently, the cart is in a fairly primitive form that relies on a field within the database to 
show whether a product is in the cart or not, which generally limits the cart to be viable only for a single user. In the future this can be amended to use an alternate 
schema that allows for a more efficient cart that exists uniquely for each user. Additionally, several of the pages of our assignment are still under construction, and will 
be brought to full funcationality within future iterations of the assignment. 

Documentation: 

-in the back end folder run the "npm i" and "npm i mongoose" commands from the terminal, then executing "npm i" and "npm i react-router-dom" in the front end folder.

-run the assingment by executing the 'npm run start' command in the back end folder and 'npm run dev' in the front end. Navigate the website using 
the page links in the header. Items can be searched via the search bar at the top, with partial rather than exact search being implemented. The CRUD 
aspect of the assignment can be interacted with from the staff page, simply enter the appropriate fields for adding/removing/updating an aspect of a 
particular document. 

Routes & API:

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

REFLECTION: 

While there was initially a hurdle in adapting the existing CRUD and frontend components to the new REACT/MONGODB paradigm, once we got acclimated to the 
peculiarities of both the project became a relatively straightforward porting job. We feel we are well-prepared to move on to the other phases of the project.