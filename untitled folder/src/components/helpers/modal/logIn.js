import React, {Component, Fragment} from "react";
import {removeModal} from "../../../dispatch/setModal";
import Input from "../input";
import Form from "../form";
import CheckBox from "../checkbox";
import {setStorage} from "../../../actions/storage/index";
import {setAccount} from "../../../dispatch/setAccount";
import {authByLogin} from "../../../actions/forms/index";

class LogIn extends Component{

    handleLogin = (data) => {
        if(data){
            setStorage('account', {id: data.id, name: data.name});
            setAccount(data);
            removeModal();
        }
    };

    render(){

        return(
            <Fragment>
                <div className="modal__header">
                    <h2 className="modal__title">Log In</h2>
                </div>
                <Form requiredFields={['login', 'password']} action={authByLogin} handleResult={this.handleLogin}>
                    {
                        form => <Fragment>
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
                                <button onClick={removeModal} className="modal__button" type="button">Cancel</button>
                                <button className="modal__button" type="submit">Login</button>
                            </div>
                        </Fragment>
                    }
                </Form>
            </Fragment>
        )
    }
}

export default LogIn;