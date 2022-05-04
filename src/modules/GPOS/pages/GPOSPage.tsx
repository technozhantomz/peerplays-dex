import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

import { Layout } from "../../../common/components";
import { useViewportContext } from "../../../common/providers";
import { Button, DownOutlined, Menu, Tabs } from "../../../ui/src";
import { PowerDownTab, PowerUpTab } from "../components";

import * as Styled from "./GPOSPage.styled";

const { TabPane } = Tabs;

const GPOSPage: NextPage = () => {
  const router = useRouter();
  const { tab } = router.query;
  const { sm } = useViewportContext();
  const [visible, setVisible] = useState<boolean>(false);
  const renderTabBar = (props: any, DefaultTabBar: any) => (
    <>
      {sm ? (
        <Styled.MobileDropdownWrapper>
          <Styled.MobileDropdown
            visible={visible}
            overlay={
              <Styled.MobileTabsWrapper>
                <Menu>
                  <DefaultTabBar {...props}>
                    {(node: any) => (
                      <Menu.Item key={node.key}>{node}</Menu.Item>
                    )}
                  </DefaultTabBar>
                </Menu>
              </Styled.MobileTabsWrapper>
            }
          >
            <Button type="text" onClick={() => setVisible(!visible)}>
              {tab ? tab : "power-up"} <DownOutlined />
            </Button>
          </Styled.MobileDropdown>
        </Styled.MobileDropdownWrapper>
      ) : (
        <DefaultTabBar {...props}>{(node: any) => <>{node}</>}</DefaultTabBar>
      )}
    </>
  );
  return (
    <Layout
      title="Homepesa (STAKE VOVE)"
      type="card-lrg"
      heading="Homepesa (STAKE VOVE)"
      description="Homepesa (STAKE VOVE)"
      dexLayout={true}
    >
      <Styled.GPOSCard>
        <Tabs
          renderTabBar={renderTabBar}
          activeKey={`${tab ? tab : "power-up"}`}
          onTabClick={(key) => {
            if (key === "vote") router.push(`/voting`);
            else router.push(`/gpos?tab=${key}`);
            if (sm) setVisible(false);
          }}
        >
          <TabPane tab="Power up" key="power-up">
            <PowerUpTab />
          </TabPane>
          <TabPane tab="Power Down" key="power-down">
            <PowerDownTab />
          </TabPane>
          <TabPane tab="Vote" key="vote"></TabPane>
        </Tabs>
      </Styled.GPOSCard>
    </Layout>
  );
};

export default GPOSPage;
