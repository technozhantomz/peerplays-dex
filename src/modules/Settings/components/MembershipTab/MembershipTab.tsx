import Link from "next/link";
import React from "react";

import { defaultToken } from "../../../../api/params";
import { PasswordModal, TransactionModal } from "../../../../common/components";
import { useHandleTransactionForm } from "../../../../common/hooks";

import * as Styled from "./MembershipTab.styled";
import { useMembershipTab } from "./hooks/useMembershipTab";

export const MembershipTab = (): JSX.Element => {
  const {
    transactionErrorMessage,
    transactionSuccessMessage,
    loadingTransaction,
    membershipForm,
    name,
    feesCashback,
    membershipPrice,
    networkFee,
    lifetimeFee,
    referrerTotalFee,
    referrerFee,
    registrarFee,
    vestingThreshold,
    vestingPeriod,
    isLifetimeMember,
    maintenanceInterval,
    nextMaintenanceTime,
    lifetimeReferrerName,
    referrerName,
    registrarName,
    paidFees,
    expirationDate,
    loadingAccountMembership,
    handleMembershipUpgrade,
    setTransactionErrorMessage,
    setTransactionSuccessMessage,
  } = useMembershipTab();

  const {
    isPasswordModalVisible,
    isTransactionModalVisible,
    showPasswordModal,
    hidePasswordModal,
    handleFormFinish,
    hideTransactionModal,
  } = useHandleTransactionForm({
    handleTransactionConfirmation: handleMembershipUpgrade,
    setTransactionErrorMessage,
    setTransactionSuccessMessage,
  });

  const { origin } = window.location;
  const link = origin;

  return (
    <Styled.MembershipCard>
      <Styled.MembershipForm.Provider onFormFinish={handleFormFinish}>
        <Styled.MembershipForm
          form={membershipForm}
          name="membershipForm"
          onFinish={showPasswordModal}
        >
          <Styled.Space direction="vertical">
            {!isLifetimeMember ? (
              <Styled.Space direction="vertical">
                <Styled.Heading>
                  {`Upgrade for ${feesCashback}% Cashback`}
                </Styled.Heading>
                <Styled.Paragraph>
                  Every transaction on the commodit blockchain is divided between
                  the blockchain and referrers. By registering to a Lifetime
                  Membership the account will receive {`${feesCashback} `}
                  cashback on every transaction fee paid. As a bonus it will
                  also qualify to earn referral income from users registered
                  with or refered to the blockchain.
                </Styled.Paragraph>
                <Styled.Paragraph>
                  A Lifetime Membership price will change over time, right now
                  it is only {`${membershipPrice} ${defaultToken}`} .
                </Styled.Paragraph>
                <Styled.ButtonContainer>
                  <Styled.Button
                    type="primary"
                    htmlType="submit"
                    disabled={loadingAccountMembership}
                  >
                    Buy lifetime subscription
                  </Styled.Button>
                </Styled.ButtonContainer>
              </Styled.Space>
            ) : (
              <Styled.Space direction="vertical">
                <Styled.Label>Your referral link</Styled.Label>
                <Styled.Paragraph>
                  {`Give this to link to people you want to refer to commodit: ${link}/signup/?r=${name}`}
                </Styled.Paragraph>
              </Styled.Space>
            )}
            <Styled.Heading>Fee Allocation</Styled.Heading>
            <Styled.Paragraph>
              Every time {name} pays a transaction fee, that fee is divided
              among several different accounts. The blockchain takes a {networkFee}
              % cut, and the Lifetime Member who referred {name} gets a{" "}
              {lifetimeFee}% cut. The registrar is the account that paid the
              transaction fee to register {name} with the network. The registrar
              gets to decide how to divide the remaining {referrerTotalFee}%
              between themselves and their own Affiliate Referrer program.{" "}
              {name}'s registrar chose to share {referrerFee}% of the total fee
              with the Affiliate Referrer and keep {registrarFee}% of the total
              fee for themselves.
            </Styled.Paragraph>
            <Styled.FeeCategoryContainer>
              <Styled.LabelContainer>
                <Styled.Label>blockchain</Styled.Label> <br />
              </Styled.LabelContainer>
              <Styled.PercentageContainer>
                <Styled.PercentageText>{networkFee}%</Styled.PercentageText>
              </Styled.PercentageContainer>
            </Styled.FeeCategoryContainer>
            <Styled.FeeCategoryContainer>
              <Styled.LabelContainer>
                <Styled.Label>Lifetime Referrer</Styled.Label> <br />
                <Link href={`/user/${lifetimeReferrerName}`}>
                  {lifetimeReferrerName}
                </Link>
              </Styled.LabelContainer>
              <Styled.PercentageContainer>
                <Styled.PercentageText>{lifetimeFee}%</Styled.PercentageText>
              </Styled.PercentageContainer>
            </Styled.FeeCategoryContainer>
            <Styled.FeeCategoryContainer>
              <Styled.LabelContainer>
                <Styled.Label>Registrar</Styled.Label> <br />
                <Link href={`/user/${registrarName}`}>{registrarName}</Link>
              </Styled.LabelContainer>
              <Styled.PercentageContainer>
                <Styled.PercentageText>{registrarFee}%</Styled.PercentageText>
              </Styled.PercentageContainer>
            </Styled.FeeCategoryContainer>
            <Styled.FeeCategoryContainer>
              <Styled.LabelContainer>
                <Styled.Label>Affiliate Referrer</Styled.Label> <br />
                <Link href={`/user/${referrerName}`}>{referrerName}</Link>
              </Styled.LabelContainer>
              <Styled.PercentageContainer>
                <Styled.PercentageText>{referrerFee}%</Styled.PercentageText>
              </Styled.PercentageContainer>
            </Styled.FeeCategoryContainer>
            <Styled.FeeCategoryContainer>
              <Styled.LabelContainer>
                <Styled.Label>Membership expiration</Styled.Label> <br />
              </Styled.LabelContainer>
              <Styled.PercentageContainer>
                <Styled.PercentageText>{expirationDate}</Styled.PercentageText>
              </Styled.PercentageContainer>
            </Styled.FeeCategoryContainer>
            <Styled.Heading>Fee statistics</Styled.Heading>
            <Styled.FeeCategoryContainer>
              <Styled.LabelContainer>
                <Styled.Label>Total fees paid</Styled.Label> <br />
              </Styled.LabelContainer>
              <Styled.PercentageContainer>
                <Styled.PercentageText>
                  {`${paidFees} ${defaultToken}`}
                </Styled.PercentageText>
              </Styled.PercentageContainer>
            </Styled.FeeCategoryContainer>
            <Styled.Heading>Pending fees</Styled.Heading>
            <Styled.Paragraph>
              {`Fees paid by ${name} are divided among the blockchain network, referrers, and registrars 
              once every maintenance interval (${maintenanceInterval} seconds). 
              The next maintenance time is ${nextMaintenanceTime}.`}
            </Styled.Paragraph>
            <Styled.Heading>Vesting fees</Styled.Heading>
            <Styled.Paragraph>
              {`Most fees are made available immediately, 
              but fees over ${vestingThreshold} ${defaultToken} 
              (such as those paid to upgrade your membership or register a premium account name) 
              must vest for a total of ${vestingPeriod} days.`}
            </Styled.Paragraph>
          </Styled.Space>
          <PasswordModal
            visible={isPasswordModalVisible}
            onCancel={hidePasswordModal}
            submitting={loadingTransaction}
          />
          <TransactionModal
            visible={isTransactionModalVisible}
            onCancel={hideTransactionModal}
            transactionErrorMessage={transactionErrorMessage}
            transactionSuccessMessage={transactionSuccessMessage}
            loadingTransaction={loadingTransaction}
            account={name}
            fee={membershipPrice}
            transactionType="account_upgrade"
          />
        </Styled.MembershipForm>
      </Styled.MembershipForm.Provider>
    </Styled.MembershipCard>
  );
};
