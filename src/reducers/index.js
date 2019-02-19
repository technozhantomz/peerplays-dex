import {combineReducers} from 'redux'
import modal from "./modal";
import instance from "./instance";
import nodesList from "./nodesList";
import wallet from "./wallet";
import user from "./user";
import menu from "./menu";
import overlay from "./overlay";
import account from "./account";
import globalData from "./globalData";

///// create folders and exports to this file
///// example:
// import user from './user/'

///// create combineReducers for all import reducer
const app = combineReducers({
    user,
    account,
    wallet,
    nodesList,
    globalData,
    instance,
    menu,
    overlay,
    modal
});

///// export simple variables example:
export const getModal = state => state.modal;

///// export combine
export default app

