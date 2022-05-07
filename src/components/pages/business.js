import React, {Component} from "react";
import Translate from "react-translate-component";
import {connect} from "react-redux";
import NeedToLogin from "../helpers/needToLogin";
import PageMenu from "../helpers/pageMenu";
import CreatedAssets from "./business/createdAssets";

const basicMenu = [
    {
        link: '/',
        tag: 'createdAssets',
        component: CreatedAssets
    }
];

class Business extends Component{
    render(){

        const userData = this.props.account;

        if(!userData) return <NeedToLogin pageName={'assets'} />;

        return(
            <div className="container page">
                <div className="page__header-wrapper">
                    <Translate component="h1" className="page__title" content="business.title"/>
                </div>
                <PageMenu items={basicMenu} link={`/business`} path={'/business'} data={userData} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({account: state.accountData});

export default connect(mapStateToProps)(Business);