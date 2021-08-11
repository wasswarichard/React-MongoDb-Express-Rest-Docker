import React from "react";
import profilePicture from "../../images/richard.jpg"
import 'bootstrap/dist/css/bootstrap.css';
import "./Navbar.css"
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import config from "../../helpers/config.json";

const Navbar = () => {
    const logout = (event) => {
        const authentication = JSON.parse(localStorage.getItem('session'));
        axios.post(`${config.apiUrl}/api/removesession`, {
            user: authentication.user,
            session: authentication.session
        }, {
            headers: {
                accessToken: authentication.accessToken,
                refreshToken: authentication.refreshToken
            }
        }).then(response => {
            if (response.data){
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