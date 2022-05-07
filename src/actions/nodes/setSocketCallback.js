import {store} from '../../index';
import {nodeInit} from "./nodeInit";
import {setInstance} from "../../dispatch";
import {getFullAccount} from "../account";
import {getStore} from "../store";

export const setSocketCallBack = (instance) => {
    instance.setRpcConnectionStatusCallback(async status => {
        if(status !== 'closed') return;

        const {instance, account} = getStore();

        const activeUrl = instance.url;
        const newInstance = nodeInit(activeUrl, true);

        setInstance(newInstance);

        if(account){
            await getFullAccount(account.name, true);
        }
    });
};