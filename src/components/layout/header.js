import React from 'react';
import {store} from '../../index';
import Dropdown from "../helpers/dropdown";
import UserData from "../helpers/userData";

const openMenu = () => {
    [
        {type: 'OPEN_MENU'},
        {type: 'SET_OVERLAY', payload: 'MENU'},
    ].forEach(e => store.dispatch(e))
};

const Header = () => (
    <header>
        <button className="header__burger" onClick={openMenu}>
            <span></span>
            <span></span>
            <span></span>
        </button>
        <div className="header__user-data">
            <div className="header__notifications">

            </div>
            <Dropdown
                btn={<div className="header__avatar btn-round btn-round--light-blue">TS</div>}
                body={<UserData />}
            />
            <div className="user">

            </div>
        </div>
    </header>
);

export default Header;
