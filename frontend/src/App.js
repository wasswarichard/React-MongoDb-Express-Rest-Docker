import React, {Suspense, useEffect, useState} from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {Provider} from "react-redux";
import { store } from "./state/store/store";
import routes from "./routes/routes";
import "./App.css"
import Layout from "./components/Layout/Layout";
import Blocks from "./components/Blocks/Blocks";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import LoginForm from "./components/LoginForm/LoginForm";
import {addSession} from "./state/actions/sessionActions";

const  App = () => {
    const isAuthenticated = localStorage.getItem('session');
    store.dispatch(addSession(isAuthenticated));
    return (
        <Provider store={store}>
            {
                isAuthenticated ? (
                    <Router>
                        <Layout>
                            <Suspense fallback={<div> Loading...</div>}>
                                <Switch>
                                    {routes.map((route) => (
                                        <Route
                                            path={route.path}
                                            component={route.component}
                                            key={route.path}
                                        />
                                    ))}
                                    <Route path="/" exact component={Blocks}/>
                                </Switch>
                            </Suspense>
                        </Layout>
                    </Router>
                ) : (
                    <Router>
                        <Route path='/' exact component={LoginForm}/>
                        <Route path='/signup' component={SignUpForm}/>
                    </Router>
                )
            }
        </Provider>
    );
}
export default App;

