import React, {Fragment} from "react";
import Form from "../form/form";
import Input from "../form/input";
import CheckBox from "../form/checkbox";
import FileUpload from "../form/fileUpload";
import Close from "../modal/decoration/close";
import {authByFile} from "../../../actions/forms/login";
import Submit from "../modal/decoration/submit";

const LocalLogin = ({handleLogin}) => (
    <Form
        requiredFields={['file', 'password']}
        defaultData={{remember: true}}
        action={authByFile}
        handleResult={handleLogin}
    >
        {
            form => <Fragment>
                <div className="modal__content">
                    <FileUpload
                        id="file"
                        fileSizes='.bin'
                        onChange={form.handleChange}
                    />
                    <Input
                        name="password"
                        type="password"
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

export default LocalLogin;