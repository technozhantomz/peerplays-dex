import {getAccountData} from "../../store";
import {getAssetBySymbol} from "../../../actions/assets"

export const checkAmountToSell = ({type, buyAsset, sellAsset, amount_to_receive, amount_to_sell}) => {
  if(!amount_to_sell) {
      return 'required';
    } else {
      if(isNaN(amount_to_sell)){
        return 'isNan';
      }

      if(amount_to_sell <= 0) {
        return 'isZero';
      }

      if(type === "buy" ||type === undefined){

        const userAsset = getAccountData().assets.find(el => el.symbol === sellAsset);
        if(!userAsset) {
          return 'isNotEnough'
        } else {
          return userAsset.setPrecision() < amount_to_sell ? 'isNotEnough' : false;
        }
      }
      return false; 
    }
}

export const checkAmountToReceive = async ({type, buyAsset, sellAsset, amount_to_sell, amount_to_receive}) => {
  if(!amount_to_receive) {
    return 'required';
  } else {
    if(isNaN(amount_to_receive)){
      return 'isNan';
    }
    if(type === 'sell') {
      const userAsset = getAccountData().assets.find(el => el.symbol === buyAsset);
      if(!userAsset) {
        return 'isNotEnough'
      } else {
        return userAsset.setPrecision() >= amount_to_receive ? false : 'isNotEnough';
      }
    }

    if (amount_to_receive >= 10 ** 8) {
      return 'outofRangeOrBadPrecision'
    }

    const { precision } = await getAssetBySymbol(type === 'buy' ? buyAsset : sellAsset)
    const amtStr = amount_to_receive.toString()
    const fractionLength = amtStr.indexOf('.') === -1
      ? 0
      : (amtStr.length - amtStr.indexOf('.') - 1)
    if (fractionLength > precision) {
      return 'outofRangeOrBadPrecision'
    }

    return false;
  }
}

export const checkPrice = async ({price, sellAsset}) => {
  if(!price) {
    return 'required';
  } else {
    if(isNaN(price)){
      return 'isNan';
    } 
    
    if(price >= 10 ** 8) {
      return 'outofRangeOrBadPrecision'
    }
    const { precision } = await getAssetBySymbol(sellAsset)
    const priceStr = price.toString()
    const fractionLength = priceStr.indexOf('.') === -1 
                            ? 0 
                            : (priceStr.length - priceStr.indexOf('.') - 1)
    if (fractionLength > precision) {
      return 'outofRangeOrBadPrecision'
    }
  }
}