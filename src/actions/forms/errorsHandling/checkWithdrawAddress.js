import { validate, getAddressInfo } from 'bitcoin-address-validation'
import { testnetCheck } from "../../../params/networkParams"
import CryptoJS from 'crypto-js'
import sha256 from 'crypto-js/sha256'
import ripemd160 from 'crypto-js/ripemd160'

import { bech32 } from 'bech32'

const validateOLAddress = ({baseApiUrl, inputCoin, withdrawAddress}) => fetch(`${baseApiUrl}/wallets/${inputCoin}/address-validator?${withdrawAddress}`).then(e => e.json()).then(e => e.isValid && e.isAccount);
const validateCryptoBridgeAddress = ({baseApiUrl, symbol, withdrawAddress}) => fetch(`https://api.crypto-bridge.org/api/v2/accounts/${withdrawAddress}/assets/${symbol.toUpperCase()}/addresses/validate`);

const validateRudexAddress = ({baseApiUrl, symbol, withdrawAddress}) => {
    const url = `${baseApiUrl}/wallets/${symbol}/check-address`;
    const params = {method: "POST", body: JSON.stringify({address: withdrawAddress}), headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }};
    return fetch(url, params).then(e => e.json()).then(e => e.isValid);
};

const validateXbtsxAddress = ({baseApiUrl, inputCoin, withdrawAddress}) => {
    const url = `${baseApiUrl}/wallets/${inputCoin}/check-address`;
    const params = {method: "POST", body: JSON.stringify({address: withdrawAddress}), headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }};
    return fetch(url, params).then(e => e.json()).then(e => e.isValid);
};

const validateGdexAddress = ({baseApiUrl, symbol, withdrawAddress}) => {
    const body = {
        address: withdrawAddress,
        assetName: symbol.toUpperCase(),
        version: "1.0"
    };
    const url = `${baseApiUrl}/gateway/address/checkAddress`;
    const params = {method: "POST", body: JSON.stringify(body), headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }};
    return fetch(url, params).then(e => e.json()).then(e => e.isValid);
};

const addressValidation = {
    'Open Ledger': validateOLAddress,
    'Rudex': validateRudexAddress,
    'Xbtsx': validateXbtsxAddress,
    'Gdex 2': validateGdexAddress,
    // 'Crypto Bridge': validateCryptoBridgeAddress,
};

const generateAddressFromPubkey = (pubkey) => {
    const hexData = CryptoJS.enc.Hex.parse(pubkey)
    const sha256Digest = sha256(hexData, CryptoJS.enc.Hex).toString(CryptoJS.enc.Hex)
    const ripemd160Digest = ripemd160(CryptoJS.enc.Hex.parse(sha256Digest), CryptoJS.enc.Hex).toString(CryptoJS.enc.Hex)
    const bech32Words = bech32.toWords(Buffer.from(ripemd160Digest, "hex"));
    const words = new Uint8Array([0, ...bech32Words]);
    const address = bech32.encode("bc", words);
    return address
}

export const checkWithdrawAddress = async data => {
    if(!data.withdrawAddress) return false;
    if(data.withdrawAddress.match(/^  *$/) !== null) return 'required'
    const network = testnetCheck ? 'regtest' : 'mainnet'
    const isValid = validate(data.withdrawAddress, network)
    return isValid ? false : 'invalidKey'
};
