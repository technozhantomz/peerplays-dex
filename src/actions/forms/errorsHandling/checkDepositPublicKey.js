import {getAccountData} from "../../store";

export const checkDepositPublicKey = ({type, buyAsset, sellAsset, amount_to_sell, amount_to_receive}) => {
    console.log("I am here for reason finally");
    // if(!type && !amount_to_receive) {
    //     return 'required';
    // } else {
    //     if(!type && amount_to_receive <= 0) {
    //         return 'isZero';
    //     } else if(type === 'buy') {
    //         const userAsset = getAccountData().assets.find(el => el.symbol === sellAsset);
    //         return userAsset && userAsset.setPrecision() >= amount_to_sell ? false : 'isNotEnough';
    //     } else {
    //         return false;
    //     }
    // }
}
