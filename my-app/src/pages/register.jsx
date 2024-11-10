import React from "react";
import axios from "axios";
import { User } from "../context/UserContext"
const API_URL = "http://localhost:8080";


function Register () {
    const [user, setUser] = User();

    async function handleRegisterSubmit(event) {
        event.preventDefault();
        try {
            const result = await axios.post(API_URL + "/register", {data: event.target});
            setUser(result.data);
            console.log(user);
        } catch (error) {
            throw error;    
        }
    }

    return (
        <div className="register-container">
                <h1>Register</h1>
                <h2>Create your account and start selling.</h2>
                <div className="register-form-container">
                    <form className="register-form" onSubmit={handleRegisterSubmit} method="post">
                        <input type="text" className="username" name="username" placeholder="Your Name" />
                        <input type="email" className="email" name="email" placeholder="Email" />
                        <input type="tel" className="phone" name="phone" placeholder="Phone number" />
                        <input type="text" className="password" name="password" placeholder="Password" />
                        <button type="submit">Submit</button>
                    </form>
                </div>
        </div>
    );
}


export default Register