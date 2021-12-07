import { dbApi } from "../../nodes";

export const checkTo = ({ to, from }) => {
  if (to && to === from)
    return 'sameAccount';
  if(to && to.length > 0)
    return dbApi('get_account_by_name', [to])
        .then(e => !e ? 'accountIsNotExist' : false)
        .catch(() => 'accountIsNotExist');
}
