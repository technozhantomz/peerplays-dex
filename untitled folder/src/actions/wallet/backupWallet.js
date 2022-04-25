import {Aes, key, PublicKey} from "peerplaysjs-lib";
import {compress} from "lzma";
import {downloadFile} from "../downloadFile";
import {getLoginData} from "../store";
import {newBackupName} from "./newBackupName";
import {getStoragedAccount} from "../account";

export const backupWallet = async () => {
    const wallet = getLoginData();
    const walletPubKey = wallet.password_pubkey;
    const walletData = getStoragedAccount().walletData;

    if(!walletData) return;

    const public_key = PublicKey.fromPublicKeyString(walletPubKey);
    const onetime_private_key = key.get_random_key();
    const walletString = JSON.stringify(walletData, null, 0);
    const compression = 1;

    const backupBuffer = await new Promise(resolve => compress(walletString, compression, compressedWalletBytes => {
        let backup_buffer = Aes.encrypt_with_checksum(
            onetime_private_key,
            public_key,
            null /*nonce*/,
            compressedWalletBytes
        );

        let onetime_public_key = onetime_private_key.toPublicKey();
        let backup = Buffer.concat([
            onetime_public_key.toBuffer(),
            backup_buffer
        ]);

        resolve(backup);
    }));

    const fileName = newBackupName(walletData);

    downloadFile(fileName, backupBuffer, "application/octet-stream; charset=us-ascii");
    wallet.onModify('backup');
};