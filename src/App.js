import React, {Component, Fragment} from 'react';
import Header from "./components/layout/header";
import Main from "./components/layout/main";
import Overlay from "./components/helpers/overlay";
import Menu from "./components/helpers/menu";
import Modal from "./components/helpers/modal/modal";
import NodeDisconnected from "./components/pages/nodeDisconnected";
import {getStorage} from "./actions/storage";
import {initFirstNode, pingNodes} from "./actions/nodes";
import {getPassedTime} from "./actions/getPassedTime";
import {setAccount} from "./dispatch/setAccount";
import {getGlobalData} from "./actions/dataFetching/getGlobalData";
import {setGlobals} from "./dispatch";

class App extends Component{
    state = {
        connectEstablished: false,
        nodeSelected: false
    };

    componentDidMount(){
        initFirstNode().then(nodeData => {
            const connectEstablished = true;

            const account = getStorage('account');

            if(!nodeData){
                this.setState({
                    connectEstablished,
                    nodeSelected: false
                })

                return;
            }

            getGlobalData(account)
                .then(({userData, fees}) => {
                    if(userData) setAccount(userData);
                    if(fees) setGlobals({fees});
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
