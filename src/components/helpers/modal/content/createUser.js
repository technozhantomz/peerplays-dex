import React, { Fragment, useEffect, useState } from "react";
import Form from "../../form/form";
import Input from "../../form/input";
import InfoBlock from "../../infoBlock";
import Close from "../decoration/close";
import RadioGroup from "../../form/radioGroup";
import { createUser } from "../../../../actions/forms/createUser/index";
import { setNewAccount } from "../../../../actions/account/index";
import Submit from "../decoration/submit";
import ModalTitle from "../decoration/modalTitle";
import { getStorage } from "../../../../actions/storage";
import { dbApi } from "../../../../actions/nodes";

const CreateUser = () => {
    const referrer = getStorage('referrer', 'sessionStorage').name;
    const [referrerName, setReferrerName] = useState(referrer);
    useEffect(() => {
        dbApi('get_account_by_name', [referrer]).then(referrerAccount => {
            if (!referrerAccount) {
                setReferrerName("");
            }
        });
    }, [])
    return (
        <Fragment>
            <ModalTitle tag="createUser" />
            <Form
                requiredFields={['newLogin', 'password', 'passwordCheck']}
                defaultData={{ referrer: referrerName }}
                action={createUser}
                handleResult={setNewAccount}
            >
                {
                    form => <Fragment>
                        <div className="modal__content">
                            <Input
                                name="newLogin"
                                comment={false}
                                onChange={form.handleChange}
                                error={form.state.errors}
                                value={form.state.data}
                            />
                            <InfoBlock tag="modal.createUser.aboutLogin" />
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
                                className="modal__field"
                                onChange={form.handleChange}
                                error={form.state.errors}
                                value={form.state.data}
                            />
                            {referrerName != "" ? (
                                <InfoBlock tag="modal.createUser.referrer" data={{ referrer: referrerName }} />
                            ) : (
                                <InfoBlock tag="modal.createUser.referrerError" data={{ referrer }} />
                            )
                            }
                        </div>
                        <div className="modal__bottom">
                            <Close />
                            <Submit tag="create" />
                        </div>
                    </Fragment>
                }
            </Form>
        </Fragment>
    );
}

export default CreateUser;