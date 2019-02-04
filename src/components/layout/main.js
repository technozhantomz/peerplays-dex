import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";

import Dashboard from "../pages/dashboard";
import Settings from "../pages/settings";
import Tbd from "../pages/tbd";
import User from "../pages/user";
import Blockchain from "../pages/blockchain";

class Main extends Component {

    render() {

        return (
            <main>
                <Switch>
                    <Route exact path="/" component={Dashboard} />
                    <Route exact path="/exchange" component={Tbd} />
                    <Route exact path="/assets" component={Tbd} />
                    <Route path="/blockchain/" component={Blockchain} />
                    <Route exact path="/voting" component={Tbd} />
                    <Route exact path="/business" component={Tbd} />
                    <Route path="/settings/" component={Settings} />
                    <Route path="/user/:id" component={User} />
                    <Route exact path="/contacts" component={Tbd} />
                    <Route exact path="/help" component={Tbd} />
                </Switch>
            </main>
        )
    }
}

export default Main;
