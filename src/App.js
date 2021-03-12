import React, {Component, Fragment} from 'react';
import Header from "./components/layout/header";
import Main from "./components/layout/main";
import Overlay from "./components/layout/overlay";
import Menu from "./components/layout/menu";
import Modal from "./components/helpers/modal/decoration/modal";
import NodeDisconnected from "./components/pages/nodeDisconnected";
import {getStorage, setStorage} from "./actions/storage";
import {initFirstNode, pingNodes} from "./actions/nodes";
import {getPassedTime} from "./actions/getPassedTime";
import {setAccount} from "./dispatch/setAccount";
import {getGlobalData} from "./actions/dataFetching/getGlobalData";
import {setGlobals, setMaintenance} from "./dispatch";
import {setNotifications} from "./dispatch/notificationsDispatch";
import GlobalSearch from "./components/layout/globalSearch";

class App extends Component{
    state = {
        connectEstablished: false,
        nodeSelected: false
    };

    componentDidMount(){
        console.time();
        initFirstNode().then(nodeData => {
            const connectEstablished = true;

            if(!nodeData){
                this.setState({
                    connectEstablished,
                    nodeSelected: false
                });

                return;
            }

            if(window.location.search && window.location.search.indexOf('?r=') === 0){
                const referrer = window.location.search.split('=')[1];
                setStorage('referrer', {name: referrer}, 'sessionStorage');
            }

            getGlobalData()
                .then(({userData, globalData, notifications, lastBlockData}) => {
                    if(userData) setAccount(userData);
                    if(globalData) setGlobals(globalData);
                    if(lastBlockData) setMaintenance(lastBlockData);
                    if(notifications) setNotifications(notifications);
                    console.timeEnd();
                })
                .then(() => {
                    this.setState({
                        connectEstablished,
                        nodeSelected: true
                    })
                });

            const nodesList = getStorage('nodes');
            const pingInterval = 60 * 60 * 1000; // ping interval === 1 hour

            if(!nodesList.list || getPassedTime(nodesList.lastCheck) > pingInterval){
                console.log('PING!');
                pingNodes(nodeData);
            }

        });
    };

    render(){

        const {connectEstablished, nodeSelected} = this.state;

        if(!connectEstablished) return 'Loading';
        if(!nodeSelected) return <NodeDisconnected />;

        const history = this.props.history;

        return (
            <Fragment>
                <GlobalSearch history={history} />
                <Header history={history} />
                <Main />
                <Overlay />
                <Menu />
                <Modal />
            </Fragment>
        )
    }
}

export default App;
