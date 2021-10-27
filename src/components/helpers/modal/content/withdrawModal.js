import React from "react";
import {Fragment} from "react";
import ModalTitle from "../decoration/modalTitle";
import AssetWithdrawDec from "../../../pages/myAssets/assetsWithdrawDec";

const WithdrawModal = ({asset, password}) => (
    <Fragment>
        <ModalTitle tag="withdraw" />
        <AssetWithdrawDec defaultAsset={asset} password={password} />
    </Fragment>
);

export default WithdrawModal;