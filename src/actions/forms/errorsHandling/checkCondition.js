export const checkCondition = ({condition}) => {
    if(!condition) return;
    if(condition.length > 60) return 'conditionLength'
}