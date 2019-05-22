import {testnetCheck} from "./networkParams";

const testnetNodes = [
    {
        location: 'Northern America - U.S.A. - New York',
        url: 'ws://bts-testnet-1.blckchnd.com/ws',
        user: {
            name: 'Flash Infrastructure Worker ',
            status: 'Witness'
        }
    },
    {
        location: 'Northern America - Canada',
        url: 'ws://bts-testnet-2.blckchnd.com/ws',
        user: {
            name: 'Flash Infrastructure Worker ',
            status: 'Witness'
        }
    },
    {
        location: 'Northern America - U.S.A. - Chicago',
        url: 'wss://node.testnet.bitshares.eu',
        user: {
            name: 'Flash Infrastructure Worker ',
            status: 'Witness'
        }
    },{
        location: 'Northern America - U.S.A. - Chicago',
        url: 'wss://testnet-node.dynx.io',
        user: {
            name: 'Flash Infrastructure Worker ',
            status: 'Witness'
        }
    },
    {
        location: 'Northern America - U.S.A. - Dallas',
        url: 'wss://testnet.node.bitshares.ws',
        user: {
            name: 'Flash Infrastructure Worker ',
            status: 'Witness'
        }
    },
    {
        location: 'Northern America - U.S.A. - Dallas',
        url: 'wss://testnet.node.bitshares.ws',
        user: {
            name: 'Flash Infrastructure Worker ',
            status: 'Witness'
        }
    },
    {
        location: 'Northern America - U.S.A. - Dallas',
        url: 'wss://testnet.node.bitshares.ws',
        user: {
            name: 'Flash Infrastructure Worker ',
            status: 'Witness'
        }
    },
    {
        location: 'Northern America - U.S.A. - Dallas',
        url: 'wss://testnet.node.bitshares.ws',
        user: {
            name: 'Flash Infrastructure Worker ',
            status: 'Witness'
        }
    },
    {
        location: 'Northern America - U.S.A. - Dallas',
        url: 'wss://testnet.node.bitshares.ws',
        user: {
            name: 'Flash Infrastructure Worker ',
            status: 'Witness'
        }
    },
    {
        location: 'Northern America - U.S.A. - Dallas',
        url: 'wss://testnet.node.bitshares.ws',
        user: {
            name: 'Flash Infrastructure Worker ',
            status: 'Witness'
        }
    },
    {
        location: 'Northern America - U.S.A. - Dallas',
        url: 'wss://testnet.node.bitshares.ws',
        user: {
            name: 'Flash Infrastructure Worker ',
            status: 'Witness'
        }
    }
];

const prodNodes = [{
        location: 'Northern America - U.S.A. - Dallas',
        url: 'wss://bitshares.openledger.info/ws',
        user: {
            name: 'Flash Infrastructure Worker ',
            status: 'Witness'
        }
    },
    {
        location: 'Northern America - U.S.A. - Dallas',
        url: 'wss://citadel.li/node',
        user: {
            name: 'Flash Infrastructure Worker ',
            status: 'Witness'
        }
    },
    {
        location: 'Northern America - U.S.A. - Dallas',
        url: 'wss://btsws.roelandp.nl/ws',
        user: {
            name: 'Flash Infrastructure Worker ',
            status: 'Witness'
        }
    }
];

export const defaultNodesList = testnetCheck ? testnetNodes : prodNodes;