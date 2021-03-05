import React, {Fragment} from "react";
import CheckBox from "../form/checkbox";
import Input from "../form/input";
import Form from "../form/form";
import Textarea from "../form/textarea";
import Close from "../modal/decoration/close";
import {authByBrain} from "../../../actions/forms/login";
import Submit from "../modal/decoration/submit";

const BrainLogin = ({handleLogin}) => (
    <Form
        requiredFields={['password', 'passwordCheck', 'brainkey']}
        defaultData={{remember: true}}
        action={authByBrain}
        handleResult={handleLogin}
    >
        {
            form => <Fragment>
                <div className="modal__content">
                    <Input
                        name="publicName"
                        onChange={form.handleChange}
                        error={form.state.errors}
                        value={'default'}
                    />
                    <Input
                        name="password"
                        type="password"
                        onChange={form.handleChange}
                        error={form.state.errors}
                        value={form.state.data}
                    />
                    <Input
                        name="passwordCheck"
                        type="password"
                        onChange={form.handleChange}
                        error={form.state.errors}
                        value={form.state.data}
                    />
                    <Textarea
                        name="brainkey"
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
                    <Submit tag="login" />
                </div>
            </Fragment>
        }
    </Form>
);

export default BrainLogin;