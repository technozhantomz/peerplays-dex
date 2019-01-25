export const setSocketCallBack = (instance) => {
    instance.setRpcConnectionStatusCallback(status => console.log('--callback!', status));
};