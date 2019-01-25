import {Wallet} from "../../classes";
import {getFromDB} from "../iDB";
import {store} from '../../index';

export const addWallet = async (name, password = '123456') => {
    let walletsLength = await getFromDB('wallets').then(e => e.length);
    const {user, wallet} = store.getState();
    const keyBuffer = user.decryptBuffer(password);

    const brainSequence = wallet.decrypt(keyBuffer);

    const newWallet = new Wallet({});

    name = `walletName-${walletsLength}`;

    await newWallet.create(keyBuffer, name, brainSequence, walletsLength);

    return await getFromDB('wallets');
};