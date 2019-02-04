import React from 'react';
import {NavLink, Route, Switch} from "react-router-dom";
import Tbd from "./tbd";
import Translate from "react-translate-component";
import Witnesses from "./witnesses";
import Committee from "./committee";
import Fees from "./fees";
import Explorer from "./explorer";

const blockchainMenu = [
    {
        link: '/',
        tag: 'blockchain',
        component: Explorer
    },
    {
        link: '/assets',
        tag: 'assets'
    },
    {
        link: '/witnesses',
        tag: 'witnesses',
        component: Witnesses
    },
    {
        link: '/committee',
        tag: 'committee',
        component: Committee
    },
    {
        link: '/markets',
        tag: 'markets',
    },
    {
        link: '/fees',
        tag: 'fees',
        component: Fees
    }
];

const Blockchain = () => (
    <div className="container page">
        <div className="page__header-wrapper">
            <h1 className="page__title">Blockchain</h1>
        </div>
        <div className="page__menu">
            {
                blockchainMenu.map((el, id) => (
                    <Translate
                        key={id}
                        content={`blockchain.${el.tag}.title`}
                        component={NavLink}
                        to={`/blockchain${el.link}`}
                        className="page__menu-item"
                        exact
                    />
                ))}
        </div>
        <div className="page__content">
            <Switch>
                {
                    blockchainMenu.map((el, id) => (
                        <Route
                            key={id}
                            path={`/blockchain${el.link}`}
                            component={el.component ? el.component : Tbd}
                            exact
                        />
                    ))
                }
            </Switch>
        </div>
    </div>
);

export default Blockchain;