import React, {Component} from "react";
import {removeModal} from "../../dispatch/setModal";
import Input from "./input";
import Form from "./form";
import CheckBox from "./checkbox";
import {PrivateKey, Login} from "peerplaysjs-lib";
import {defaultToken} from "../../params/networkParams";
import {dbApi} from "../../actions/nodes";
import {setStorage} from "../../actions/storage";
import {formAccount} from "../../actions/account/formAccount";
import {setAccount} from "../../dispatch/setAccount";

const auth = async ({login, password}) => {

    const result = {
        success: false,
        errors: {
            login: '',
            password: ''
        },
        userData: ''
    };

    const fullAcc = await dbApi('get_full_accounts', [[login], false])
        .then(arr => arr[0][1])
        .catch(() => false);

    if(!fullAcc){
        result.errors.login = 'noAcc';
        return result;
    }

    const accData = fullAcc.account;
    const roles = ['active', 'owner', 'memo'];
    let checkPassword = false;
    let fromWif = '';

    try{ fromWif = PrivateKey.fromWif(password) }
    catch(e){ }

    const keys = Login.generateKeys(login, password, roles);

    for(let role of roles){
        const privKey = fromWif ? fromWif : keys.privKeys[role];
        const pubKey = privKey.toPublicKey().toString(defaultToken);
        const key = role !== 'memo' ? accData[role].key_auths[0][0] : accData.options.memo_key;

        if(key === pubKey){
            checkPassword = true;
            break;
        }
    }

    if(!checkPassword){
        result.errors.password = 'wrongPass';
        return result;
    }

    result.success = true;
    result.userData = await formAccount(accData.id, login, fullAcc.balances);

    return result;
};

class LogIn extends Component{

    handleLogin = ({userData}) => {
        if(userData){
            setStorage('account', {id: userData.id, name: userData.name});
            setAccount(userData);
            removeModal();
        }
    };

    render(){

        return(
            <React.Fragment>
                <div className="modal__header">
                    <h2 className="modal__title">Log In</h2>
                </div>
                <Form requiredFields={['login', 'password']} action={auth} handleResult={this.handleLogin}>
                    {
                        form => <React.Fragment>
                            <div className="modal__content">
                                <Input
                                    name="login"
                                    labelTag="login.accName"
                                    className="with-bg"
                                    onChange={form.handleChange}
                                    error={form.state.errors}
                                    value={form.state.data}
                                />
                                <Input
                                    name="password"
                                    labelTag="login.password"
                                    type="password"
                                    className="with-bg"
                                    onChange={form.handleChange}
                                    error={form.state.errors}
                                    value={form.state.data}
                                />
                                <CheckBox
                                    id="remember"
                                    labelTag="login.remember"
                                    value={form.state.data}
                                    onChange={form.handleChange}
                                />
                            </div>
                            <div className="modal__bottom">
                                <button onClick={removeModal} type="button">Cancel</button>
                                <button onClick={form.submit} type="submit">Create</button>
                            </div>
                        </React.Fragment>
                    }
                </Form>
            </React.Fragment>
        )
    }
}

export default LogIn;