export const getStorage = (item, storageType = 'localStorage') => {
    const data = window[storageType].getItem(item);
    let result = {};

    try{
        const storageItem = JSON.parse(data);
        result = storageItem || {};
    } catch (error) {
        console.log('---storageError', error);
    }

    return result;
};