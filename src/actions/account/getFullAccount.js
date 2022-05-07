import {dbApi} from "../nodes";

export const getFullAccount = (name, subscription = false) => dbApi('get_full_accounts', [[name], subscription])
    .then(e => e.length ? e[0][1] : false)
    .catch(() => false);