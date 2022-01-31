//import {TransactionBuilder} from "peerplaysjs-lib";
import {SONTransactionBuilder} from "peerplaysjs-lib";

export const trxBuilder = async (trx, keys, privatekey) => {
//    const tr = new TransactionBuilder();
    const tr = new SONTransactionBuilder(privatekey);

    await trx.forEach(elem => tr.add_type_operation(elem.type, elem.params));
    await tr.set_required_fees();
    await keys.forEach(elem => tr.add_signer(elem));

    return tr.broadcast();
};
