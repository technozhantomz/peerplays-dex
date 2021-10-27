import React, {Component} from "react";
import Translate from "react-translate-component";
import {editStorage, getStorage} from "../../../actions/storage/index";
import Dropdown from "../../helpers/form/dropdown";
import SelectHeader from "../../helpers/selectHeader";
import {deleteCookie, getCookie, setCookie} from "../../../actions/cookie";

class Security extends Component{
    state = {
        walletLock: getStorage('settings').walletLock
    };

    changeLock = (e) => {

        const password = getCookie('password');
        const walletLock = Number(e.target.innerText);
        const result = {walletLock};

        editStorage('settings', result);

        if(password && walletLock === 0){
            deleteCookie('password');
        } else if(password){
            setCookie('password', password);
        }

        this.setState(result);
    };

    render(){

        const walletLock = this.state.walletLock;
        const list = ['0', '30', '60', '90', '180', '210'];

        return(
            <div className="security">
                <div className="security__item">
                    <Translate content="security.lock" component="h2" />
                    <Dropdown
                        btn={<SelectHeader labelTag="security.lockLabel" text={walletLock} />}
                        list={list.map((e, id) => <button key={id} onClick={this.changeLock}>{e}</button>)}
                    />
                </div>
                {/* <div className="security__item">
                    <Translate content="security.password" component="h2" />
                    <Translate content="global.tbd" className="security__tbd" />
                </div> */}
            </div>
        )
    }
};

export default Security;