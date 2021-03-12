import {dbApi} from "../../nodes";

export const checkLogin = ({login, to}) => {

    const toCheck = login || to;

    if(!toCheck) return false;

    return dbApi('get_account_by_name', [toCheck])
        .then(e => !e ? 'accountIsNotExist' : false)
        .catch(() => 'accountIsNotExist');
}