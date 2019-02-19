import {getUserName} from "../account";
import {getSpecificFee, getUserHistory} from "./index";
import {dbApi} from "../nodes";
import {formPermissionHistory} from "./historyCallbacks";

export const fetchPermissions = async (context) => {
    const basicData = await getBasicData(context.props.match.params.name);
    const permissions = await getPermissions(basicData);
    const history = await getUserHistory({
        filter: 6,
        callback: formPermissionHistory
    });
    const basicFee = await getSpecificFee('account_update');
    return {basicData, permissions, history, basicFee};
};

const getBasicData = (name) => dbApi('get_account_by_name', [name]).then(async user => ({
    active: user.active,
    owner: user.owner,
    memo: {memo_key: user.options.memo_key}
}));

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