export const checkDepositPublicKey = ({depositPublicKey}) => {
    console.log(depositPublicKey.length)
    if(depositPublicKey.match(/^  *$/) !== null) return 'required'
    if(depositPublicKey.length !== 66 && depositPublicKey.length !== 130) return 'invalidKey'
}



