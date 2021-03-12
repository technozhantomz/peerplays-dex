export const checkNumber = (obj) => {

    const val = obj.dailyPay || obj.vesting || obj.issueAmount;

    if(!val) return false;
    if(isNaN(val)) return 'isNan';
    if(Number(val) <= 0) return 'isNull';
};