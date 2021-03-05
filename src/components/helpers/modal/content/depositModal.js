import React, {Fragment} from "react";
import AssetDeposit from "../../../pages/myAssets/assetsDeposit";
import ModalTitle from "../decoration/modalTitle";

const DepositModal = ({asset, name}) => (
    <Fragment>
        <ModalTitle tag="deposit" additionalData={{asset}} />
        <AssetDeposit defaultAsset={asset} defaultUser={name} />
    </Fragment>
);

export default DepositModal;