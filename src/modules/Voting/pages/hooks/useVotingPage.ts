import { useEffect, useState } from "react";

import { PageMeta } from "../../../../common/types";

import { VotingPage } from "./useVotingPage.types";

export function useVotingPage(tab?: string): VotingPage {
  const [pageMeta, setPageMeta] = useState<PageMeta>({
    title: "Homepesa Organisation (Power Vote)",
    heading: "Homepesa Organisation (Power Vote)",
    description: "Homepesa Organisation (Power Vote) | ",
  });

  useEffect(() => {
    switch (tab) {
      case "gpos":
        setPageMeta({
          title: "Homepesa Organisation (Power Vote)",
          heading: "Homepesa Organisation (Power Vote)",
          description: "Homepesa Organisation (Power Vote)",
        });
        break;
      case "witness":
        setPageMeta({
          title: "Homepesa Organisation Voting",
          heading: "Homepesa Organisation Voting",
          description: "Homepesa Organisation Voting | Witness",
        });
        break;
      case "sons":
        setPageMeta({
          title: "Homepesa Organisation Voting",
          heading: "Homepesa Organisation Voting",
          description: "Homepesa Organisation Voting | SONs",
        });
        break;
      case "advisors":
        setPageMeta({
          title: "Homepesa Organisation Voting",
          heading: "Homepesa Organisation Voting",
          description: "Homepesa Organisation Voting | Advisors",
        });
        break;
      case "proxy":
        setPageMeta({
          title: "Homepesa Organisation Voting",
          heading: "Homepesa Organisation Voting",
          description: "Homepesa Organisation Voting | Proxy",
        });
        break;
      default:
        setPageMeta({
          title: "Homepesa Organisation (Power Vote)",
          heading: "Homepesa Organisation (Power Vote)",
          description: "Homepesa Organisation (Power Vote)",
        });
        break;
    }
  }, [tab]);

  return { pageMeta };
}
