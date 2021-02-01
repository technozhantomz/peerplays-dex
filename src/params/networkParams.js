export const testnetCheck = window.location.origin !== 'http://bitshares-ui-realdata.test.graphenelab.io';

export const defaultToken = testnetCheck ? 'TEST' : 'TEST';
export const defaultNetwork = testnetCheck ? 'PeerplaysTestnet' : 'PeerplaysTestnet';
export const defaultQuote = testnetCheck ? 'YFLVXHNUPGFEAJRO' : 'TEST';

export const defaultChainId = '4018d7844c78f6a6c41c6a552b898022310fc5dec06da467ee7905a8dad512c8';

export const defaultChainParams = {
    core_asset: defaultToken,
    chain_id: defaultChainId,
    address_prefix: defaultToken
};