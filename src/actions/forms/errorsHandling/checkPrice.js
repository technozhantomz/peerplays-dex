import {getAccountData} from "../../store";

export const checkPrice = ({type, buyAsset, sellAsset, feeAsset, price}) => {
  const userAsset = getAccountData().assets.find(el => el.symbol === sellAsset);

  if(price.length > userAsset.precision){
    return 'maxLength';
  }
  return false
}

