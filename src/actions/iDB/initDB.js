import Dexie from "dexie";

export const db = new Dexie("BTS_User_DB");

export const initDB = () => db.version(1).stores({
    userData: "++id, pub_key, encrypt_key, active_wallet",
    wallets: "++id, public_name, encrypted_brainkey, brainkey_pubkey, sequence, created, modified, activity",
});

export const addToDB = (table, data) => Array.isArray(data)
        ? db[table].bulkAdd(data)
        : db[table].add(data);

export const putToDB = (table, data) => db[table].put(data);
export const getFromDB = (table) => db[table].toArray();