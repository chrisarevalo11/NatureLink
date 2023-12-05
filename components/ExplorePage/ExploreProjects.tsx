import { ReactNode, useState } from "react";
import ProjectCard from "./ProjectCard";

export default function ExploreProjects(): ReactNode {
  const [allProjects, setAllProjects] = useState([]);
  const test = {
    projectName: "Project Name",
    bannerImage:
      "https://pbs.twimg.com/media/F_KOERzXkAAaXFC?format=jpg&name=small",
    logo: "https://pbs.twimg.com/profile_images/1494316842503925764/eJ-0xwBV_400x400.jpg",
    link: "https://www.google.com",
    description:
      "lorem ipsum lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsumlorem ipsum ",
    amount: 18000,
    startDate: "2024-01-01",
    endDate: "2022-02-01",
    scopeTags: "tag1, tag2, tag3",
    contributors: "0x12e3e1, Juan, Rookie",
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-6 lg:px-6">
      <ProjectCard projectMetadata={test} currentAmount={9000} />
      <ProjectCard projectMetadata={test} currentAmount={12000} />
      <ProjectCard projectMetadata={test} currentAmount={2000} />
    </div>
  );
}
