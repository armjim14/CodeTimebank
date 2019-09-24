import React from 'react';
import { Link } from "react-router-dom";

function MainPage() {
    return (
        <div>
            <p>Main Page</p>
            <Link to="/login">Login</Link><br /><br />
            <Link to="/register">Register</Link>
        </div>
    )
}

export default MainPage
