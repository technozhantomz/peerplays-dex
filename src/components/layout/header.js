import React from 'react';
import {connect} from "react-redux";
import {setModal} from "../../dispatch/setModal";
import {store} from '../../index';
import Dropdown from "../helpers/dropdown";
import UserData from "../helpers/userData";
import {IconNotify} from "../../svg";
import Notifications from "../helpers/notifications";
import Avatar from "../helpers/avatar";
import LogIn from "../helpers/logIn";

const openMenu = () => {
    [
        {type: 'OPEN_MENU'},
        {type: 'SET_OVERLAY', payload: 'MENU'},
    ].forEach(e => store.dispatch(e))
};

const Header = ({account}) => (
    <header>
        <button className="header__burger" onClick={openMenu}>
            <span></span>
            <span></span>
            <span></span>
        </button>
        <div className="header__user-data">
            {!account
                ? <button
                    onClick={() => setModal(<LogIn/>)}
                >
                    Log in
                </button>
                : <React.Fragment>
                    <Dropdown
                        btn={<IconNotify />}
                        body={<Notifications />}
                        position="bottom-right"
                    />
                    <Dropdown
                        btn={<Avatar userName={account.name} />}
                        body={<UserData data={account} />}
                        position="top-right"
                    />
                </React.Fragment>
            }
        </div>
    </header>
);

const mapStateToProps = (state) => ({account: state.account});

export default connect(mapStateToProps)(Header);
