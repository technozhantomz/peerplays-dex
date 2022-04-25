import React, {Component} from "react";
import {IconLocked, IconUnlocked} from "../../svg";
import {connect} from "react-redux";
import PasswordCheck from "./modal/content/passwordCheck";
import {setModal} from "../../dispatch/layoutDispatch";

class UnlockProfile extends Component{

    lockProfile = (e) => {
        e.preventDefault();
        setTimeout(() => this.props.loginData.removePassword(), 0);
    };

    unlockProfile = (e) => {
        this.props.closeDropdown(e);
        setModal(<PasswordCheck />)
    };

    render(){
        return this.props.loginData.password
            ? <button onClick={this.lockProfile}><IconUnlocked /></button>
            : <button onClick={this.unlockProfile}><IconLocked /></button>
    }
}

const mapStateToProps = state => ({loginData: state.loginData});

export default connect(mapStateToProps)(UnlockProfile);