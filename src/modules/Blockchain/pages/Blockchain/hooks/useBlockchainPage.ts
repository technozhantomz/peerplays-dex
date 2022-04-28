import { useEffect, useState } from "react";

import { PageMeta } from "../../../../../common/types";

import { BlockchainPage } from "./useBlockchainPage.types";

export function useBlockchainPage(tab?: string): BlockchainPage {
  const [pageMeta, setPageMeta] = useState<PageMeta>({
    title: "CommodityLLC Blockchain",
    heading: "CommodityLLC Blockchain",
    description: "Blockchain | ",
  });

  useEffect(() => {
    switch (tab) {
      case "blockchain":
        setPageMeta({
          title: "CommodityLLC Blockchain",
          heading: "CommodityLLC Blockchain",
          description: "Blockchain | ",
        });
        break;
      case "assets":
        setPageMeta({
          title: "CommodityLLC Assets",
          heading: "CommodityLLC Assets",
          description: "CommodityLLC Assets",
        });
        break;
      case "witnesses":
        setPageMeta({
          title: "CommodityLLC Witnesses",
          heading: "CommodityLLC Witnesses",
          description: "CommodityLLC Witnesses",
        });
        break;
      case "committee":
        setPageMeta({
          title: "CommodityLLC Committee",
          heading: "CommodityLLC Committee",
          description: "CommodityLLC Committee",
        });
        break;
      case "fees":
        setPageMeta({
          title: "CommodityLLC Fees",
          heading: "CommodityLLC Fees",
          description: "CommodityLLC Fees",
        });
        break;
      default:
        setPageMeta({
          title: "Blockchain",
          heading: "CommodityLLC Blockchain",
          description: "Blockchain | ",
        });
        break;
    }
  }, [tab]);

  return { pageMeta };
}
