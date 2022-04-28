import Link from "next/link";
import { useRouter } from "next/router";

import HIVEIcon from "../../../ui/src/icons/Cryptocurrencies/HIVEIcon.svg";
import { useUserContext } from "../../providers";

import * as Styled from "./HIVEAndHBDDeposit.styled";

type Props = {
  assetSymbol: string;
};

export const HIVEAndHBDDeposit = ({
  assetSymbol = "KES",
}: Props): JSX.Element => {
  const router = useRouter();
  const { localStorageAccount } = useUserContext();
  return (
    <>
      {localStorageAccount && localStorageAccount !== "" ? (
        <Styled.Container>
          <Styled.LogoContainer>
            <HIVEIcon width="20px" height="20px" />
          </Styled.LogoContainer>
          <Styled.DepositInstruction>
            {`To deposit ${assetSymbol} to `}
            <Styled.AccountContainer>{`${localStorageAccount} `}</Styled.AccountContainer>
            please click on account name, i.e.
            <Styled.AccountContainer>{` ${localStorageAccount} `}</Styled.AccountContainer>
            TO USE Debit/Credit card and/or mobile money.
          </Styled.DepositInstruction>
        </Styled.Container>
      ) : (
        <Styled.LoginContainer>
          <Styled.Button
            type="primary"
            htmlType="button"
            onClick={() => {
              router.push("/login");
            }}
          >
            {`Log in & Deposit ${assetSymbol}`}
          </Styled.Button>

          <Styled.FormDisclamer>
            <span>Don't have a commodityLLC account? </span>
            <Link href="/signup">
              <a>Create account</a>
            </Link>
          </Styled.FormDisclamer>
        </Styled.LoginContainer>
      )}
    </>
  );
};