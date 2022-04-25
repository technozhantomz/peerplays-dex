import React, {Component, Fragment} from "react";
import ModalTitle from "../decoration/modalTitle";
import {TransactionHelper, Aes} from "peerplaysjs-lib";
import Form from "../../form/form";
import Close from "../decoration/close";
import Submit from "../decoration/submit";
import Input from "../../form/input";
import SelectHeader from "../../selectHeader";
import Textarea from "../../form/textarea";
import {getDefaultFee} from "../../../../actions/forms/getDefaultFee";
import {getAccountData, getBasicAsset, getStore} from "../../../../actions/store";
import {trxBuilder} from "../../../../actions/forms/trxBuilder";
import {dbApi} from "../../../../actions/nodes";
import {clearLayout} from "../../../../dispatch";

const issueAction = async (data, result) => {
    const {accountData, loginData} = getStore();

    const {to, assetWithSupply, issueAmount, password} = data;

    const issue_to_account = await dbApi('get_account_by_name', [to]).then(e => e.id);
    const asset_to_issue = {
        amount: assetWithSupply.addPrecision(false, issueAmount),
        asset_id: assetWithSupply.id
    };

    const trx = {
        type: 'asset_issue',
        params: {
            fee: getDefaultFee(),
            issuer: accountData.id,
            asset_to_issue,
            issue_to_account
        }
    };

    const activeKey = loginData.formPrivateKey(password, 'active');

    if(data.memo){

        const fromMemo = loginData.formPrivateKey(password, 'memo');
        const toMemo = to.options.memo_key;
        const nonce = TransactionHelper.unique_nonce_uint64();

        trx.params['memo'] = {
            from: fromMemo.toPublicKey().toString(),
            to: toMemo,
            nonce,
            message: Aes.encrypt_with_checksum(
                activeKey,
                toMemo,
                nonce,
                new Buffer(data.memo)
            ),
        };
    }

    const trxResult = await trxBuilder([trx], [activeKey]);

    if(trxResult){
        result.success = true;
        result.callbackData = trxResult;
    }

    return result;
};

class IssueAsset extends Component {

    state = {
        defaultData: false
    };

    componentDidMount(){
        const {password, assetWithSupply, maxSupply} = this.props;
        const currentSupply = assetWithSupply.setPrecision();
        const assetSymbol = assetWithSupply.symbol;
        const basicAssetSymbol = getBasicAsset().symbol;
        const remainToIssue = maxSupply - currentSupply;
        this.setState({
            defaultData: {
                password,
                basicAssetSymbol,
                currentSupply,
                maxSupply,
                remainToIssue,
                assetSymbol,
                assetWithSupply
            }
        })
    }

    handleResult = () => clearLayout();

    render(){
        const tag = 'issueAsset';
        const defaultData = this.state.defaultData;

        if(!defaultData) return <span />;

        return(
            <Fragment>
                <ModalTitle tag={tag} />
                <Form
                    type="asset_issue"
                    requiredFields={['to', 'issueAmount']}
                    defaultData={defaultData}
                    action={issueAction}
                    handleResult={this.handleResult}
                >
                    {form => {
                        const {data, errors} = form.state;
                        const assetSymbol = data.assetSymbol;

                        return(
                            <Fragment>
                                <Input
                                    id="modalSendTo"
                                    name="to"
                                    onChange={form.handleChange}
                                    error={errors}
                                    value={data}
                                />
                                <div className="form__row">
                                    <Input
                                        name="issueAmount"
                                        type="number"
                                        onChange={form.handleChange}
                                        error={errors}
                                        value={data}
                                        style={{flex: 3}}
                                        commentParams={{
                                            remainToIssue: data.remainToIssue,
                                            symbol: assetSymbol
                                        }}
                                        comment
                                    />
                                    <SelectHeader
                                        text={assetSymbol}
                                        className="with-bg"
                                        style={{flex: 1}}
                                    />
                                </div>
                                <Textarea
                                    id="modalSendMemo"
                                    name="memo"
                                    comment={true}
                                    onChange={form.handleChange}
                                    error={errors}
                                    value={data}
                                />
                                <div>
                                    Fee: {data.fee || 0} {data.basicAssetSymbol}
                                </div>
                                <div className="modal__bottom">
                                    <Close />
                                    <Submit tag="send" />
                                </div>
                            </Fragment>
                        )
                    }}
                </Form>
            </Fragment>
        )
    }
}

export default IssueAsset