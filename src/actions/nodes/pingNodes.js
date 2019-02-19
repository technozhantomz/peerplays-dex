import {defaultNodesList} from "../../params/nodesList";
import {getPassedTime, nodeInit} from "./nodeInit";
import {setNodes} from "../../dispatch/setNodes";
import {getStorage, setStorage} from "../storage";
import {store} from "../../index";
import {setInstance} from "../../dispatch";
import {nodeStruct} from "./nodeStruct";
import {setSocketCallBack} from "./setSocketCallback";

export const pingNodes = async (actualNode = false) => {
    // const startTime = new Date();
    const nodeAutoselect = getStorage('settings').nodeAutoselect;
    const successConnection = [];
    const failedConnection = [];
    let activeNode = getStorage('nodes').active;
    let nodesList = defaultNodesList;

    if(actualNode){
        successConnection.push(actualNode);
        activeNode = actualNode.url;
        nodesList = defaultNodesList.filter(e => e.url !== actualNode.url);
    }

    for(let node of nodesList){
        const {instance, connectTime} = await nodeInit(node.url);

        if(!instance){
            failedConnection.push({...node, connectTime: 0});
            continue;
        }

        await instance.close();
        successConnection.push({...node, connectTime});
    }

    const sortedList = successConnection.sort((prev, next) => prev.connectTime - next.connectTime);
    const needToReconnect = activeNode !== sortedList[0].url && nodeAutoselect;
    const actions = [];

    if(actualNode && needToReconnect){
        await actualNode.instance.close();
    }

    if(needToReconnect){
        const {instance} = await nodeInit(sortedList[0].url, true);
        console.log('--newQuickInstance!', instance);
        actions.push(setInstance(instance));
        setSocketCallBack(instance);
        activeNode = sortedList[0].url;
    }

    const nodesData = {
        lastCheck: new Date().getTime(),
        list: [...sortedList, ...failedConnection],
        active: activeNode
    };

    actions.push(setNodes(nodesData.list));
    setStorage('nodes', nodesData);

    actions.forEach(e => store.dispatch(e));

    // console.log('END OF PING!', getPassedTime(startTime));
};
