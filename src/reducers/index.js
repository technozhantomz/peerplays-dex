import {combineReducers} from 'redux'
import instance from "./instance";
import nodesList from "./nodesList";
import accountData from "./accountData";
import globalData from "./globalData";
import password from "./password";
import notifications from "./notifications";
import tradingView from "./tradingView";
import votes from "./votes";
import layout from "./layout";
import pageData from "./pageData";
import loginData from "./loginData";
import walletsList from "./walletsList";
import maintenance from "./maintenance";

///// create folders and exports to this file
///// example:
// import user from './user/'

///// create combineReducers for all import reducer
const app = combineReducers({
    loginData,
    accountData,
    walletsList,
    password,
    nodesList,
    pageData,
    tradingView,
    notifications,
    globalData,
    instance,
    maintenance,
    layout,
    votes
});

///// export simple variables example:
export const getModal = state => state.modal;
export const getVotes = state => state.votes;

///// export combine
export default app

