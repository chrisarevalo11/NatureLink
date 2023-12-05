"use client";

import { ReactElement, useState } from "react";
import Activity from "@/components/ProfilePage/Activity";
import Projects from "@/components/ProfilePage/Projects";
import Contributions from "@/components/ProfilePage/Contributions";
import Followers from "@/components/ProfilePage/Followers";
import Following from "@/components/ProfilePage/Following";
import Evaluations from "./Evaluations";

const tabs: string[] = [
  "Activity",
  "Projects",
  "Contributions",
  "Evaluations",
  "Followers",
  "Following",
];
const tabContent: Record<string, ReactElement> = {
  Activity: <Activity />,
  Projects: <Projects />,
  Contributions: <Contributions />,
  Evaluations: <Evaluations />,
  Followers: <Followers />,
  Following: <Following />,
};

export default function TabsSection(): ReactElement {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const currentTab: string = tabs[activeTabIndex];

  const handleTabClick = (index: number) => {
    setActiveTabIndex(index);
  };

  return (
    <div className="lg:col-span-2 space-y-6">
      <div
        role="tablist"
        className="tabs tabs-boxed bg-gray-900  overflow-x-scroll no-scrollbar"
      >
        {tabs.map((tab, index) => (
          <a
            key={index}
            role="tab"
            className={`tab  ${
              activeTabIndex === index && "tab-active pointer-events-none"
            }`}
            onClick={() => handleTabClick(index)}
          >
            {tab}
          </a>
        ))}
      </div>
      <div
        style={{ marginTop: "10px" }}
        className=" bg-gray-900 rounded-lg min-h-[150px] flex justify-center items-center p-2"
      >
        {tabContent[currentTab]}
      </div>
    </div>
  );
}
