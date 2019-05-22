import {getPassedTime} from "../getPassedTime";
import {Apis} from "bitsharesjs-ws";

export const nodeInit = async (url, actualNode = false) => {

    const start = new Date();

    let instance = '';

    if(actualNode){
        if(Apis.instance().chain_id) {
            // await dbApi('cancel_all_subscriptions');
            await Apis.instance().close();
        }
        instance = Apis.instance(url, true);
    } else {
        instance = new Apis();
        instance.connect(url, 1000);
    }

    return instance.init_promise
        .then(() => ({
            instance,
            connectTime: getPassedTime(start)
        }))
        .catch(e => {
            console.error('--error', e);
            return false;
        });
};