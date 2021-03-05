import {walletToRedux} from "../../wallet";

export const formLocalAccount = async (_, walletData) => {

    const localData = {
        type: 'wallet',
        activeUser: 0,
        lastModified: walletData.wallet[0].last_modified,
        walletData
    };

    const { accountData, loginData, walletsList } = await walletToRedux(localData);

    return { accountData, loginData, walletsList, localData };
};