import React from "react";
import profilePicture from "../../images/richard.jpg"
import 'bootstrap/dist/css/bootstrap.css';
import "./Navbar.css"
import Grid from "@material-ui/core/Grid";
import config from "../../helpers/config.json";
import {store} from "../../state/store/store";

const Navbar = () => {
    const logout = () => {
        const authentication = store.getState().session
        fetch(`${config.apiUrl}/api/removesession`, {
            headers: {
                authorization: authentication.accessToken,
                "x-refresh": authentication.refreshToken
            },
            method: "POST",
        }).then(response => {
            if (response.status === 200) {
                localStorage.removeItem('session');
                window.location.href = '/';
            }
        })
    }
    return (
        <div className="main-content">
            <header>
                <h2>
                    <label htmlFor="nav-toggle">
                        <span className="las la-bars"></span>
                    </label>
                    Dashboard
                </h2>
                <div className="user-wrapper">
                    <img src={profilePicture} width="40px" height="40px" alt=""/>
                    <div>
                        <h5> Richard W</h5>
                        <small> Super admin</small>
                    </div>
                    <div className="user-logout">
                        <Grid container>
                            <Grid item xs>
                                <a onClick={event => logout(event)} className="logout">
                                    log out
                                </a>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </header>
        </div>

    )
}
export default Navbar;