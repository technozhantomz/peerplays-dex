import {checkNumber} from "./checkNumber";

export const checkIssueAmount = (data) => {
    const numberCheck = checkNumber(data);
    if(numberCheck) return numberCheck;
    if(data.remainToIssue < data.issueAmount) return 'remainIssueNotEnough';
    return false;
};
