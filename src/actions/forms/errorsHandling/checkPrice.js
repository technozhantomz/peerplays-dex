import {getAccountData} from "../../store";

export const checkPrice = ({type, buyAsset, sellAsset, feeAsset, price}) => {
 
  if(price.length > 8){
    return 'maxLength';
  }
  return false
}

