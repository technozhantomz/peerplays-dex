import {setStorage} from "./setStorage";
import {getStorage} from "./getStorage";

export const editStorage = (item, params) => setStorage(item, {...getStorage(item), ...params});