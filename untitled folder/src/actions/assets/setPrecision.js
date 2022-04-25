import {roundNum} from "../roundNum";

export const setPrecision = (amount, precision) => roundNum(amount / (10 ** precision));