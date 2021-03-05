import React, {Fragment} from 'react';
import {menuList} from "../../params/menuList";
import {NavLink} from "react-router-dom";
import Translate from "react-translate-component";
import {connect} from "react-redux";
import {store} from "../../index";

const closeMenu = () => {
    [
        {type: `CLOSE_MENU`},
        {type: 'REMOVE_OVERLAY'}
    ].forEach(e => store.dispatch(e))
};

const Menu = (props) => (
    <div className={`menu${props.menu ? ' open' : ''}`}>
        <div className="menu__logo-wrapper">
            <img src={require('../../images/logo.png')} alt=""/>
        </div>
        {
            menuList.map((el, id) => (
                <Fragment key={id}>
                    <NavLink className="menu__item" exact to={el.link} onClick={closeMenu}>
                        <span className="menu__icon-wrapper">{el.icon}</span>
                        <Translate content={`${el.tag}.title`} />
                    </NavLink>
                    { (id + 1) % 3 === 0 && id !== 8 && <div className="menu__separator" />}
                </Fragment>
            ))
        }
    </div>
);

const mapStateToProps = (state) => ({menu: state.menu});

export default connect(mapStateToProps)(Menu);