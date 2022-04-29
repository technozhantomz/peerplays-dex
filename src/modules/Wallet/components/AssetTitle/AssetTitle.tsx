import BitcoinIcon from "../../../../ui/src/icons/Cryptocurrencies/BitcoinIcon.svg";
import HIVEIcon from "../../../../ui/src/icons/Cryptocurrencies/HIVEIcon.svg";
import PPYIcon from "../../../../ui/src/icons/Cryptocurrencies/PPYIcon.svg";

import * as Styled from "./AssetTitle.styled";

type Props = {
  symbol: string;
};

export const AssetTitle = ({ symbol }: Props): JSX.Element => {
  const icons: {
    [symbol: string]: JSX.Element;
  } = {
    BTC: <BitcoinIcon height="30" width="30" />,
    USD: <PPYIcon height="30" width="30" />,
    PPY: <PPYIcon height="30" width="30" />,
    KES: <HIVEIcon height="30" width="30" />,
    GOLD: <HIVEIcon height="30" width="30" />,
  };
  const AssetNames: {
    [symbol: string]: string;
  } = {
    BTC: "Bitcoin",
    USD: "Peerplays",
    PPY: "Peerplays",
    KES: "Hive",
    GOLD: "Hive",
  };

  return (
    <Styled.AssetTitle
      avatar={icons[symbol]}
      title={
        <>
          {AssetNames[symbol]} <span className="asset-symbol">{symbol}</span>
        </>
      }
    />
  );
};
