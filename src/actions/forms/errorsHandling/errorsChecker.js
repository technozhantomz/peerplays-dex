import {checkNewLogin} from "./checkNewLogin";
import {checkNewWorker} from "./checkNewWorker";
import {checkBeginDate, checkEndDate} from "./checkDates";
import {checkNumber} from "./checkNumber";
import {checkPassword} from "./checkPassword";
import {checkConfirmPassword} from "./checkPassword";
import {checkLogin} from "./checkLogin";
import {checkBrainkey} from "./checkBrainkey";
import {checkWithdrawAddress} from "./checkWithdrawAddress";
import {checkNewAssetName} from "./checkNewAssetName";
import {checkIssueAmount} from "./checkIssueAmount";
import {checkDecimal} from "./checkDecimal";
import {checkCondition} from "./checkCondition";
import {checkBackingAsset} from "./checkBackingAsset";

export const errorsChecker = {
    newLogin: checkNewLogin,
    login: checkLogin,
    to: checkLogin,
    password: checkPassword,
    passwordCheck: checkConfirmPassword,
    newWorkerName: checkNewWorker,
    dateBegin: checkBeginDate,
    dateEnd: checkEndDate,
    dailyPay: checkNumber,
    vesting: checkNumber,
    brainkey: checkBrainkey,
    withdrawAddress: checkWithdrawAddress,
    newAssetName: checkNewAssetName,
    issueAmount: checkIssueAmount,
    decimal: checkDecimal,
    condition: checkCondition,
    backingAsset: checkBackingAsset
};