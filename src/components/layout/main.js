import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";

import Dashboard from "../pages/dashboard";
import Settings from "../pages/settings";
import Tbd from "../pages/tbd";


class Main extends Component {

    // componentDidMount(){
    //     dbApi('get_global_properties').then(console.log);
    // }

    render() {

        return (
            <main>
                <Switch>
                    <Route exact path="/" component={Dashboard} />
                    <Route exact path="/exchange" component={Tbd} />
                    <Route exact path="/assets" component={Tbd} />
                    <Route exact path="/blockchain" component={Tbd} />
                    <Route exact path="/voting" component={Tbd} />
                    <Route exact path="/business" component={Tbd} />
                    <Route path="/settings/" component={Settings} />
                    <Route exact path="/contacts" component={Tbd} />
                    <Route exact path="/help" component={Tbd} />
                </Switch>
            </main>
        )
    }
}

export default Main;
