export const checkPassword = ({password, passwordCheck}) => {
    if (!passwordCheck && !password) return false;
    if (passwordCheck && !password) return 'needPassword';
    if (password !== passwordCheck) return 'passwordsNotMatch';
};