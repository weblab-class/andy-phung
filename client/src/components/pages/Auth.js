import React, { useState } from "react";
import { Link } from "react-router-dom";

const Auth = (props) => {
    // switch between register and login w state var
    const [auth_mode, set_auth_mode] = useState(props.auth_mode);
    return (
        <div className="block">
            <div>
                auth page: {props.auth_mode}
            </div>
            <Link to="/join">continue</Link>
        </div>
    )
}

export default Auth;