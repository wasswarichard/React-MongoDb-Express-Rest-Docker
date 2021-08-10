import React, {Suspense} from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {Provider} from "react-redux";
import { store } from "./state/store/store";
import routes from "./routes/routes";
import "./App.css"
import Layout from "./components/Layout/Layout";
import Blocks from "./components/Blocks/Blocks";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import LoginForm from "./components/LoginForm/LoginForm";

const test = true;

const  App = () => (
    <Provider store={store}>
        {
            test ? (
                <Router>
                    <Route path='/' exact component={LoginForm}/>
                    <Route path='/signup' component={SignUpForm}/>
                </Router>
            ) : (
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
            )
        }
    </Provider>
);
export default App;

