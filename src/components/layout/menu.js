import React, {Fragment} from 'react';
import {menuList} from "../../params/menuList";
import {NavLink} from "react-router-dom";
import Translate from "react-translate-component";
import {connect} from "react-redux";
import {getStorage} from "../../actions/storage/index";
import {clearLayout} from "../../dispatch/layoutDispatch";
import Logo from '../../images/logo.png';

const Menu = (props) => (
    <div className={`menu${props.menu ? ' open' : ''}`}>
        <div className="menu__logo-wrapper">
            <img src={Logo} alt=""/>
        </div>
        {
            menuList.map((el, id) => {

                const advancedMode = getStorage('settings').advancedMode;
                if(!advancedMode && (el.tag === 'blockchain' || el.tag === 'voting' || el.tag === 'business')) {
                  return null;
                }

                let link = el.link;

                if(el.tag === 'exchange') link = `${el.link}/${getStorage('exchanges').active}`;

                return (
                    <Fragment key={id}>
                        <NavLink className="menu__item" exact to={link} onClick={clearLayout}>
                            <span className="menu__icon-wrapper">{el.icon}</span>
                            <Translate content={`${el.tag}.title`} />
                        </NavLink>
                        { (id + 1) % 3 === 0 && id !== 8 && <div className="menu__separator" />}
                    </Fragment>
                )
            })
        }
    </div>
);

const mapStateToProps = (state) => ({menu: state.layout.menu});

export default connect(mapStateToProps)(Menu);