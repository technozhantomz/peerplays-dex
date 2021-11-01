import React, { useEffect, useState, Fragment } from "react";
import { getAccountData, getBasicAsset } from "../../../actions/store";
import {getStorage} from "../../../actions/storage";
import DepositData from "../../helpers/depositData";
import WithdrawForm from "../../helpers/withdrawForm";
import Translate from "react-translate-component";
import NoData from "../../helpers/noData";
import Close from "../../helpers/modal/decoration/close";
import { clearLayout } from "../../../dispatch";
import Dropdown from "../../helpers/form/dropdown";
import SelectHeader from "../../helpers/selectHeader";

function AssetWithdraw({ defaultAsset, password }) {
    const [ coinParams, setCoinParams ] = useState({});
    const [ defaultFormData, setDefaultFormData ] = useState({});
    const [ userData, setUserData ] = useState({});

    useEffect(() => {
        const bridgesData = getStorage('bridges').bridgesData;
        if (Object.keys(bridgesData).length === 0) return;

        const coinParams = bridgesData['Xbtsx'].coinsList['SmartHoldem'];
        setCoinParams(coinParams);
        setDefaultFormData({
            ...coinParams,
            fee: getBasicAsset(),
            bridgeName: 'Xbtsx',
            baseApiUrl: 'https://apis.xbts.io/api/v1',
            password
        });

        const currentUser = getAccountData();
        const userAsset = currentUser.assets.find(el => el.symbol === coinParams.withdrawCoin);
        const userData = {
            name: currentUser.name,
            balance: userAsset ? userAsset.toString() : `0 ${coinParams.withdrawCoin}`
        };
        setUserData(userData);
    }, []);


    const isModal = !!defaultAsset;
    const coinParamsIsValid = !!Object.keys(coinParams).length;
    if (!coinParamsIsValid) {
        return (
            <Fragment>
                <NoData tag="emptyPage.withdraw" />
                {isModal && (
                    <div className="modal__bottom">
                        <Close />
                    </div>
                )}
            </Fragment>
        );
    }

    const depositData = <DepositData data={coinParams} user={userData} />;

    return (
        <div className="deposit">
            <div>
                <Dropdown
                    btn={<SelectHeader labelTag="field.labels.asset" text={'SmartHoldem'}/>}
                    list={[<button 
                        key={0}
                    >{'SmartHoldem'}</button>]}
                />
                {coinParamsIsValid &&
                    <WithdrawForm defaultData={defaultFormData} handleResult={clearLayout} depositData={isModal && depositData} />
                }
            </div>
            {coinParamsIsValid
                ? !isModal && depositData
                : <Translate content="bridgeData.warning" component="div" />
            }
        </div>
    );
}

export default AssetWithdraw;