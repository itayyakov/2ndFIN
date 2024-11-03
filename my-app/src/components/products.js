const productsJSON = `[
    {
        "id": "0001",
        "listingTitle": "Al Merrick Rocket Wide",
        "listingDescription": "A super radical shortboard with just enough volume to enter any wave, and simultaneously rippes and moves radicaly.",
        "listingSurfboardType": "shortboard",
        "listingSurfboardHeight": "5'7",
        "listingPrice": 1500,
        "listingImg": "https://alohaxchng.com/cdn/shop/files/rocketwide-2.jpg?v=1697070256",
        "listingContactInfo": {
            "email": "yossi@gmail.com",
            "phone": "051-1111111"
        }
    },
    {
        "id": "0002",
        "listingTitle": "Al Merrick Happy Everyday",
        "listingDescription": "An everyday-surfboard, works amazing in mushy waves, forgiving and entring waves easily.",
        "listingSurfboardType": "shortboard",
        "listingSurfboardHeight": "6'0",
        "listingPrice": 1800,
        "listingImg": "https://img.leboncoin.fr/api/v1/lbcpb1/images/34/25/6f/34256f53faa525aa29197b3ef8e55e20b48bfb63.jpg?rule=ad-large",
        "listingContactInfo": {
            "email": "eden@gmail.com",
            "phone": "052-2222222"
        }
    },
    {
        "id": "0003",
        "listingTitle": "Lost Mayhem Driver 3.0",
        "listingDescription": "A full performace shortboard, likes good+ conditions, generating tons of speed and making huge sprayes.",
        "listingSurfboardType": "shortboard",
        "listingSurfboardHeight": "5'7",
        "listingPrice": 2000,
        "listingImg": "https://www.alohasurfmanly.com/cdn/shop/files/Screenshot2024-07-23at12.00.26pm.png?v=1721700067&width=533",
        "listingContactInfo": {
            "email": "itamar@gmail.com",
            "phone": "053-3333333"
        }
    },
    {
        "id": "0004",
        "listingTitle": "Aloha Fun Division Long EcoSkin",
        "listingDescription": "Typical longboard, will surf on literally any wave, offering lots of stabillity and flow.",
        "listingSurfboardType": "longboard",
        "listingSurfboardHeight": "9'0",
        "listingPrice": 2500,
        "listingImg": "https://www.bathshebasurf.co.uk/cdn/shop/products/aloha-fun-division-long-ecoskin-surfboard-aloha-surfboards-479363.jpg?v=1654949413",
        "listingContactInfo": {
            "email": "anabel@gmail.com",
            "phone": "054-4444444"
        }
    }
]`;

let products = JSON.parse(productsJSON);

export function addProduct(product) {
    products.push(product)
    products = products;
}

function deleteProduct(id) {
    let index = products.findIndex((product) => product.id=id)
    products.splice(index, 1);
}


export default products;