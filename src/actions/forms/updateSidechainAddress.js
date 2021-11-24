import {getStore} from "../store";
import {trxBuilder} from "./trxBuilder";
import {getDefaultFee} from "./getDefaultFee";
import { getSidechainAccounts } from '../account/getSidechainAccounts';
import { generateSidechainAddress } from "./generateSidechainAddress";

export const updateSidechainAddress = async (data) => {
    const {loginData, accountData} = getStore();
    const payer = accountData.id;
    const sidechain_address_id = data.sidechainAddressId;
    const sidechain = data.sidechain.toLowerCase();
    const depositPublicKey = data.depositPublicKey;
    const depositAddress = data.depositAddress;
    const depositAddressData = data.depositAddressData
    const withdrawPublicKey = data.withdrawPublicKey;
    const withdrawAddress = data.withdrawAddress;
    let result = {
        success: false,
        errors:{},
        callbackData:'',
        sidechainAccounts: {}
    };

    // const trx = {
    //     type: 'sidechain_address_update',
    //     params: {
    //         fee: getDefaultFee(),
    //         payer,
    //         sidechain_address_id,
    //         sidechain_address_account: payer,
    //         sidechain,
    //         deposit_public_key: '',
    //         deposit_address: null,
    //         deposit_address_data: '',
    //         withdraw_public_key,
    //         withdraw_address
    //     }
    // };

    const trx = {
        type: 'sidechain_address_delete',
        params: {
            fee: getDefaultFee(),
            payer,
            sidechain_address_id,
            sidechain_address_account: payer,
            sidechain,
        }
    }
    
    try {
        const activeKey = loginData.formPrivateKey(data.password, 'active');
        const trxResult = await trxBuilder([trx], [activeKey]);   
        if (trxResult) {
            await generateSidechainAddress({
                sidechain,
                depositPublicKey,
                depositAddress,
                depositAddressData ,
                password: data.password,
                withdrawPublicKey,
                withdrawAddress,
                fee: data.fee
            }).then((response) => {
                response.success ? result = response : result.errors = 'ERROR';
                return result;
            });
        }
    } catch (error) {
        result.errors = "ERROR"
    }

    return result;
};