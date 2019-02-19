import React, {Component, Fragment} from 'react';
import Header from "./components/layout/header";
import Main from "./components/layout/main";
import Overlay from "./components/helpers/overlay";
import Menu from "./components/helpers/menu";
import Modal from "./components/helpers/modal/modal";
import NodeDisconnected from "./components/pages/nodeDisconnected";
import {getStorage} from "./actions/storage";
import {dbApi, initFirstNode, pingNodes} from "./actions/nodes";
import {getPassedTime} from "./actions/getPassedTime";
import {formAccount} from "./actions/account/formAccount";
import {setAccount} from "./dispatch/setAccount";
import {ChainTypes} from "bitsharesjs";

const getGlobalData = async (account) => {
    let userData = false;

    if(account.id){
        userData = await formAccount(account.id, account.name);
    }

    const opTypes = ChainTypes.operations;
    const globalProps = await dbApi('get_global_properties');
    const feesParams = globalProps.parameters.current_fees.parameters;
    const fees = {};
    Object.keys(opTypes).forEach(el => {
        const fee = feesParams.find(fee => fee[0] === opTypes[el]);
        fees[el] = fee ? fee[1] : {};
    });
    console.log(fees);
};

class App extends Component{
    state = {
        connectEstablished: false,
        nodeSelected: false
    };

    componentDidMount(){
        initFirstNode().then(nodeData => {
            const connectEstablished = true;

            const account = getStorage('account');

            getGlobalData(account);

            if(nodeData && account.id){
                formAccount(account.id, account.name)
                    .then(setAccount)
                    .finally(() => {
                        this.setState({
                            connectEstablished,
                            nodeSelected: nodeData
                        })
                    })
            } else {
                this.setState({
                    connectEstablished,
                    nodeSelected: nodeData
                })
            }

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
