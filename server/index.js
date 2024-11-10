import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import cors from "cors";
import multer from "multer";
import pg from "pg";
import passwords from "./passwords.json" with { type: "json" };
import bcrypt from "bcrypt";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";

const frontURL = "http://localhost:8080";
const saltRounds = 2;
const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));

let products = [
    {
        id: 1,
        title: "Al Merrick Rocket Wide",
        description: "A super radical shortboard with just enough volume to enter any wave, and simultaneously rippes and moves radicaly.",
        surfboard_type: "shortboard",
        height: "5'7",
        price: 1500,
        image: "rocketwide.jpg",
        email: "yossi@gmail.com",
        phone: "051-1111111"

    },
    {
        id: 2,
        title: "Al Merrick Happy Everyday",
        description: "An everyday-surfboard, works amazing in mushy waves, forgiving and entring waves easily.",
        surfboard_type: "shortboard",
        height: "6'0",
        price: 1800,
        image: "happyeveryday.jpg",
        email: "eden@gmail.com",
        phone: "052-2222222"

    },
    {
        id: 3,
        title: "Lost Mayhem Driver 3.0",
        description: "A full performace shortboard, likes good+ conditions, generating tons of speed and making huge sprayes.",
        surfboard_type: "shortboard",
        height: "5'7",
        price: 2000,
        image: "https://www.alohasurfmanly.com/cdn/shop/files/Screenshot2024-07-23at12.00.26pm.png?v=1721700067&width=533",
        email: "itamar@gmail.com",
        phone: "053-3333333"
    },
    {
        id: 4,
        title: "Aloha Fun Division Long EcoSkin",
        description: "Typical longboard, will surf on literally any wave, offering lots of stabillity and flow.",
        surfboard_type: "longboard",
        height: "9'0",
        price: 2500,
        image: "https://www.bathshebasurf.co.uk/cdn/shop/products/aloha-fun-division-long-ecoskin-surfboard-aloha-surfboards-479363.jpg?v=1654949413",
        email: "anabel@gmail.com",
        phone: "054-4444444"
    }
];


// Manage Postgres database connection
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "2ndfin",
    password: passwords.dbpassword,
    port: 5432,
  });

  db.connect();

  db.query("SELECT * FROM products", (err, res) => {
    if(err) {
      console.error("Error executing query: ", err.stack);
    } else {
      products = res.rows;
    }
  });


// Manage file uploads
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
      }
})

const upload = multer({ storage: storage })

app.use(cors());



// Get current minimun and maximum price
const maxPrice = 
        products.reduce((prevValue, currentValue) => {
            let currentPrice = currentValue.listingPrice;
            let max = prevValue.listingPrice;
            return {listingPrice: Math.max(max, currentPrice)};
        }).listingPrice;

const minPrice = 
    products.reduce((prevValue, currentValue) => {
        let currentPrice = currentValue.listingPrice;
        let min = prevValue.listingPrice;
        return {listingPrice: Math.min(min, currentPrice)};
    }).listingPrice;



// Get all products
app.get("/products", (req, res) => {
    res.json(products);
})

// Get specific product
app.get("/products/:id", (req, res) => {
    const id = parseInt(req.params.id)
    res.json(products.find((product) => product.id === id));
})

// Get filtered products
app.get("/filter?", (req, res) => {
    const filter = {
        minFilter: parseInt(req.query.minprice) || minPrice,
        maxFilter: parseInt(req.query.maxprice) || maxPrice,
    }
    const filteredProducts = 
    products.filter((product) => {
    return (
        product.listingPrice>=filter.minFilter 
        && product.listingPrice<=filter.maxFilter);
    })
    res.json(filteredProducts);
})


// Upload product image
let lastImageDir = "";
app.post('/uploadFile', upload.single('file'), (req, res) => {
    try {
        lastImageDir = req.file.path;
        res.json(req.file.path).status(200);
    } catch (error) {
        res.status(500).json({ error: error })
    }
})


// Add new product -- LOCALLY
app.post("/post?", (req, res) => {
    console.log(`A new product has been posted`);
    const q = req.query;
    const product = {
        id: products.length+1,
        title: q.title,
        description: q.description,
        surfboard_type: q.surfboardType,
        height: q.height,
        price: q.price,
        image: lastImageDir.slice(8),
        email: `${q.email}`,
        phone: `${q.phone}`
    };
    products.push(product);
    res.json(products[products.length-1]).status(200).sendFile(lastImageDir);
    console.log(lastImageDir);
})



// Handle Account login, registration and management

// Find a user in database with given email address
async function getUserFromEmail(email) {
    let checkExisting = await db.query("SELECT * FROM users WHERE email = $1", [
        email,
    ]);
    if(checkExisting.rowCount) 
        return checkExisting.rows[0];
    else 
        return null;
}

// Handle Registraion
app.post("/register", async (req, res) => {
    const username = req.body.name;
    const password = req.body.password;
    const email = req.body.email;
    const phone = req.body.phone;
    const user = await getUserFromEmail(email);

    try {
        if(user) {
            res.json(`A User with this email address already exists.`)
        }
        else {
            //Encrypt password
            bcrypt.hash(password, saltRounds, (err, hash) => {
                if(err) {
                    console.log("Error hashing password: ", err);
                    res.send("Registration Unsuccessful. Please try again.")
                }
                db.query(`INSERT INTO users (username, password, email, phone)
                VALUES('${username}', '${hash}', '${email}', '${phone}')`,         
                (err) => {
                    if(err) {
                        console.error("Error executing query: ", err.stack);
                    } else {
                        res.json("User Registered Successfully.").status(200);
                    }
                });    
            })
        }
    } catch (error) {
        res.json(error);
    }
})

// Handle Logging In
app.post("/login", async (req, res) => {
    console.log("A new login attempt has been made, request body:", req.body)
    const email = req.body.username;
    const loginPassword = req.body.password;
    const user = await getUserFromEmail(email);
    try {
        if(user) {
            console.log("Password for comparison: ", loginPassword);
            const storedHashedPassword = user.password;
            bcrypt.compare(loginPassword, storedHashedPassword, (err, result) => {
                if(err) console.log("Error comparing passwords: ", err);
                else {
                    if(result) {
                        // USER LOGGED IN - DO LOGGED IN STUFF
                        console.log("User logged in successfully with the id of: ", user.id)
                        res.json(user.id).status(200);
                    }
                    else {
                        res.json("Incorrect Password.");    
                    }
                }
            })
        } else res.json("User not found.");
    } catch (error) {
        res.json(error);
    }

})


app.get("/account", (req, res) => {
    if(req.isAuthenticated()) res.json(true);
    else res.json(false);
})








// Verify Port
app.listen(port, () => {
    console.log(`Server listening on port ${8080}`);
})

