import {nodeInit} from "./nodeInit";
import {setInstance} from "../../dispatch";
import {getStore} from "../store";

const getData = type => (request, data = []) => getStore().instance[type].exec(request, data).catch(async err => {
    const error = 'Error: websocket state error:3';
    const url = getStore().instance.url;
    if(error === err.message) {
        let initedNode = await nodeInit(url, true);
        setInstance(initedNode.instance);
    }
});

export const dbApi = getData('_db');
export const historyApi = getData('_hist');
