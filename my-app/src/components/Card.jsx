import React from "react";

function Card(product) {
    return (
    <div className="listing-card" style={{backgroundImage: `URL(${product.listingImg})`, backgroundSize: "cover", backgroundPosition: "center center", backgroundBlendMode: "multiply"}}>
        {/* <img src={product.listingImg}/> */}
        <h3>{product.listingTitle}</h3>
        <p className="card-description">{product.listingDescription}</p>
        <div className="card-surfboard-height">Height: {product.listingSurfboardHeight}</div>
        <div className="card-price">{product.listingPrice}₪</div>
        <div className="card-contact-info">
            <h5> Intrested? </h5>
            <p> <b>Contact the seller:</b> <br/>
                Tel: {product.listingContactInfo.phone} <br/>
                Email: {product.listingContactInfo.email}
            </p>
        </div>
    </div>
    );
}

export default Card;