import React, {Component} from 'react';
import {getStorage} from "../../../actions/storage/index";
import QuantityConverter from "../../helpers/quantityConverter";
import UserAssets from "./userAssets";
import OpenOrders from "./openOrders";
import UserActivity from "./userActivity";
import UserPermissions from "./userPermissions";
import UserMargins from "./userMargins";
import PageMenu from "../../helpers/pageMenu";

const basicMenu = [
    {
        link: '/',
        tag: 'userAssets',
        component: UserAssets
    },
    {
        link: '/orders',
        tag: 'orders',
        component: OpenOrders
    },
    {
        link: '/activity',
        tag: 'activity',
        component: UserActivity
    },
    {
        link: '/positions',
        tag: 'positions',
        component: UserMargins
    }
];

const additionalMenu = [
    {
        link: '/blacklist',
        tag: 'blacklist'
    },
    {
        link: '/permissions',
        tag: 'permissions',
        component: UserPermissions
    }
];

class User extends Component{

    state = {
        loading: true,
        isLoggedUser: false
    };

    componentDidMount(){
        this.setNewUser(this.props);
    }

    componentWillReceiveProps(nextProps){
        if(this.props.match.params.name !== nextProps.match.params.name){
            this.setState(
                {loading: true, isLoggedUser: false},
                () => this.setNewUser(nextProps)
            );
        }
    }

    setNewUser = (props) => {
        let isLoggedUser = false;
        const loading = false;
        const loggedUser = getStorage('account').name;

        if(loggedUser === props.match.params.name){
            isLoggedUser = true;
        }

        this.setState({loading, isLoggedUser});
    };

    render(){

        if(this.state.loading) return <span>Loading!</span>;

        const menu = !this.state.isLoggedUser ? basicMenu : [...basicMenu, ...additionalMenu];
        const name = this.props.match.params.name;

        return(
            <div className="container page">
                <div className="page__user-title">
                    <h1 className="page__title">{name}</h1>
                    <QuantityConverter name={name} />
                </div>
                <PageMenu items={menu} link={`/user/${name}`} path={'/user/:name'} />
            </div>
        )
    }
}

export default User;