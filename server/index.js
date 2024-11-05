import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import cors from "cors";
import multer from "multer";
import pg from "pg";
import passwords from "./passwords.json" with { type: "json" };

let products = [
    {
        id: 1,
        listingTitle: "Al Merrick Rocket Wide",
        listingDescription: "A super radical shortboard with just enough volume to enter any wave, and simultaneously rippes and moves radicaly.",
        listingSurfboardType: "shortboard",
        listingSurfboardHeight: "5'7",
        listingPrice: 1500,
        listingImg: "https://alohaxchng.com/cdn/shop/files/rocketwide-2.jpg?v=1697070256",
        listingContactInfo: {
            email: "yossi@gmail.com",
            phone: "051-1111111"
        }
    },
    {
        id: 2,
        listingTitle: "Al Merrick Happy Everyday",
        listingDescription: "An everyday-surfboard, works amazing in mushy waves, forgiving and entring waves easily.",
        listingSurfboardType: "shortboard",
        listingSurfboardHeight: "6'0",
        listingPrice: 1800,
        listingImg: "https://img.leboncoin.fr/api/v1/lbcpb1/images/34/25/6f/34256f53faa525aa29197b3ef8e55e20b48bfb63.jpg?rule=ad-large",
        listingContactInfo: {
            email: "eden@gmail.com",
            phone: "052-2222222"
        }
    },
    {
        id: 3,
        listingTitle: "Lost Mayhem Driver 3.0",
        listingDescription: "A full performace shortboard, likes good+ conditions, generating tons of speed and making huge sprayes.",
        listingSurfboardType: "shortboard",
        listingSurfboardHeight: "5'7",
        listingPrice: 2000,
        listingImg: "https://www.alohasurfmanly.com/cdn/shop/files/Screenshot2024-07-23at12.00.26pm.png?v=1721700067&width=533",
        listingContactInfo: {
            email: "itamar@gmail.com",
            phone: "053-3333333"
        }
    },
    {
        id: 4,
        listingTitle: "Aloha Fun Division Long EcoSkin",
        listingDescription: "Typical longboard, will surf on literally any wave, offering lots of stabillity and flow.",
        listingSurfboardType: "longboard",
        listingSurfboardHeight: "9'0",
        listingPrice: 2500,
        listingImg: "https://www.bathshebasurf.co.uk/cdn/shop/products/aloha-fun-division-long-ecoskin-surfboard-aloha-surfboards-479363.jpg?v=1654949413",
        listingContactInfo: {
            email: "anabel@gmail.com",
            phone: "054-4444444"
        }
    }
];

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
      console.log(products);
    }
    db.end();
  });

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
      }
})

const app = express();
const port = 8080;
const upload = multer({ storage: storage })

app.use(cors());



//get current minimun and maximum price
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



//get all products
app.get("/products", (req, res) => {
    res.json(products);
})

//get specific product
app.get("/products/:id", (req, res) => {
    const id = parseInt(req.params.id)
    res.json(products.find((product) => product.id === id));
})

//get filtered products
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


//Upload product image
let lastImageDir = "";
app.post('/uploadFile', upload.single('file'), (req, res) => {
    try {
        lastImageDir = req.file.path;
        res.json(req.file.path).status(200);
    } catch (error) {
        res.status(500).json({ error: error })
    }
})


//Add new product
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
    res.json(products[products.length-1]).status(200);
})










app.listen(port, () => {
    console.log(`Server listening on port ${8080}`);
})

