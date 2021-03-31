import {dbApi} from "../../nodes";

export const checkLogin = ({login, to, from}) => {

    const toCheck = login || to;

    if(!toCheck) return false;

    if(to && to === from)
      return 'sameAccount';

    return dbApi('get_account_by_name', [toCheck])
        .then(e => !e ? 'accountIsNotExist' : false)
        .catch(() => 'accountIsNotExist');
}