import React from "react";
import {Fragment} from "react";
import ModalTitle from "../decoration/modalTitle";
import AssetWithdraw from "../../../pages/myAssets/assetsWithdraw";

const WithdrawModal = ({asset, password}) => (
    <Fragment>
        <ModalTitle tag="withdraw" />
        <AssetWithdraw defaultAsset={asset} password={password} />
    </Fragment>
);

export default WithdrawModal;