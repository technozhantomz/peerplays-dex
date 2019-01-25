import React, { Component } from 'react';
import Header from "./components/layout/header";
import Main from "./components/layout/main";
import Overlay from "./components/helpers/overlay";
import Menu from "./components/helpers/menu";
import NodeDisconnected from "./components/pages/nodeDisconnected";
import {getStorage} from "./actions/storage";
import {initFirstNode, pingNodes} from "./actions/nodes";
import {getPassedTime} from "./actions/getPassedTime";

class App extends Component{
    state = {
        connectEstablished: false,
        nodeSelected: false
    };

    componentDidMount(){
        initFirstNode().then(nodeData => {

            const connectEstablished = true;

            this.setState({
                connectEstablished,
                nodeSelected: nodeData
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

        return (
            <React.Fragment>
                <Header />
                <Main />
                <Overlay />
                <Menu />
            </React.Fragment>
        )
    }
}

export default App;
