import React from 'react';
import GeneralSettings from "./generalSettings";
import NodesSelect from "./nodesSelect";
import Security from "./security";
import Backup from "./backup";
import Translate from "react-translate-component";
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
        link: '/security',
        tag: 'security',
        component: Security
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
            <Translate content={'settings.title'} component="h1" className="page__title" />
        </div>
        <PageMenu items={account ? settingsMenu : settingsMenu.slice(0, settingsMenu.length - 1)} link={'/settings'} path={'/settings'} />
    </div>
);

const mapStateToProps = state => ({account: state.accountData});

export default connect(mapStateToProps)(Settings);