# 2ndFIN - A catalog website for selling and buying 2nd-hand surfboards.

This project was made as a practice to encouter React.js for the first time.

------------------------------------------

# Key values about the project:
*The whole project was made to run, and runs, locally.*

Server: Runs on port 8080, uses Node.js and Express.js to handle the server side.
Works like an API through http requests, queries information from PostgreSQL and sends back to the client's request.

Client: Runs on port 3000, uses mainly React.js for all the frontend.
Gets information from the server using axios for API request from the server port. 

Database: Hosted locally in PostgreSQL. Holds all of the products and users' infromation.

------------------------------------------

# Key Features:
*ALL The existing data is 100% made-up and are not real people or listings for sale.*

Each user can explore existing listings of surfboards and contact the seller with the provded information,
Filter through the listings using minimun and maximum pricings, and sort the listings by prices (high or low first) to better find their fit.
A client can also create an account and list their own prouducts, edit, and delete them.

------------------------------------------

*MENTION: This project was NOT built with the intention of other people running it, but if you insist, I've provided a guide on how to do so:*
# How to run:

1. Clone the repositry.

2. Create a PostgreSQL Database, in which create "products" and "users" tables, and change the credentials to match yours. 
A csv file with all the products and users information is provided for you to import. 
// Or otherwise, there are 4 products which are defined inside the server's index.js. 
- NOT SETTING UP THE DATABASE MEANS - All of the users' functions will not work and possibly the whole application. Make your own adjustments.

3. Create a folder called "uploads" in the directory /server/uploads - This is where all the uploaded listing images are stored.

# RUN:
Client - open a new terminal, cd to my-app and use npm start.
Server - open a new terminal, cd to server and use node / nodemon index.js.

# *MENTION: Errors may occur, as said this project was not optimized for running anywhere else rather than my own PC.

------------------------------------------
