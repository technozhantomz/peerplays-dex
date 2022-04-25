export const checkDecimal = ({decimal}) => {
    if(!decimal) return;
    if(Number(decimal) <= 0) return 'isNull';
    if(Number(decimal) > 8) return 'wrongDecimal';
};