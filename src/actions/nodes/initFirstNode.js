import {defaultNodesList} from "../../params/nodesList";
import {setNodes} from "../../dispatch/setNodes";
import {getStorage, removeStorageItem} from "../storage";
import {setSocketCallBack} from "./setSocketCallback";
import {setInstance} from "../../dispatch";
import {nodeInit} from "./nodeInit";
import {store} from '../../index';

export const initFirstNode = async () => {
    const nodesList = getStorage('nodes');
    let initedNode = '';
    let actions = [];

    //Checking local storage. If it has nodes list, then we get active node from there.
    //Else we check first node at nodes list at global variable

    if(nodesList.list){
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
            console.log(initedInstance);
            if(initedInstance){
                initedNode = {...node, ...initedInstance};
                break
            }
        }
    }

    actions.push(setInstance(initedNode.instance));

    actions.forEach(e => store.dispatch(e));

    // setSocketCallBack(initedNode.instance);

    return initedNode;
};
