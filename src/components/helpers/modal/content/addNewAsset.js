import React, {Component, Fragment} from "react";
import ModalTitle from "../decoration/modalTitle";
import Close from "../decoration/close";
import Submit from "../decoration/submit";
import Form from "../../form/form";
import Input from "../../form/input";
import {getBasicAsset, getGlobals, getStore} from "../../../../actions/store";
import {roundNum} from "../../../../actions/roundNum";
import Switcher from "../../switcher";
import TitleWrapper from "../../titleWrapper";
import {additionalPermissions, defaultPermissions, permissionFlags} from "../../../../params/permissionsParams";
import SwitchersGroup from "../../form/switchersGroup";
import Button from "../../buttons/button";
import FieldWithHint from "../../form/fieldWithHint";
import {dbApi} from "../../../../actions/nodes";
import {getDefaultFee} from "../../../../actions/forms/getDefaultFee";
import {trxBuilder} from "../../../../actions/forms/trxBuilder";
import {formAssetData} from "../../../../actions/assets";
import DateField from "../../form/dateField";
import {formDate} from "../../../../actions/formDate";
import {clearLayout} from "../../../../dispatch";

const formPermissions = (permissionsObj, isSmartCoin) => {
    const list = isSmartCoin ? defaultPermissions.concat(additionalPermissions) : defaultPermissions;
    return list.reduce((acc, key) => acc + (permissionsObj[key] ? permissionFlags[key] : 0), 0);
};

const createAsset = async (data, result) => {

    const {
        newAssetName,
        decimal,
        maxSupply,
        marketFee,
        maxMarketFee,
        exchangeQuote,
        exchangeBase,
        smartCoin,
        predictionMarket,
        description,
        shortName,
        pairingAsset,
        feedInMinutes,
        forcedSettlementDelay,
        forcedSettlementMaxVolume,
        forcedSettlementPercent,
        minNumberOfFeeds,
        backingAsset,
        permissions,
        flags,
        password,
        condition,
        resolutionDate
    } = data;

    const {accountData, loginData} = getStore();

    let descriptionObj = false;

    if(description || shortName || pairingAsset || condition || resolutionDate){
        descriptionObj = {};
        if(description) descriptionObj.main = description;
        if(shortName) descriptionObj.short_name = shortName;
        if(pairingAsset) descriptionObj.market = pairingAsset;
        if(condition) descriptionObj.condition = condition;
        if(resolutionDate) descriptionObj.expiry = formDate(resolutionDate, ['year', 'month', 'date']).split(' ').join('-');
    }

    const precision = Math.pow(10, decimal);
    const baseAsset = await formAssetData({amount: exchangeBase, symbol: backingAsset});

    const core_exchange_rate = {
        base: {
            amount: baseAsset.addPrecision(),
            asset_id: baseAsset.id
        },
        quote: {
            amount: exchangeQuote * precision,
            asset_id: '1.3.1'
        }
    };

    const common_options = {
        max_supply: maxSupply * precision,
        market_fee_percent: marketFee * 100,
        max_market_fee: maxMarketFee  * precision,
        issuer_permissions: formPermissions(permissions, smartCoin),
        flags: formPermissions(flags, smartCoin),
        core_exchange_rate,
        whitelist_authorities: [],
        blacklist_authorities: [],
        whitelist_markets: [],
        blacklist_markets: [],
        description: descriptionObj && JSON.stringify(descriptionObj),
    };

    const bitasset_opts = smartCoin
        ? {
            feed_lifetime_sec: feedInMinutes * 60,
            minimum_feeds: minNumberOfFeeds,
            force_settlement_delay_sec: forcedSettlementDelay  * 60,
            force_settlement_offset_percent: forcedSettlementPercent * 100,
            maximum_force_settlement_volume: forcedSettlementMaxVolume * 100,
            short_backing_asset: await formAssetData({symbol: backingAsset}).then(e => e.id),
        }
        : false;

    const params = {
        fee: getDefaultFee(),
        issuer: accountData.id,
        symbol: newAssetName.toUpperCase(),
        precision: Number(decimal),
        is_prediction_market: predictionMarket || false,
        common_options,
        bitasset_opts,
    };

    const trx = { type: 'asset_create', params};
    const activeKey = loginData.formPrivateKey(password, 'owner');
    const trxResult = await trxBuilder([trx], [activeKey]);

    if(trxResult){
        result.success = true;
        result.callbackData = trxResult;
    }

    return result;
};

