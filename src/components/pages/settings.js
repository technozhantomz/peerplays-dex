import React from 'react';
import {NavLink, Route, Switch} from "react-router-dom";
import GeneralSettings from "./generalSettings";
import NodesSelect from "./nodesSelect";
import Security from "./security";
import Backup from "./backup";
import {IconMore} from "../../svg";
import Translate from "react-translate-component";
import Tbd from "./tbd";
import Dropdown from "../helpers/dropdown";

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
    }
];

const Settings = () => (
    <div className="container page">
        <div className="page__title-wrapper">
            <h1 className="page__title">Settings</h1>
            <Dropdown
                btn={<IconMore className="btn btn--icon" />}
                list={[
                    <button>Reset Settings</button>,
                    <button>Body 2</button>,
                    <button>Body 2</button>
                ]}
            />
        </div>
        <div className="page__menu">
            {settingsMenu.map((el, id) => (
                <Translate
                    key={id}
                    content={`${el.tag}.title`}
                    component={NavLink}
                    to={`/settings${el.link}`}
                    className="page__menu-item"
                    exact
                />
            ))}
        </div>
        <div className="page__content">
            <Switch>
                {
                    settingsMenu.map((el, id) => (
                        <Route
                            key={id}
                            path={`/settings${el.link}`}
                            component={el.component ? el.component : Tbd}
                            exact
                        />
                    ))
                }
            </Switch>
        </div>
    </div>
);

export default Settings;