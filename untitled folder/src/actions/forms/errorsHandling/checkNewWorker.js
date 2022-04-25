import {dbApi} from "../../nodes";

export const checkNewWorker = ({newWorkerName}) => {
    if(!newWorkerName) return false;
    newWorkerName = newWorkerName.trim();
    return dbApi('get_all_workers').then(e => e.find(e => e.name === newWorkerName) ? 'usedWorkerName' : false)
};