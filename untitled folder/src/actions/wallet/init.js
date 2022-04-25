import {User, Wallet} from "../../classes";
import {getFromDB} from "../iDB";
import {store} from '../../index';

export const initUser = async () => {
    let userData = await getFromDB('userData');
    let walletsArr = await getFromDB('wallets');
    let activeUser = {};

    if(!userData.length){
        activeUser = new User({});
        const wallet = new Wallet({});
        const brainSequence = 'One two three four five six seven eight nine ten eleven twelve';
        const keyBuffer = activeUser.encrypt('123456');
        const name = `walletName-${walletsArr.length}`;

        await wallet.create(keyBuffer, name, brainSequence, walletsArr.length);

        walletsArr = await getFromDB('wallets');
    } else {
        activeUser = new User(userData[0]);
    }

    const activeWallet = new Wallet(walletsArr[activeUser.active_wallet]);

    [
        {type: 'SET_WALLET', payload: activeWallet},
        {type: 'SET_USER', payload: activeUser}
    ].forEach(store.dispatch);

    return walletsArr;
};