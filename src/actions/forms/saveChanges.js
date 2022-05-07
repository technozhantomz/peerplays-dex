import {getGlobals, getStore} from "../store";
import {trxBuilder} from "./index";
import {editStorage} from "../storage";

export const saveChanges = async (contacts, password, changeLog) => {
    let result = false;
    const {basicAsset, fees} = getGlobals();
    const {loginData, accountData} = getStore();
    const trx = [];
    const activeKey = loginData.formPrivateKey(password, 'active');

    changeLog.forEach(log => {
        let contact = contacts.find(e => e.id === log.id);
        trx.push({
            type: 'account_whitelist',
            params: {
                fee: {
                    amount: fees.account_whitelist.fee,
                    asset_id: basicAsset.id
                },
                authorizing_account: accountData.id,
                account_to_list: contact.id,
                new_listing: contact.type
            }
        });
    });

    const trxResult = await trxBuilder(trx, [activeKey]);

    if (trxResult) {
        editStorage('contacts', {[accountData.name]: contacts});
        result = true;
    }

    return result;
};