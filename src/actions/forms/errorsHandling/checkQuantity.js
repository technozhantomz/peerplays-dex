export const checkQuantity = ({quantity}) => {
    let decimalregex = /[.]/g
    if(!quantity) return 'required';
    return quantity <= 0 ? 'isZero' : false;
}
