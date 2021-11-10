export const checkQuantity = ({quantity}) => {
    let decimalregex = /[.]/g
    if(!quantity) return false;
    return quantity <= 0 ? 'isZero' : false;
}