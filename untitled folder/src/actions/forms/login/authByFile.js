import {Aes, PrivateKey, PublicKey} from "peerplaysjs-lib";
import {decompress} from "lzma";
import {walletToRedux} from "../../wallet/";

export const authByFile = async ({file, password, remember}, result) => {

    const {lastModified, content} = file;

    let backupBuffer = content;

    if (!Buffer.isBuffer(backupBuffer)) backupBuffer = new Buffer(backupBuffer, "binary");

    const privateKey = PrivateKey.fromSeed(password);
    let pubKey;

    try {
        pubKey = PublicKey.fromBuffer(backupBuffer.slice(0, 33));
    } catch (e) {
        console.error(e, e.stack);
        result.errors.file = 'invalidFile';
        return result;
    }

    try {
        backupBuffer = Aes.decrypt_with_checksum(
            privateKey,
            pubKey,
            null /*nonce*/,
            backupBuffer.slice(33)
        );
    } catch (error) {
        result.errors.password = 'wrongPass';
        return result;
    }

    let walletData = '';

    await new Promise(resolve => {
        try {
            decompress(backupBuffer, wallet_string => {
                try {
                    walletData = JSON.parse(wallet_string);
                    resolve();
                } catch (error) {
                    if (!wallet_string) result.errors.file = 'decompressingError';
                    console.error("Error parsing wallet json");
                    resolve();
                }
            });
        } catch (error) {
            result.errors.file = 'decompressingError';
            console.error("Error decompressing wallet", error, error.stack);
            resolve();
        }
    });

    if(!walletData) return result;

    const localData = {
        type: 'wallet',
        activeUser: 0,
        lastModified,
        walletData
    };

    const { accountData, loginData, walletsList } = await walletToRedux(localData);

    result.success = true;
    result.callbackData = { accountData, loginData, walletsList, localData, remember };

    return result;
};