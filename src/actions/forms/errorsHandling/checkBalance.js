import {getAccountData} from "../../store";

export const checkAmountToSell = ({type, buyAsset, sellAsset, amount_to_receive, amount_to_sell}) => {

    if(!type && !amount_to_sell) {
      return false;
    } else {
      if(!type) {
        const userAsset = getAccountData().assets.find(el => el.symbol === sellAsset);
        return amount_to_sell <= 0 ? 'required' : userAsset && userAsset.setPrecision() >= amount_to_sell ? false : 'isNotEnough';
      } else if(type === 'sell') {
        const userAsset = getAccountData().assets.find(el => el.symbol === buyAsset);
        return userAsset && userAsset.setPrecision() >= amount_to_receive ? false : 'isNotEnough';
      } else {
        return false;
      }
    }
}

export const checkAmountToReceive = ({type, buyAsset, sellAsset, amount_to_sell, amount_to_receive}) => {

  if(!type && !amount_to_receive) {
    return false;
  } else {
    if(!type && amount_to_receive <= 0) {
      return 'required';
    } else if(type === 'buy') {
      const userAsset = getAccountData().assets.find(el => el.symbol === sellAsset);
      return userAsset && userAsset.setPrecision() >= amount_to_sell ? false : 'isNotEnough';
    } else {
      return false;
    }
  }
}