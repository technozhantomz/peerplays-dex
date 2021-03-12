import React, {Component} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";

import Dashboard from "../pages/dashboard";
import Tbd from "../pages/tbd";
import User from "../pages/user/";
import Blockchain from "../pages/blockchain";
import Business from "../pages/business";
import Settings from "../pages/settings/";
import MyContacts from "../pages/myContacts";
import Exchange from "../pages/exchange";
import Voting from "../pages/voting";
import MyAssets from "../pages/myAssets";
import Block from "../helpers/block";
import AssetPage from "../pages/asset/assetPage";

class Main extends Component {

    componentDidMount(){
        // console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);
    }

    render() {

        return (
            <main>
                <Switch>
                    <Route exact path="/" component={Dashboard} />
                    <Route exact path="/exchange/:pair" component={Exchange} />
                    <Route path="/assets" component={MyAssets} />
                    <Route path="/blockchain" component={Blockchain} />
                    <Route path="/voting" component={Voting} />
                    <Route path="/business" component={Business} />
                    <Route path="/settings/" component={Settings} />
                    <Route path="/user/:name" component={User} />
                    <Route exact path="/contacts" component={MyContacts} />
                    <Route exact path="/help" component={Tbd} />
                    <Route exact path="/block/:number" component={Block} />
                    <Route path="/asset/:symbol" component={AssetPage} />
                </Switch>
            </main>
        )
    }
}

export default Main;
