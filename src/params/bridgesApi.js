const blockTradesAPIs = {
    BASE: "https://api.blocktrades.us/v2",
    COINS_LIST: "/coins",
    ACTIVE_WALLETS: "/active-wallets",
    TRADING_PAIRS: "/trading-pairs",
    DEPOSIT_LIMIT: "/deposit-limits",
    ESTIMATE_OUTPUT: "/estimate-output-amount",
    ESTIMATE_INPUT: "/estimate-input-amount"
};

const openledgerAPIs = {
    BASE: "https://ol-api1.openledger.info/api/v0/ol/support",
    COINS_LIST: "/coins",
    ACTIVE_WALLETS: "/active-wallets",
    TRADING_PAIRS: "/trading-pairs",
    DEPOSIT_LIMIT: "/deposit-limits",
    ESTIMATE_OUTPUT: "/estimate-output-amount",
    ESTIMATE_INPUT: "/estimate-input-amount",
    RPC_URL: "https://openledger.info/api/",
    ADDRESS_CHECK: {
        PRE: "/support/wallets/",

    }
};

const rudexAPIs = {
    BASE: "https://gateway.rudex.org/api/v0_1",
    COINS_LIST: "/coins",
    NEW_DEPOSIT_ADDRESS: "/new-deposit-address"
};

const bitsparkAPIs = {
    BASE: "https://dex-api.bitspark.io/api/v1",
    COINS_LIST: "/coins",
    ACTIVE_WALLETS: "/active-wallets",
    TRADING_PAIRS: "/trading-pairs",
    DEPOSIT_LIMIT: "/deposit-limits",
    ESTIMATE_OUTPUT: "/estimate-output-amount",
    ESTIMATE_INPUT: "/estimate-input-amount"
};

const cryptoBridgeAPIs = {
    BASE: "https://api.crypto-bridge.org/api/v1",
    COINS_LIST: "/coins",
    ACTIVE_WALLETS: "/wallets",
    MARKETS: "/markets",
    TRADING_PAIRS: "/trading-pairs"
};

const widechainAPIs = {
    BASE: "https://gateway.winex.pro/api/v0/ol/support",
    COINS_LIST: "/coins",
    ACTIVE_WALLETS: "/active-wallets",
    NEW_DEPOSIT_ADDRESS: "/new-deposit-address",
    WITHDRAW_HISTORY: "/latelyWithdraw",
    TRADING_PAIRS: "/trading-pairs",
    DEPOSIT_HISTORY: "/latelyRecharge"
};

const citadelAPIs = {
    BASE: "https://citadel.li/trade",
    COINS_LIST: "/coins",
    ACTIVE_WALLETS: "/active-wallets",
    TRADING_PAIRS: "/trading-pairs",
    DEPOSIT_LIMIT: "/deposit-limits",
    ESTIMATE_OUTPUT: "/estimate-output-amount",
    ESTIMATE_INPUT: "/estimate-input-amount"
};

const gdex2APIs = {
    BASE: "https://api.gdex.io/adjust",
    COINS_LIST: "/coins",
    ACTIVE_WALLETS: "/active-wallets",
    TRADING_PAIRS: "/trading-pairs"
};

// Legacy Deposit/Withdraw
const gdexAPIs = {
    BASE: "https://api.gdex.io",
    ASSET_LIST: "/gateway/asset/assetList",
    ASSET_DETAIL: "/gateway/asset/assetDetail",
    GET_DEPOSIT_ADDRESS: "/gateway/address/getAddress",
    CHECK_WITHDRAY_ADDRESS: "/gateway/address/checkAddress",
    DEPOSIT_RECORD_LIST: "/gateway/deposit/recordList",
    DEPOSIT_RECORD_DETAIL: "/gateway/deposit/recordDetail",
    WITHDRAW_RECORD_LIST: "/gateway/withdraw/recordList",
    WITHDRAW_RECORD_DETAIL: "/gateway/withdraw/recordDetail",
    GET_USER_INFO: "/gateway/user/getUserInfo",
    USER_AGREEMENT: "/gateway/user/isAgree",
    WITHDRAW_RULE: "/gateway/withdraw/rule"
};

const xbtsxAPIs = {
    BASE: "https://apis.xbts.io/api/v1",
    COINS_LIST: "/coin"
};

export const bridgesList = [
    {
        name: 'Block Trades',
        api: blockTradesAPIs
    },
    {
        name: 'Open Ledger',
        api: openledgerAPIs
    },
    {
        name: 'Rudex',
        api: rudexAPIs
    },
    {
        name: 'Bitspark',
        api: bitsparkAPIs
    },
    {
        name: 'Crypto Bridge',
        api: cryptoBridgeAPIs
    },
    // {
    //     name: 'Widechain',
    //     api: widechainAPIs
    // },
    // {
    //     name: 'Citadel',
    //     api: citadelAPIs
    // },
    {
        name: 'Gdex',
        api: gdex2APIs
    },
    // {
    //     name: 'Gdex (old)',
    //     api: gdexAPIs
    // },
    {
        name: 'Xbtsx',
        api: xbtsxAPIs
    }
];