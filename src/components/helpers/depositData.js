import React from "react";
import QRCode from 'qrcode-react';
import InfoBlock from "./infoBlock";
import Translate from "react-translate-component";
import Link from "react-router-dom/es/Link";
import WarningMessage from "./warningMessage";

const DepositData = ({type, data, address, memo, user}) => {

    const {minAmount, gatewayWallet, depositCoin, withdrawCoin} = data;
    const isDeposit = type === 'deposit';
    const inputAsset = isDeposit ? depositCoin.toUpperCase() : withdrawCoin.toUpperCase();
    const outputAsset = isDeposit ? withdrawCoin.toUpperCase() : depositCoin.toUpperCase();
    const minDeposit = `${minAmount} ${inputAsset}`;

    return(
        <div>
            { isDeposit && !memo && <QRCode value={address} size={170} /> }
            {isDeposit &&
                <div className="deposit__info">
                    <InfoBlock tag="deposit.address" data={{inputAsset, outputAsset, address: <b>{address}</b>}}/>
                    {isDeposit && memo && <InfoBlock tag="deposit.memo" data={{memo: <b>{memo}</b>}}/>}
                    <WarningMessage
                        titleTag="bridgeData.minDeposit"
                        titleData={{minDeposit}}
                        subtitleTag="bridgeData.minDepositComment"
                        subtitleData={{inputAsset, minDeposit}}
                    />
                </div>
            }
            <div className="deposit-stats">
                <div className="deposit-stats__item">
                    <Translate content={isDeposit ? "bridgeData.assetToDeposit" : "bridgeData.assetToWithdraw"} className="deposit-stats__title" />
                    <Link to={`/asset/${inputAsset}`} className="deposit-stats__data">{inputAsset}</Link>
                </div>
                <div className="deposit-stats__item">
                    <Translate content="bridgeData.assetToReceive" className="deposit-stats__title" />
                    <Link to={`/asset/${outputAsset}`} className="deposit-stats__data">{outputAsset}</Link>
                </div>
                <div className="deposit-stats__item">
                    <Translate content="bridgeData.intermediateAccount" className="deposit-stats__title" />
                    <Link to={`/user/${gatewayWallet}`} className="deposit-stats__data">{gatewayWallet}</Link>
                </div>
                <div className="deposit-stats__item">
                    <Translate content="bridgeData.senderAccount" className="deposit-stats__title" />
                    <Link to={`/user/${user.name}`} className="deposit-stats__data">{user.name}</Link>
                </div>
                <div className="deposit-stats__item">
                    <Translate content="bridgeData.currentBalance" className="deposit-stats__title" />
                    <span className="deposit-stats__data">{user.balance}</span>
                </div>
            </div>
        </div>
    )
};

export default DepositData;