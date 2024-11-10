# 2ndFIN - A catalog website for selling and buying 2nd-hand surfboards.

This project was made as a practice to encounter React.js for the first time.

------------------------------------------

# Key values about the project:
*The whole project was made to run, and runs, locally.*

Server: Runs on port 8080, and uses Node.js and Express.js to handle the server side.
Works like an API through HTTP requests, queries information from PostgreSQL, and sends back to the client's request.

Client: Runs on port 3000, uses mainly React.js for all the frontend.
Gets information from the server using Axios for API requests from the server port. 

Database: Hosted locally in PostgreSQL. Holds all of the products' information.

------------------------------------------

# Key Features:
*ALL The existing data is 100% made-up and are not real people or listings for sale.*

Each user can explore existing listings of surfboards and contact the seller with the provided information,
Filter through the listings using minimum and maximum prices, and sort them by prices (high or low first) to better find their fit.

------------------------------------------

*MENTION: This project was NOT built with the intention of other people running it, but if you insist, I've provided a guide on how to do so:*
# How to run:

1. Clone the repository.

2. Create a PostgreSQL Database, in which create "products" and "users" tables, and change the credentials to match yours. 
A CSV file with all the products' information is provided for you to import. 
// Or otherwise, 4 products are defined inside the server's index.js. 

3. Create a folder called "uploads" in the directory /server/uploads - This is where all the uploaded listing images are stored.

# RUN:
Client - open a new terminal, cd to my-app, and use 'npm install', and then 'npm start'.
Server - open a new terminal, cd to server, and use 'npm install', and then 'node index.js' / 'nodemon index.js.'

*MENTION: Errors may occur, as said this project was not optimized for running anywhere else other than my own PC.

------------------------------------------
