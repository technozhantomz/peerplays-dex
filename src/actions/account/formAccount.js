import {formAssetsList} from "../assets/formAssetsList";
import {dbApi} from "../nodes";

export const formAccount = async (id, name, balances) => {
    const assets = await formAssetsList(name, balances);
    const keys = await dbApi('get_account_by_name', [name]).then(acc => {
        return {
            active: acc.active.key_auths[0],
            owner: acc.owner.key_auths[0],
            memo: acc.options.memo_key
        }
    });
    return { id, name, assets, keys };
};