import {removeAccount, setAccount} from "../../../dispatch/setAccount";
import {getStorage, removeStorageItem, setStorage} from "../../storage";
import {getAccountData} from "../../store";
import {clearLayout} from "../../../dispatch";
import {getStoragedAccount} from "../../account";

export const handleLogin = data => {
    const currentAcc = getStoragedAccount().type;
    const currentReduxAcc = getAccountData();

    if(currentAcc) removeStorageItem('account');
    if(currentReduxAcc) removeAccount();

    if(data){
        const storageType = data.remember ? 'localStorage' : 'sessionStorage';
        setStorage('account', data.localData, storageType);
        setAccount(data);
        clearLayout();
    }
};