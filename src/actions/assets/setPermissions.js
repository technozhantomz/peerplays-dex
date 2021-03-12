import {additionalPermissions, defaultPermissions, permissionFlags} from "../../params/permissionsParams";

export const setPermissions = (flag, isBitAsset) => {
    const permissionsList = !isBitAsset ? defaultPermissions : [...defaultPermissions, ...additionalPermissions];
    if(flag === 'all') return permissionsList;
    return permissionsList.filter(key => flag & permissionFlags[key]);
};