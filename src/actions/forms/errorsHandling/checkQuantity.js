export const checkQuantity = ({quantity}) => {
    let decimalregex = /[.]/g
    if(!quantity) return false;
    return quantity <= 0 ? 'isZero' : decimalregex.test(quantity) ? 'isDecimal' : false;
}