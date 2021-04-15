import {defaultNodesList} from "../../params/nodesList";
import {testnetCheck} from "../../params/networkParams";
import {setNodes} from "../../dispatch/setNodes";
import {getStorage, removeStorageItem} from "../storage";
import {setSocketCallBack} from "./setSocketCallback";
import {setInstance} from "../../dispatch";
import {nodeInit} from "./nodeInit";
import {store} from '../../index';
import {ChainStore} from 'peerplaysjs-lib';

export const initFirstNode = async () => {
    const nodesList = getStorage('nodes');
    let initedNode = '';
    let actions = [];

    //Checking local storage. If it has nodes list, then we get active node from there.
    //Else we check first node at nodes list at global variable

    if(!testnetCheck && nodesList.list){
        const {active, list} = nodesList;
        const activeNode = list.find(e => e.url === active);
        const initedInstance = await nodeInit(activeNode.url, true).catch(() => false);

        if(!initedInstance) {
            removeStorageItem('nodes');
            return initFirstNode();
        }

        initedNode = {...activeNode, ...initedInstance};
        actions.push(setNodes(nodesList.list));
    } else {
        for(let node of defaultNodesList){
            let initedInstance = await nodeInit(node.url, true);
            if(initedInstance){
                initedNode = {...node, ...initedInstance};
                break
            }
        }
    }

    ChainStore.setDispatchFrequency(0);
    ChainStore.init();

    actions.push(setInstance(initedNode.instance));

    actions.forEach(e => store.dispatch(e));

    setSocketCallBack(initedNode.instance);

    return initedNode;
};
