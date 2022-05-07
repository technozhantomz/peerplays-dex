import {defaultToken} from "../../params/networkParams";

export const newBackupName = walletData => {

    const token = defaultToken.toLowerCase();
    const name = walletData.wallet[0].public_name;
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    // console.log(day);

    const dateString = `${year}${month + 1 < 10 ? '0' + month : month}${day < 10 ? '0' + day : day}`;

    return `${token}_${name}_${dateString}.bin`;
};