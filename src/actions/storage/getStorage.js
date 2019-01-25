export const getStorage = (item) => {
    const data = window.localStorage.getItem(item);
    let result = {};

    try{
        const storageItem = JSON.parse(data);
        result = storageItem || {};
    } catch (error) {
        console.log('---storageError', error);
    }

    return result;
};