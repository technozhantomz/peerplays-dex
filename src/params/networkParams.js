export const testnetCheck = window.location.origin !== 'http://bitshares-ui-realdata.test.graphenelab.io';

export const defaultToken = testnetCheck ? 'TEST' : 'BTS';
export const defaultNetwork = testnetCheck ? 'TEST' : 'BTS';
export const defaultQuote = testnetCheck ? 'TESTUSD' : 'USD';

export const defaultChainId = '4018d7844c78f6a6c41c6a552b898022310fc5dec06da467ee7905a8dad512c8';

export const defaultChainParams = {
    core_asset: defaultToken,
    chain_id: defaultChainId,
    address_prefix: defaultToken
};