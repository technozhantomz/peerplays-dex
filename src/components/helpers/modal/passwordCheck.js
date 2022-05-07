import React, {Component, Fragment} from "react";
import {removeModal} from "../../../dispatch/setModal";
import Form from "../form";
import Input from "../input";
import {getStorage} from "../../../actions/storage/index";
import {dbApi} from "../../../actions/nodes/index";
import {setCookie} from "../../../actions/cookie/index";
import {passwordCheck} from "../../../actions/account/index";

const checkPassword = async (data, result) => {

    const login = getStorage('account').name;
    const account = await dbApi('get_account_by_name', [login])
        .catch(() => false);

    const checkPassword = passwordCheck(account, data.password);

    if(!checkPassword){
        result.errors.password = 'wrongPass';
        return result;
    }

    result.success = true;
    result.callbackData = { password: data.password };

    return result;
};

class PasswordCheck extends Component{

    state = {
        login: getStorage('account').name
    };

    handleResult = (data) => {
        setCookie('password', data.password);
        removeModal();
        this.props.callback(data.password);
    };

    render(){
        return(
            <Fragment>
                <div className="modal__header">
                    <h2 className="modal__title">Unlock Profile for {this.state.login}</h2>
                </div>
                <Form requiredFields={['password']} action={checkPassword} handleResult={this.handleResult}>
                    {
                        form => <Fragment>
                            <div className="modal__content">
                                <Input
                                    name="password"
                                    labelTag="login.password"
                                    type="password"
                                    className="with-bg"
                                    onChange={form.handleChange}
                                    error={form.state.errors}
                                    value={form.state.data}
                                />
                            </div>
                            <div className="modal__bottom">
                                <button onClick={removeModal} className="modal__button" type="button">Cancel</button>
                                <button className="modal__button" type="submit">Unlock</button>
                            </div>
                        </Fragment>
                    }
                </Form>
            </Fragment>
        );
    }
};

export default PasswordCheck;