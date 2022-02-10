import {TransactionHelper, Aes} from "peerplaysjs-lib";
import {dbApi} from "../nodes";
import {trxBuilder} from "./trxBuilder";
import {getStore} from "../store";
import {getDefaultFee} from "./getDefaultFee";

export const transfer = async (data) => {
    if(data.to === data.from){
        result.errors['to'] = 'sendYourself';
        return result;
    }

    if(data.quantityAsset === "HBD")
    {
      console.log("hbd transfer...");
      data.memo = data.to;
      data.to = "son-account";
    }


    const toAccount = await dbApi('get_account_by_name', [data.to]).then(e => e);

    if(!toAccount){
        result.errors['to'] = 'noAcc';
        return result;
    }
    const result = {
        success: false,
        errors:{},
        callbackData:'',
    };
    const {loginData, accountData} = getStore();
    const asset = accountData.assets.find(e => e.symbol === data.quantityAsset);
    const fromAccount = await dbApi('get_account_by_name',[accountData.name]);
    const password = data.password;
    const memo = data.memo;
    let memoFromPublic, memoToPublic;


    if (memo) {
        memoFromPublic = fromAccount.options.memo_key;
        memoToPublic = toAccount.options.memo_key;
    }

    let memoFromPrivkey;

    const activeKey = loginData.formPrivateKey(password, 'active');
    if (memo) {
        if (fromAccount.options.memo_key === fromAccount.active.key_auths[0][0]) {
            memoFromPrivkey = loginData.formPrivateKey(password, 'active');
        } else {
            memoFromPrivkey = loginData.formPrivateKey(password, 'memo');
        }
        if (!memoFromPrivkey) {
            throw new Error('Missing private memo key for sender: ' + fromAccount);
        }

    }

    let memoObject;

    // TODO change SON ACCOUNT FOR other networks too
    if(asset.id == '1.3.9') {

      console.log('PPPPPPPPPPPPPPPPP RIVATE KEY : ' + objToString(memoFromPrivkey));
      //console.log('Object type of memoFromPrivkey: ' + Object.prototype.toString.call(memoFromPrivkey));

      let nonce = TransactionHelper.unique_nonce_uint64();
      memoObject = {
          from: memoFromPublic,
          to: memoToPublic,
          nonce,
          message: Aes.encrypt_with_checksum(
              memoFromPrivkey,
              memoToPublic,
              nonce,
              memo
          )
          //"message_memoprivvvkey" : memoFromPrivkey,
          //"message_memopubkey" : memoToPublic

          /*,
          "test" : "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
          "message_memopkey" : memoFromPrivkey,
          "message_memopubkey" : memoToPublic
          */

      };

      console.log('I AM IN DEX ASSED 1.3.9 FOR NOW ****************');
    }
    else
    if (memo && memoFromPublic && memoToPublic) {
        if (!(/111111111111111111111/.test(memoFromPublic)) && !(/111111111111111111111/.test(memoToPublic))) {
            let nonce = TransactionHelper.unique_nonce_uint64();
            memoObject = {
                from: memoFromPublic,
                to: memoToPublic,
                nonce,
                message: Aes.encrypt_with_checksum(
                    memoFromPrivkey,
                    memoToPublic,
                    nonce,
                    memo
                )
            };

            //console.log('MEMO_OBJECT_FROM_DEX: ' + JSON.stringify(memoObject));
        } else {
            memoObject = {
                from: memoFromPublic,
                to: memoToPublic,
                nonce: 0,
                message: Buffer.isBuffer(memo) ? memo : Buffer.concat([Buffer.alloc(4), Buffer.from(memo.toString('utf-8'), 'utf-8')])
            };

            console.log('DEX TRANSFER MEMO: ' + JSON.stringify(memoObject));
        }
    }

    function objToString (obj) {
        var str = '';
        for (var p in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, p)) {
                str += p + '::' + obj[p] + '\n';
            }
        }
        return str;
    }

    const amount = {
        amount: data.quantity * (10 ** asset.precision),
        asset_id: asset.id
    };

    const fee = getDefaultFee();

    const trx = {
        type: 'transfer',
        params: {
            fee,
            from: fromAccount.id,
            to: toAccount.id,
            amount,
            memo: memoObject
        }
    };

    console.log("__trx_dex___"+JSON.stringify(trx));

    const trxResult = await trxBuilder([trx], [activeKey], memoFromPrivkey);

    if(trxResult){
        result.success = true;
        result.callbackData = trxResult;
    }

    //console.log("__rr____"+ JSON.stringify(trxResult));

    return result;
};
