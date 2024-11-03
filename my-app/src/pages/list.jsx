import React from "react";
import products, {addProduct} from "../components/products";

function List() {

    function createProduct(event) {
        event.preventDefault();
        let res = event.target;
        console.log(res);
        let product = {
            id: "000" + `${products.length+1}`,
            listingTitle: `${res.title.value}`,
            listingDescription: `${res.description.value}`,
            listingSurfboardType: `${res.surfboardType.value}`,
            listingSurfboardHeight: `${res.feetHeight.value}'${res.inchHeight.value}`,
            listingPrice: res.price.value,
            listingImg: res.image.value,
            listingContactInfo: {
                email: `${res.email.value}`,
                phone: `${res.phone.value}`
            }
        }
        addProduct(product);
        console.log(products);
        listed = true;
    }

    let listed = false;

    function ListYourProduct() {
        return (
            <div className="list-product-container">
                <h1>Have a surfboard for sale?</h1>
                <h2>Sell it with 2ndFIN.</h2>
                <form className="list-form" onSubmit={createProduct}>
                    <label>Surfboard Information:</label> <br/>
                    <input name="title" type="text" placeholder="List Title" /> <br/>
                    <input name="description" type="text" placeholder="List Description" size="120"/> <br/>
                    <select name="surfboardType" required={true}>
                        <option value="">Choose a surfboard type:</option>
                        <option value="softboard">Softboard</option>
                        <option value="shortboard">Shortboard</option>
                        <option value="funboard">Funboard</option>
                        <option value="longboard">Longboard</option>
                    </select> <br/>
                    <label>Surfboard Height:</label> <br/>
                    <input name="feetHeight" type="number" />'
                    <input name="inchHeight" type="number" /> <br/>
                    <input name="price" type="number" placeholder="Price" /> <br/>
                    <input name="image" type="file" accept="image/png, image/jpg, image/jpeg"/> <br/>
                    <label>Contact Information:</label> <br/>
                    <input name="phone" type="tel" placeholder="Phone Number" />
                    <input name="email" type="email" placeholder="Email" /><br/>

                    <button type="submit">List My Surfboard</button>
                </form>
            </div>
        );
    }
    
    function ProductListed() {
        return (
            <div>
                <h1>Listed</h1>
            </div>
        );
    }

    return (
        <div className="list-container">
            {listed ? <ProductListed />: <ListYourProduct />}
        </div>
    );
}

export default List;