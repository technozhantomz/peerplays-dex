import {Apis} from "bitsharesjs-ws";
import {getPassedTime} from "../getPassedTime";

export const nodeInit = async (url) => {

    const start = new Date();

    const instance = new Apis();

    instance.connect(url, 1000);

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