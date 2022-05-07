import {setStorage} from "./setStorage";
import {getStorage} from "./getStorage";

export const editStorage = (item, params, storageType = 'localStorage') => setStorage(item, {...getStorage(item, storageType), ...params}, storageType);