import {defaultQuote, defaultToken} from "./networkParams";

export const defaultExchanges = {
    active: `${defaultQuote}_${defaultToken}`,
    list: [
        `${defaultQuote} / ${defaultToken}`
    ]
};