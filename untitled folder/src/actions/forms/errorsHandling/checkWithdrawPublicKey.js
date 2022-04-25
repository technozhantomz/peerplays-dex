export const checkWithdrawPublicKey = ({withdrawPublicKey}) => {
    if(withdrawPublicKey.match(/^  *$/) !== null) return 'required'
}
