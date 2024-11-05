import React, { useEffect, useState } from "react";
import products from "../components/products";
import Card from "../components/Card";

function Explore() {
    const maxPrice = 
        products.reduce((prevValue, currentValue) => {
            let currentPrice = currentValue.price;
            let max = prevValue.price;
            return {price: Math.max(max, currentPrice)};
        }).price;

    const minPrice = 
        products.reduce((prevValue, currentValue) => {
            let currentPrice = currentValue.price;
            let min = prevValue.price;
            return {price: Math.min(min, currentPrice)};
        }).price;
    
    const [stateProducts] = useState(products);
    const [filter, setFilter] = useState({
        minPriceFilter: minPrice,
        maxPriceFilter: maxPrice,
    });

    const [filteredArray, setFilteredArray] = useState(
        stateProducts.filter((product) => {
        return(product.price>=filter.minPriceFilter && product.price<=filter.maxPriceFilter);
    }));


    //**TO-FIX**: if deleting the value one of the filters, it returns default params for both filters - 
    //making it so if there are two filters active and client delets one, it also de-activated the second one.
    //try `defaultValue`

    function HandleChange(event) {
        console.log(event);
        const {name, value} = event.target;
        console.log(event.maxPriceFilter);
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
    }

    let [sorting, setSorting] = useState("lowToHigh");
    function handleSorting(event) {
        setSorting(event.target.value);
    }

    //listens for changes in filtering and sorting, and only then re-rendering filteredArray.
    useEffect(() => {
        let newFilteredArray = 
            stateProducts.filter((product) => {
            return (product.price>=filter.minPriceFilter && product.price<=filter.maxPriceFilter);
        });

        //sortFilteredArray
        let sortFilteredArray;
        switch (sorting) {
            case "lowToHigh":
                sortFilteredArray = newFilteredArray.toSorted((a,b) => a.price - b.price);
                break;               
            case "highToLow":
                sortFilteredArray = newFilteredArray.toSorted((a,b) => b.price - a.price);
                break;
            default:
                sortFilteredArray = newFilteredArray.toSorted((a,b) => a.price - b.price);
                break;
        }
        console.log(sortFilteredArray);
        setFilteredArray(sortFilteredArray);
    }, [sorting, filter, stateProducts]);

    
    return ( 
        <div className="explore-container">
            <div className="explore-filter-container">
                <form className="explore-filter-form" onChange={HandleChange} >
                    <label>Enter Minimum Price:</label>
                    <input defaultValue={minPrice} type="number" placeholder={minPrice} name="minPriceFilter" /> <br/>
                    <label>Enter Maximum Price:</label>
                    <input defaultValue={maxPrice} type="number" placeholder={maxPrice} name="maxPriceFilter" />
                </form>
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