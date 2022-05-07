export const checkDepositPublicKey = ({depositPublicKey}) => {
    if(depositPublicKey.match(/^  *$/) !== null) return 'required'
}



