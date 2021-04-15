import React, {Component} from "react";
import Translate from "react-translate-component";
import {Sidechains} from "../../params/networkParams";
import ActionsBtn from "./buttons/actionsBtn";
import Link from "react-router-dom/es/Link";
import {store} from "../../index";
import {removeStorageItem} from "../../actions/storage";
import {dispatchSendModal} from "../../actions/forms/dispatchSendModal";
import UnlockProfile from "./unlockProfile";
import Button from "./buttons/button";
import RoundButton from "./buttons/roundButton";
import { dispatchGenerateAddress } from '../../actions/forms/dispatchGenerateAddress';

class UserData extends Component{
    state = {
      sidechainAddresses: {}
    };

    componentDidMount() {
      const sidechainAddresses = {};
      Sidechains.map((el) => {
          if(this.props.sidechainAccounts) {
              var acc = this.props.sidechainAccounts.find(({sidechain}) => sidechain == el.toLowerCase());
              if(acc) {
                  sidechainAddresses[el] = acc.deposit_address;
              }
          }
      });

      this.setState({sidechainAddresses});
    }

    logout = () => {
        ['account', 'notifications'].forEach(type => {
            removeStorageItem(type);
            removeStorageItem(type, 'sessionStorage');
            store.dispatch({type: `REMOVE_${type.toUpperCase()}`})
        });
        this.props.history.push('/');
    };

    sendUserTokens = e => {
        this.closeDropdown(e);
        dispatchSendModal();
    };

    generateAddress = (e, sidechain) => {
      this.closeDropdown(e);
      dispatchGenerateAddress(sidechain);
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
        const {data} = this.props;
        const {sidechainAddresses} = this.state;

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
                </div>
                <Translate content="layout.sidechainAccounts" component="h3" className="drop-user__wallets-title" />
                <div className="drop-user__sidechain-address">
                    {Sidechains.map((el) => (
                        sidechainAddresses[el] != undefined ? <div key={el}><span>{el}</span><span> : </span><span>{sidechainAddresses[el]}</span></div> : <RoundButton key={el} tag={`generate${el}Address`} className="btn-round--light-blue" onClick={(e) => this.generateAddress(e, el)} />
                    ))}
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