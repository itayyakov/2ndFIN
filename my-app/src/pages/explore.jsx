import React, { useEffect, useState } from "react";
import products from "../components/products";
import Card from "../components/Card";
import axios from "axios";

function Explore() {

    

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
    
    const [stateProducts] = useState(products);
    const [filter, setFilter] = useState({
        minPriceFilter: minPrice,
        maxPriceFilter: maxPrice,
    });

    const [filteredArray, setFilteredArray] = useState(
        stateProducts.filter((product) => {
        return(product.listingPrice>=filter.minPriceFilter && product.listingPrice<=filter.maxPriceFilter);
    }));


    //**TO-FIX**: if deleting the value one of the filters, it returns default params for both filters - 
    //making it so if there are two filters active and client delets one, it also de-activated the second one.
    //try `defaultValue`

    function handleChange(event) {
        const {name, value} = event.target;
        console.log(event.target);
        console.log(`[${name}]: ${value}`);
        setFilter((lastFilter) => {
            if(value>0) 
                return {
                    ...lastFilter,
                    [name]: value
                }
            return {
                minPriceFilter: minPrice,
                maxPriceFilter: maxPrice,
            };
            
        })
        console.log(filter);
        console.log(filteredArray);
    }

    let [sorting, setSorting] = useState("lowToHigh");
    function handleSorting(event) {
        setSorting(event.target.value);
        console.log(sorting);
    }

    //listens for changes in filtering and sorting, and only then re-rendering filteredArray.
    useEffect(() => {
        let newFilteredArray = 
            stateProducts.filter((product) => {
            return (product.listingPrice>=filter.minPriceFilter && product.listingPrice<=filter.maxPriceFilter);
        });

        //sortFilteredArray
        let sortFilteredArray;
        switch (sorting) {
            case "lowToHigh":
                sortFilteredArray = newFilteredArray.toSorted((a,b) => a.listingPrice - b.listingPrice);
                break;               
            case "highToLow":
                sortFilteredArray = newFilteredArray.toSorted((a,b) => b.listingPrice - a.listingPrice);
                break;
            default:
                sortFilteredArray = newFilteredArray.toSorted((a,b) => a.listingPrice - b.listingPrice);
                break;
        }
        console.log(sortFilteredArray);
        setFilteredArray(sortFilteredArray);
    }, [sorting, filter, stateProducts]);

    
    return (
        <div className="explore-container">
            <div className="explore-filter-container">
                <p>Enter Minimum Price:</p>
                <input defaultValue={minPrice} type="number" placeholder={minPrice} name="minPriceFilter" onChange={handleChange} />
                <p>Enter Maximum Price:</p>
                <input defaultValue={maxPrice} type="number" placeholder={maxPrice} name="maxPriceFilter" onChange={handleChange} />
                <p>Sort by:</p>
                <select onChange={handleSorting}>
                    <option value="lowToHigh">Prices: Low to High</option>
                    <option value="highToLow">Prices: High to Low</option>
                </select>
            </div>
            <div className="explore-products-container">
                <h1>Find your next surfboard:</h1> 
                <div className="explore-product-list-container">
                    {filteredArray.map(product => {
                        return <Card {...product} />
                    })}
                </div>
            </div>
        </div>
    );
}

export default Explore; 