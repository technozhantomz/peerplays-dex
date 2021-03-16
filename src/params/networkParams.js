import Config from './config';

export const testnetCheck = window.location.origin !== Config.dexUrl;

export const defaultToken = Config.defaultToken;
export const defaultNetwork = 'Peerplays';
export const defaultQuote = Config.defaultQuote;
export const faucetUrl = Config.faucetUrl;
export const defaultChainId = Config.defaultChainID;

export const defaultChainParams = {
    core_asset: defaultToken,
    chain_id: defaultChainId,
    address_prefix: defaultToken
};