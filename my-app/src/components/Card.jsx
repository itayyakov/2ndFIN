import React from "react";

function Card(product) {

    function capitalFirstLetter(str) {
        if(str) return str[0].toUpperCase() + str.slice(1);
        return console.log("Surfboard Type is undefined");
    }

    return (
    <div className="listing-card" style={{backgroundImage: `url(uploads/${product.image})`, backgroundSize: "cover", backgroundPosition: "center center", backgroundBlendMode: "multiply"}}>
        {/* <img src={product.listingImg}/> */}
        <h3>{product.title}</h3>
        <p className="card-description">{product.description}</p>
        <div className="card-surfboard-height">Height: {product.height}</div>
        <div className="card-surfboard-type">{capitalFirstLetter(product.surfboard_type)}</div>
        <div className="card-price">{product.price}₪</div>
        <div className="card-contact-info">
            <h5> Intrested? </h5>
            <p> <b>Contact the seller:</b> <br/>
                Tel: {product.phone} <br/>
                Email: {product.email}
            </p>
        </div>
    </div>
    );
}

export default Card;