import {lookupAccounts} from "./lookupAccounts";
import {lookupBlock} from "./lookupBlock";
import {lookupToken} from "./lookupToken";

export const searchFuncs = {
    users: lookupAccounts,
    blocks: lookupBlock,
    tokens: lookupToken
};