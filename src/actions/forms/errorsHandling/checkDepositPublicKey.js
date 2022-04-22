export const checkDepositPublicKey = ({depositPublicKey}) => {
    if(depositPublicKey.match(/^  *$/) !== null) return 'required'
    if(depositPublicKey.length !== 66 && depositPublicKey.length !== 130) return 'invalidKey'
    if (!/^[a-zA-Z0-9]*$/.test(depositPublicKey)) return 'invalidKey'
}



