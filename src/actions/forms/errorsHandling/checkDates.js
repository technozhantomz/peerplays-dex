export const checkBeginDate = ({dateBegin}) => {
    return dateBegin && dateBegin.getTime() < (Date.now() + 1000*60*60*23) && 'beginFromToday';
};

export const checkEndDate = ({dateBegin, dateEnd}) => {
    return dateBegin && dateEnd && dateBegin.getTime() > dateEnd.getTime() && 'wrongEndDate';
};