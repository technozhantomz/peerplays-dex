import {getUserName} from "../../account/index";
import {getSpecificFee, getUserHistory} from "../index";
import {formPermissionHistory} from "../historyCallbacks/index";
import {getGlobals} from "../../store";

export const fetchPermissions = async (context) => {
    const basicData = context.props.data.keys;
    const permissions = await getPermissions(basicData);
    const history = await getUserHistory({
        filter: 6,
        callback: formPermissionHistory
    });
    const basicFee = getGlobals().fees['account_update'];
    return {basicData, permissions, history, basicFee};
};

const getPermissions = async (keys) => {
    const result = {
        active: '',
        owner: '',
        memo: '',
    };

    await Promise.all(Object.keys(result).map(async el => {
        result[el] = await formPermission(keys[el]);
    }));

    return result;
};

const formPermission = async (keys) => {
    const result = {
        threshold: 0,
        list: []
    };

    if(keys.memo_key) {
        result.list.push({key: keys.memo_key});
        return result;
    }

    const {weight_threshold, account_auths, address_auths, key_auths} = keys;
    let maxWeight = 0;

    result.threshold = weight_threshold;

    if(account_auths.length){
        await Promise.all(account_auths.map(async ( [name, weight] ) => {
            const accountName = await getUserName(name);

            if(weight > maxWeight) maxWeight = weight;

            result.list.push({
                type: 'account_auths',
                key: accountName,
                weight: weight,
                percent: '',
                actions: ''
            });
        }));
    }

    if(address_auths.length){

    }

    if(key_auths.length){
        key_auths.forEach(( [key, weight] ) => {
            if(weight > maxWeight) maxWeight = weight;
            result.list.push({ type: 'key_auths', key, weight, percent: 0, actions: '' })
        });
    }

    result.list.forEach(el => el.percent = el.weight / maxWeight * 100 + '%');

    return result;
};