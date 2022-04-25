import { dbApi } from "../../nodes";

export const checkReferrer = async ({ referrer }) => {
  if (!referrer) return false;

  const referrerAccount = await dbApi('get_account_by_name', [referrer])
  if (!referrerAccount) {
    return 'modal.createUser.referrerError';
  }

  var now = new Date;
  var utc_timestamp = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),
    now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());

  if (Date.parse(referrerAccount.membership_expiration_date) < utc_timestamp) {
    return 'modal.createUser.referrerMembership';
  }
  return false;
};
