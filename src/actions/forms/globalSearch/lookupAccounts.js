import React from "react";
import {clearLayout} from "../../../dispatch/layoutDispatch";
import {ContactItem} from "../../../components/helpers/contactItem";
import {defaultToken} from "../../../params/networkParams";
import {dbApi} from "../../nodes";

const setAccountItem = (data) => <ContactItem key={data.id} data={data} handleClick={clearLayout} />;

export const lookupAccounts = val => {
    if(val.indexOf(defaultToken) === 0 && val.length === 54) return dbApi('get_key_references', [[val]])
        .then(result => result[0]
            ? dbApi('get_accounts', [[result[0][0]]])
                .then(userList => userList.map(({name, id}) => setAccountItem({name, id}))).catch(() => [])
            : []
        );

    return dbApi('lookup_accounts', [val, 20])
        .then(result => result.filter(e => e[0].includes(val)).map(([name, id]) => setAccountItem({name, id})))
};