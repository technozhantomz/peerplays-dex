import React, {Fragment} from 'react';
import {authByLogin} from "../../../actions/forms";
import Form from "../form/form";
import Input from "../form/input";
import CheckBox from "../form/checkbox";
import Close from "../modal/decoration/close";
import Submit from "../modal/decoration/submit";

const CloudLogin = ({handleLogin}) => (
    <Form
        requiredFields={['login', 'password']}
        defaultData={{remember: true}}
        action={authByLogin}
        handleResult={handleLogin}
    >
        {
            form => <Fragment>
                <div className="modal__content">
                    <Input
                        name="login"
                        onChange={form.handleChange}
                        error={form.state.errors}
                        value={form.state.data}
                    />
                    <Input
                        name="password"
                        type="password"
                        className='modal__field'
                        onChange={form.handleChange}
                        error={form.state.errors}
                        value={form.state.data}
                    />
                    <CheckBox
                        id="remember"
                        labelTag="field.checkboxes.remember"
                        value={form.state.data}
                        onChange={form.handleChange}
                    />
                </div>
                <div className="modal__bottom">
                    <Close />
                    <Submit tag="login"/>
                </div>
            </Fragment>
        }
    </Form>
);

export default CloudLogin;
