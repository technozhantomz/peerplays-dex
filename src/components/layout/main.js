import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import {ChainTypes} from "bitsharesjs";

import Dashboard from "../pages/dashboard";
import Tbd from "../pages/tbd";
import User from "../pages/user/";
import Blockchain from "../pages/blockchain";
import {dbApi} from "../../actions/nodes";
import Settings from "../pages/settings/";
import MyContacts from "../pages/myContacts";

class Main extends Component {

    componentDidMount(){
        console.log(ChainTypes);
        dbApi('get_global_properties').then(console.log);
        dbApi('get_dynamic_global_properties').then(console.log);
    }

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
                    <Route path="/user/:name" component={User} />
                    <Route exact path="/contacts" component={MyContacts} />
                    <Route exact path="/help" component={Tbd} />
                </Switch>
            </main>
        )
    }
}

export default Main;
