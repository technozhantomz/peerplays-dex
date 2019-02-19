import {getStorage} from "../storage";
import {dbApi} from "../nodes";
import {getCache, cacheOps} from "../cacheOps";

export const getUserName = async (id) => {
    const activeUser = getStorage('account');
    if(activeUser.id === id) return activeUser.name;

    const cachedUsers = getCache('accounts');

    if(cachedUsers && cachedUsers[id]) return cachedUsers[id];

    const userName = await dbApi('get_accounts', [[id]]).then(acc => acc[0].name);
    cacheOps('accounts', {[id]: userName});

    return userName;
};