import {store} from "../index";
import {dbApi} from "../actions/nodes";
import {getStore} from "../actions/store";

export const setMaintenance = async newBlock => {
    let maintenance = getStore('maintenance');
    if(!maintenance || maintenance.nextMaintenance !== newBlock.next_maintenance_time){
        if(!maintenance) maintenance = {};
        if(!maintenance.interval) maintenance.interval = await dbApi('get_global_properties').then(e => e.parameters.maintenance_interval);
        maintenance.nextMaintenance = newBlock.next_maintenance_time;
        store.dispatch({type: 'SET_MAINTENANCE', payload: maintenance});
    }
};