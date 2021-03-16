import React, {Component} from "react";
import Translate from "react-translate-component";
import {IconCross} from "../../svg";
import ActionsBtn from "./buttons/actionsBtn";
import Link from "react-router-dom/es/Link";
import {store} from "../../index";
import {removeStorageItem} from "../../actions/storage";
import {dispatchSendModal} from "../../actions/forms/dispatchSendModal";
import UnlockProfile from "./unlockProfile";
import Button from "./buttons/button";
import RoundButton from "./buttons/roundButton";
import {setModal} from "../../dispatch";
import DepositModal from "./modal/content/depositModal";

class UserData extends Component{

    logout = () => {
        ['account', 'notifications'].forEach(type => {
            removeStorageItem(type);
            removeStorageItem(type, 'sessionStorage');
            store.dispatch({type: `REMOVE_${type.toUpperCase()}`})
        });
    };

    sendUserTokens = e => {
        this.closeDropdown(e);
        dispatchSendModal();
    };

    setDeposit = e => {
        this.closeDropdown(e);
        setModal(<DepositModal />);
    }

    closeDropdown = (e) => {
        let node = e.target;

        while(!node.classList.contains('open')){
            if(node.tagName === 'BODY') break;
            node = node.parentNode;
        }

        node.classList.remove('open');
    };

    render(){
        const data = this.props.data;
        return(
            <div className="drop-user">
                <div className="drop-user__title">
                    <Link to="/assets/" className="drop-user__name" onClick={this.closeDropdown}>{data.name}</Link>
                    <div className="drop-user__user-actions">
                        <UnlockProfile closeDropdown={this.closeDropdown} />
                        <ActionsBtn
                            actionsList={[
                                <Button tag="logout" onClick={this.logout} />
                            ]}
                        />
                    </div>
                </div>
                <div className="drop-user__assets">
                    {data.assets.map((el, id) => (
                        <div key={id} className="drop-user__asset">
                            <span>{el.symbol}</span>
                            <span>{el.setPrecision()}</span>
                        </div>
                    ))}
                </div>
                <div className="drop-user__btn-wrapper">
                    <RoundButton tag="sendFunds" className="btn-round--light-blue" onClick={this.sendUserTokens} />
                    <RoundButton tag="deposit" className="btn-round--grey" onClick={this.setDeposit} />
                </div>
                {/* <Translate content="layout.switchAccount" component="h3" className="drop-user__wallets-title" />
                <div className="drop-user__wallets">
                    {
                        userWallets.map((el, id) => (
                            <div key={id} className="drop-user__wallet">
                                <h4 className="drop-user__wallet-name">{el.name}</h4>
                                <span className="drop-user__wallet-quantity">{el.asset.quantity} {el.asset.name}</span>
                            </div>
                        ))
                    }
                </div>
                <button className="btn-round btn-round--light-blue drop-user__add">
                    <IconCross />
                </button> */}
            </div>
        )
    }
}

export default UserData;