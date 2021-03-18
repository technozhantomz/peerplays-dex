import {getAccountData} from "../../store";

export const checkAmountToSell = ({type, buyAsset, amount_to_receive}) => {

    if(type !== 'sell') return false;

    const userAsset = getAccountData().assets.find(el => el.symbol === buyAsset);

    return userAsset && userAsset.setPrecision() >= amount_to_receive ? false : 'isNotEnough';
}

export const checkAmountToReceive = ({type, sellAsset, amount_to_sell}) => {

  if(type !== 'buy') return false;

  const userAsset = getAccountData().assets.find(el => el.symbol === sellAsset);

  return userAsset && userAsset.setPrecision() >= amount_to_sell ? false : 'isNotEnough';
}