const getSymbolsList = async (symbol) => dbApi('lookup_accounts', [symbol, 5])
    .then(result => result.map(e => e[0]));

class AddNewAsset extends Component{
    state = {
        defaultData: '',
        showAdditionalData: false
    };

    componentDidMount(){
        const {fees, basicAsset} = getGlobals();
        const basicSymbol = basicAsset.symbol;
        const pairingAsset = basicAsset.symbol;
        const fee = basicAsset.setPrecision(false, fees.asset_create.long_symbol);
        const permissions = {};
        const flags = {};

        const smartPermissions = defaultPermissions.concat(additionalPermissions);
        const defaultFlags = defaultPermissions.slice(1);
        const smartFlags = defaultFlags.concat(additionalPermissions);

        smartPermissions.forEach(el => {
            permissions[el] = true;
            flags[el] = false;
        });

        const defaultData = {
            basicSymbol,
            pairingAsset,
            permissions,
            flags,
            fee,
            password: this.props.password,
            description: '',
            maxSupply: 100000,
            decimal: 4,
            exchangeQuote: 1,
            exchangeBase: 1,
            feedInMinutes: 1440,
            minNumberOfFeeds: 7,
            forcedSettlementDelay: 1440,
            forcedSettlementPercent: 1,
            forcedSettlementMaxVolume: 30,
            backingAsset: pairingAsset,
            marketFee: 0,
            maxMarketFee: 0,
        };

        this.setState({defaultData, smartPermissions, defaultFlags, smartFlags});
    }

    showAdditionalData = () => this.setState(state => ({showAdditionalData: !state.showAdditionalData}));

    handleResult = () => clearLayout();

