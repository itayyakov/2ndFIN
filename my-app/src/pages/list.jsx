import React, { useState } from "react";
import axios from "axios";
const API_URL = "http://localhost:8080";

function List() {

    const [listed, setListed] = useState(false);

    let file = {};
    async function handleImage(event) {
        event.preventDefault();
        file = await event.target.files[0];
        console.log(file);
    }

    async function HandleSubmit(event) {
        event.preventDefault();
        let res = event.target;
        let product = {
            title: `${res.title.value}`,
            description: `${res.description.value}`,
            surfboardType: `${res.surfboardType.value}`,
            height: `${res.feetHeight.value}'${res.inchHeight.value}`,
            price: res.price.value,
            img: res.image.value,
            email: `${res.email.value}`,
            phone: `${res.phone.value}`

        }

        const uploadUrl = API_URL + "/uploadFile";
        const formData = new FormData;
        formData.set('file', file, file.name);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'enctype': "multipart/form-data",
              },
        };
        console.log("Sending file:", file)
        axios.post(uploadUrl, formData, config).then((response) => {
            try {
                console.log("../server/" + response.data);
                product.img = response.data;
            } catch (error) {
                throw(error);
            }
          }).then(() => {
            axios.post(`/post?title=${product.title}&&description=${product.description}&&surfboardType=${product.surfboardType}&&height=${product.height}&&price=${product.price}&&image=${product.img}&&email=${product.email}&&phone=${product.phone}`)
            .then(response => {
                console.log(response.data); setListed(true)
            });
          })

    }

    function ListYourProduct() {
        return (
            <div className="list-product-container">
                <h1>Have a surfboard for sale?</h1>
                <h2>Sell it with 2ndFIN.</h2>
                <div className="list-form-container">
                <form className="list-form" onSubmit={HandleSubmit} method="post">
                    <label>Surfboard Information:</label> <br/>
                    <input name="title" type="text" placeholder="List Title" className="full-width" /> <br/>
                    <input name="description" type="text" placeholder="List Description" className="full-width description" /> <br/>
                    <select name="surfboardType" required={true} className="list-form-select">
                        <option value="">Choose a surfboard type:</option>
                        <option value="Softboard">Softboard</option>
                        <option value="Shortboard">Shortboard</option>
                        <option value="Funboard">Funboard</option>
                        <option value="Longboard">Longboard</option>
                    </select> <br/>
                    <label>Surfboard Height:</label> <br/>
                    <input name="feetHeight" type="number" className="feet-input"/>'
                    <input name="inchHeight" type="number" /> <br/>
                    <input name="price" type="number" placeholder="Price" /> <br/>
                    <input name="image" type="file" accept="image/png, image/jpg, image/jpeg" onChange={handleImage}/> <br/>
                    <label>Contact Information:</label> <br/>
                    <input name="phone" type="tel" placeholder="Phone Number" />
                    <input name="email" type="email" placeholder="Email" /><br/>

                    <button type="submit">List My Surfboard</button>
                </form>
                </div>
            </div>
        );
    }
    
    function ProductListed() {
        return (
            <div className="list-product-container">
                <h1>Your surfboard has been listed.</h1>
                <h2>We wish you the best of luck selling it.</h2>
                <a className="explore-button" href="/explore">Find my surfboard in the Explore</a>
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