import { dbApi } from "../../nodes";

export const checkTo = ({ to, from }) => {

  if (!to) return 'required';

  if (to && to === from)
    return 'sameAccount';

  return dbApi('get_account_by_name', [to])
    .then(e => !e ? 'accountIsNotExist' : false)
    .catch(() => 'accountIsNotExist');
}