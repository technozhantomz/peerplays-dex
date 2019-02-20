export const roundNum = (num, roundTo = 5) => {
    num = Number(num);
    return Number((num).toFixed(roundTo));
};