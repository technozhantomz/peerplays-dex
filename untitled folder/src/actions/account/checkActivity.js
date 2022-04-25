import {getAccountData} from "../store";

export const checkActivity = (accountName) =>getAccountData().name === accountName;