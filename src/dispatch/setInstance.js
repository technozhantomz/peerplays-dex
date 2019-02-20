import {dbApi} from "../actions/nodes";
import {getUserHistory} from "../actions/dataFetching";
import {formUserActivity} from "../actions/dataFetching/historyCallbacks";

export const setInstance = node => dispatch => {
    dispatch({type: 'SET_INSTANCE', payload: node});
    // dbApi('set_subscribe_callback', [subscribeEvent, false]);
    // dbApi('set_pending_transaction_callback', [subscribeTrx]);
};

const subscribeEvent = (event) => {
    // console.log('----defaultCallback', event[0]);
};

const subscribeTrx = (event) => {
    // console.log('---trxPending!', event[0]);
    // const account = getStorage('account').name;
    // getUserHistory({
    //     userID: account,
    //     callback: history => console.log('---userHistory', history)
    // })
    // const block_prefix = event[0].ref_block_num;
    // dbApi('set_block_applied_callback', [subsrrr, block_prefix]);
};