import React, {Fragment} from 'react';
import Tbd from "../pages/tbd";
import {NavLink, Route, Switch} from "react-router-dom";
import Translate from "react-translate-component";

const PageMenu = ({items, link, path}) => (
    <Fragment>
        <div className="page__menu">
            {items.map((el, id) => (
                <Translate
                    key={id}
                    content={`${el.tag}.title`}
                    component={NavLink}
                    to={`${link}${el.link}`}
                    className="page__menu-item"
                    exact
                />
            ))}
        </div>
        <div className="page__content">
            <Switch>
                {
                    items.map((el, id) => (
                        <Route
                            key={id}
                            path={`${path}${el.link}`}
                            component={el.component ? el.component : Tbd}
                            exact
                        />
                    ))
                }
            </Switch>
        </div>
    </Fragment>
);

export default PageMenu;