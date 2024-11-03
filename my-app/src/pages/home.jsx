import React, { useState } from "react";
import Card from "../components/Card";
import products from "../components/products";

function Home() {

    const [productsArr, setProductsArr] = useState(products);
    return (
        <div className="container">
          <div className="welcome-container">
            <h1>2ndFIN.</h1>
            <h2>Find your next 2nd-hand surfboard.</h2>
            <a href="/list">Have a surfboard for sale?</a>
          </div>
          <div className="home-listings-container">
            <h2>Latest Listings:</h2>
            <div style={{borderBottom: "rgb(53, 92, 129) 1px solid", margin: "0 0 1rem 0", width: "8%"}}></div>
            <div className="products-container">
                {productsArr.map(product => {
                    return <Card {...product}/>
                })}
            </div>
          </div>
          
        </div>
      );
}

export default Home;