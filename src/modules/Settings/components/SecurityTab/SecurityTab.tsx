import React from "react";

import { useSettingsContext } from "../../../../common/providers";
import { useSettings } from "../../hooks";

import * as Styled from "./SecurityTab.styled";

export const SecurityTab = (): JSX.Element => {
  const { generalSettingsForm, updateSettings, showSuccessMessage } =
    useSettings();
  const { settings } = useSettingsContext();

  const walletLockInMinutes = ["0", "30", "60", "90", "180", "210"];

  return (
    <Styled.SecuritySettingsCard>
      <Styled.SecurityTabForm
        form={generalSettingsForm}
        name="generalSettingForm"
        onFinish={updateSettings}
        initialValues={{ walletLockInMinutes: settings.walletLock }}
      >
        <Styled.LabelText>Lock Wallet</Styled.LabelText>
        <Styled.LockWalletFormItem name="walletLockInMinutes">
          <Styled.Select>
            {walletLockInMinutes.map((e, i) => (
              <Styled.Option value={e} key={i}>
                {e} minutes{" "}
              </Styled.Option>
            ))}
          </Styled.Select>
        </Styled.LockWalletFormItem>
        {showSuccessMessage && (
          <Styled.LabelText type="success">Setting saved!</Styled.LabelText>
        )}
        <Styled.BtnDiv>
          <Styled.SaveButton type="primary" htmlType="submit">
            Save
          </Styled.SaveButton>
        </Styled.BtnDiv>
      </Styled.SecurityTabForm>
    </Styled.SecuritySettingsCard>
  );
};
