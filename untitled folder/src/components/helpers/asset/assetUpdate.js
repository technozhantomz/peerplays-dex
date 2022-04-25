import React, {Component, Fragment} from 'react';
import TitleWrapper from "../../helpers/titleWrapper";
import dataFetch from "../../helpers/dataFetch";
import Form from "../../helpers/form/form";

const getDefaultFormData = async context => {
    const assetData = context.props.data;
    const {max_supply, core_exchange_rate} = assetData.basicData.options;
    return {
        max_supply,
        core_exchange_rate
    };
};

const updateAsset = async (data, result) => {
    console.log(data);
    return result;
};

const handleResult = () => console.log('asdasdasd');

const AssetUpdate = ({data}) => {
    console.log(data);
    const tag = 'assetUpdate';
    return (
        <Form
            requiredFields={['newAssetName', 'maxSupply', 'decimal', 'exchangeQuote', 'exchangeBase']}
            defaultData={data}
            action={updateAsset}
            handleResult={handleResult}
        >
            {
                form => {
                    return(
                        <Fragment>
                            <TitleWrapper title={`${tag}.primarySettings`} />
                            <TitleWrapper title={`${tag}.exchangeRate`} />
                        </Fragment>
                    )
                }
            }
        </Form>
    )
};

export default dataFetch({method: getDefaultFormData})(AssetUpdate)