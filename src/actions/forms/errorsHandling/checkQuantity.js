export const checkQuantity = ({quantity}) => {
    if(!quantity) return false;
    return quantity <= 0 ? 'isZero' : false;
}