import axios from "axios";
const API_URL = "http://localhost:8080";


//Get products from server
async function getProducts() {
    try {
        const result = await axios.get(API_URL + "/products");
        return result.data;
    } catch (error) {
        throw(error); 
    }
}

let products = await getProducts();

//Get filtered products from server
export async function getFilteredProducts(minprice, maxprice) {
    try {
        const result = await axios.get(API_URL + `/filter?minprice=${minprice}&&maxprice=${maxprice}`);
        return result.data;
    } catch (error) {
        throw(error);
    }
}


export default products;