import { useEffect, useState } from "react";

import { PageMeta } from "../../../../../common/types";

import { BlockchainPage } from "./useBlockchainPage.types";

export function useBlockchainPage(tab?: string): BlockchainPage {
  const [pageMeta, setPageMeta] = useState<PageMeta>({
    title: "commodityLLC Blockchain",
    heading: "commodityLLC Blockchain",
    description: "Blockchain | ",
  });

  useEffect(() => {
    switch (tab) {
      case "blockchain":
        setPageMeta({
          title: "commodityLLC Blockchain",
          heading: "commodityLLC Blockchain",
          description: "Blockchain | ",
        });
        break;
      case "assets":
        setPageMeta({
          title: "commodityLLC Assets",
          heading: "commodityLLC Assets",
          description: "commodityLLC Assets",
        });
        break;
      case "witnesses":
        setPageMeta({
          title: "commodityLLC Witnesses",
          heading: "commodityLLC Witnesses",
          description: "commodityLLC Witnesses",
        });
        break;
      case "committee":
        setPageMeta({
          title: "commodityLLC Committee",
          heading: "commodityLLC Committee",
          description: "commodityLLC Committee",
        });
        break;
      case "fees":
        setPageMeta({
          title: "commodityLLC Fees",
          heading: "commodityLLC Fees",
          description: "commodityLLC Fees",
        });
        break;
      default:
        setPageMeta({
          title: "Blockchain",
          heading: "commodityLLC Blockchain",
          description: "Blockchain | ",
        });
        break;
    }
  }, [tab]);

  return { pageMeta };
}
