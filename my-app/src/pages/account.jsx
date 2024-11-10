import React from "react";
import axios from "axios";
import { User } from "../context/UserContext"
const API_URL = "http://localhost:8080";

function Account() {
    const [user, setUser] = User();
    async function handleLoginSubmit(event) {
        console.log("Login form submission was made, event: ", event.target);
        // event.preventDefault();
        const body = new FormData();
        body.append('username', event.target.username);
        body.append('password', event.target.password);
        console.log("FormData: ", body);
        try {
            const result = await axios.post(API_URL + "/login", {data: body});
            setUser(result.data);
        } catch (error) {
            throw error;  
        }
    }

    if(user>0) return (
        <div className="account-container">
            <h1>Manage your account</h1>
        </div>
    );

    else return (
        <div className="login-container">
                <h1>Login</h1>
                <h2>Login to your account on 2ndFIN</h2>
                <div className="login-form-container">
                    <form className="login-form" action={handleLoginSubmit} method="post">
                        <input type="text" className="username" name="username" placeholder="Email" />
                        <input type="text" className="password" name="password" placeholder="Password" />
                        <button type="submit">Submit</button>
                    </form>
                </div>
        </div>
    );
}


export default Account;
