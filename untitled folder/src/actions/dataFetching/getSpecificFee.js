import {ChainTypes} from "peerplaysjs-lib";
import {dbApi} from "../nodes";
import {setPrecision} from "../assets";

export const getSpecificFee = async (opName, convert = true) => {
    const opID = ChainTypes.operations[opName];
    const props = await dbApi('get_global_properties').then(e => e.parameters.current_fees);

    const result = props.parameters.find(e => e[0] === opID)[1];

    if(convert){
        const {precision} = await getAsset('1.3.0');
        Object.keys(result).forEach(key => { result[key] = setPrecision(result[key], precision) });
    }

    return result;
};