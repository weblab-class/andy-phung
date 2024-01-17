import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
    return (
        <div>
            <Link to="/register"> Register </Link>
            <Link to="/login"> Log In </Link>
        </div>
    )
}

export default Landing;