    render(){
        const tag = 'newAssets';
        const modalTag = `modal.${tag}`;

        const {
            defaultData,
            showAdditionalData,
            smartPermissions,
            defaultFlags,
            smartFlags
        } = this.state;

        console.log(smartPermissions);

        if(!defaultData) return <span />;

        return(
            <Fragment>
                <ModalTitle tag={tag} />
                <Form
                    requiredFields={['newAssetName', 'maxSupply', 'decimal', 'exchangeQuote', 'exchangeBase']}
                    defaultData={defaultData}
                    action={createAsset}
                    handleResult={this.handleResult}
                >
                    {
                        form => {
                            const {data, errors} = form.state;

                            return(
                                <Fragment>
                                    <div className="form__row">
                                        <Input
                                            name="newAssetName"
                                            onChange={form.handleChange}
                                            error={errors}
                                            value={data}
                                            style={{ flex: 2 }}
                                        />
                                        <Input
                                            name="maxSupply"
                                            onChange={form.handleChange}
                                            error={errors}
                                            value={data}
                                            style={{ flex: 3 }}
                                        />
                                        <Input
                                            name="decimal"
                                            onChange={form.handleChange}
                                            error={errors}
                                            value={data}
                                            style={{ flex: 3 }}
                                            comment
                                        />
                                    </div>
                                    <Switcher
                                        id="smartCoin"
                                        label={`${modalTag}.smartCoin`}
                                        selected={data['smartCoin']}
                                        handleChange={form.handleChange}
                                    />
                                    {data['smartCoin'] &&
                                        <Switcher
                                            id="predictionMarket"
                                            label={`${modalTag}.predictionMarket`}
                                            selected={data['predictionMarket']}
                                            handleChange={form.handleChange}
                                        />
                                    }
                                    <TitleWrapper
                                        title={`${modalTag}.exchangeRate`}
                                        subtitle={`${modalTag}.exchangeRateSubtitle`}
                                    />
                                    <div className="form__row">
                                        <Input
                                            name="exchangeQuote"
                                            onChange={form.handleChange}
                                            error={errors}
                                            value={data}
                                            commentParams={{
                                                number: (data.exchangeQuote / data.exchangeBase).toFixed(data.decimal) || 0,
                                                symbol: `${data.newAssetName || ''}/${data.pairingAsset}`
                                            }}
                                            comment
                                        />
                                        <Input
                                            name="exchangeBase"
                                            labelParams={{asset: data.pairingAsset}}
                                            onChange={form.handleChange}
                                            error={errors}
                                            value={data}
                                        />
                                    </div>
                                    <Button
                                        className="form__hide-data"
                                        tag={!showAdditionalData ? 'showAdditionalData' : 'hideAdditionalData'}
                                        onClick={this.showAdditionalData}
                                    />
                                    {showAdditionalData &&
                                    <Fragment>
                                        <TitleWrapper title={`${modalTag}.description`}/>
                                        <Input
                                            name="description"
                                            onChange={form.handleChange}
                                            error={errors}
                                            value={data}
                                        />
                                        <div className="form__row">
                                            <Input
                                                name="shortName"
                                                onChange={form.handleChange}
                                                error={errors}
                                                value={data}
                                            />
                                            <FieldWithHint
                                                name="pairingAsset"
                                                method={getSymbolsList}
                                                handleChange={form.handleChange}
                                                defaultVal={data}
                                            />
                                        </div>
                                        {data['smartCoin'] && data['predictionMarket'] &&
                                            <div className="form__row">
                                                <Input
                                                    name="condition"
                                                    onChange={form.handleChange}
                                                    error={errors}
                                                    value={data}
                                                />
                                                <DateField
                                                    name="resolutionDate"
                                                    selected={form.dateBegin}
                                                    onChange={form.handleChange}
                                                    error={form.state.errors}
                                                    value={form.state.data}
                                                />
                                            </div>
                                        }
                                        {data['smartCoin'] &&
                                        <Fragment>
                                            <TitleWrapper title={`${modalTag}.smartCoinOptions`}/>
                                            <Input
                                                name="feedInMinutes"
                                                type="number"
                                                onChange={form.handleChange}
                                                error={errors}
                                                value={data}
                                            />
                                            <Input
                                                name="minNumberOfFeeds"
                                                type="number"
                                                onChange={form.handleChange}
                                                error={errors}
                                                value={data}
                                            />
                                            <Input
                                                name="forcedSettlementDelay"
                                                type="number"
                                                onChange={form.handleChange}
                                                error={errors}
                                                value={data}
                                            />
                                            <Input
                                                name="forcedSettlementPercent"
                                                type="number"
                                                onChange={form.handleChange}
                                                error={errors}
                                                value={data}
                                            />
                                            <Input
                                                name="forcedSettlementMaxVolume"
                                                type="number"
                                                onChange={form.handleChange}
                                                error={errors}
                                                value={data}
                                            />
                                            <FieldWithHint
                                                name="backingAsset"
                                                method={getSymbolsList}
                                                handleChange={form.handleChange}
                                                defaultVal={data}
                                            />
                                        </Fragment>
                                        }
                                        <TitleWrapper
                                            title={`${modalTag}.permissions`}
                                            subtitle={`${modalTag}.permissionsSubtitle`}
                                        />
                                        <SwitchersGroup
                                            groupId="permissions"
                                            defaultData={data['permissions']}
                                            switchersList={data['smartCoin'] ? smartPermissions : defaultPermissions}
                                            handleChange={form.handleChange}
                                            labelTag="block.permissions"
                                        />
                                        <TitleWrapper
                                            title={`${modalTag}.flags`}
                                            subtitle={`${modalTag}.flagsSubtitle`}
                                        />
                                        <div className="switchers-group">
                                            <Switcher
                                                id="flagMarketFee"
                                                className="right-sided"
                                                label={`block.permissions.charge_market_fee`}
                                                selected={data['flagMarketFee']}
                                                handleChange={form.handleChange}
                                            />
                                        </div>
                                        {data.flagMarketFee &&
                                            <div className="form__row">
                                                <Input
                                                    name="marketFee"
                                                    type="number"
                                                    onChange={form.handleChange}
                                                    error={errors}
                                                    value={data}
                                                />
                                                <Input
                                                    name="maxMarketFee"
                                                    type="number"
                                                    onChange={form.handleChange}
                                                    error={errors}
                                                    value={data}
                                                />
                                            </div>
                                        }
                                        <SwitchersGroup
                                            groupId="flags"
                                            defaultData={data['flags']}
                                            switchersList={data['smartCoin'] ? smartFlags : defaultFlags}
                                            handleChange={form.handleChange}
                                            labelTag="block.permissions"
                                        />
                                        <Button
                                            className="form__hide-data"
                                            tag={!showAdditionalData ? 'showAdditionalData' : 'hideAdditionalData'}
                                            onClick={this.showAdditionalData}
                                        />
                                    </Fragment>
                                    }
                                    <div className="fee">
                                        <span>Approx. Fee</span>
                                        <span>{data.fee} {data.basicSymbol}</span>
                                    </div>
                                    <div className="modal__bottom">
                                        <Close />
                                        <Submit tag="create" />
                                    </div>
                                </Fragment>
                            )
                        }
                    }
                </Form>
            </Fragment>
        )
    }
}

export default AddNewAsset;