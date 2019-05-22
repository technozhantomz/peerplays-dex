import React from 'react';
import {NavLink, Route, Switch} from "react-router-dom";
import GeneralSettings from "./generalSettings";
import NodesSelect from "./nodesSelect";
import Security from "./security";
import Backup from "./backup";
import Translate from "react-translate-component";
import Tbd from "../tbd";
import ActionsBtn from "../../helpers/buttons/actionsBtn";
import PageMenu from "../../helpers/pageMenu";
import Membership from "./membership";
import {connect} from "react-redux";

const settingsMenu = [
    {
        link: '/',
        tag: 'general',
        component: GeneralSettings
    },
    {
        link: '/wallet',
        tag: 'wallet'
    },
    {
        link: '/security',
        tag: 'security',
        component: Security
    },
    {
        link: '/nodes',
        tag: 'nodes',
        component: NodesSelect
    },
    {
        link: '/backup',
        tag: 'reBackup',
        component: Backup
    },
    {
        link: '/membership',
        tag: 'membership',
        component: Membership
    }
];

const Settings = ({account}) => (
    <div className="container page">
        <div className="page__header-wrapper">
            <h1 className="page__title">Settings</h1>
            <ActionsBtn
                actionsList={[
                    <button>Reset Settings</button>,
                    <button>Body 2</button>,
                    <button>Body 2</button>
                ]}
            />
        </div>
        <PageMenu items={account ? settingsMenu : settingsMenu.slice(0, settingsMenu.length - 1)} link={'/settings'} path={'/settings'} />
    </div>
);

const mapStateToProps = state => ({account: state.accountData});

export default connect(mapStateToProps)(Settings);