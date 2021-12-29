import React, { Component } from "react";
import IndexPage from "./views/IndexPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./css/index.css";

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" component={IndexPage} />
                </Switch>
            </Router>
        );
    }
}

export default App;
