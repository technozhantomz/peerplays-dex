import {dbApi} from "../nodes";

export const getSidechainAccounts = (accountId) => dbApi('get_sidechain_addresses_by_account', [accountId])
    .then(e => e.length ? e : false)
    .catch(() => false);