import { formValuesTypes } from "@/app/create/page";
import { ReactNode } from "react";
import ProjectBanner from "./ProjectBanner";
import ProjectHeader from "./ProjectHeader";
import ProjectBody from "./ProjectBody";
import ProjectTags from "./ProjectTags";

type InformationProps = {
  project: formValuesTypes;
};

export default function Information({ project }: InformationProps): ReactNode {
  const {
    projectName,
    bannerImage,
    logo,
    description,
    startDate,
    endDate,
    scopeTags,
    contributors,
  } = project;

  return (
    <div className="flex flex-col gap-3 px-5 p-4 rounded-tl-xl rounded-tr-xl md:rounded-tr-none md:rounded-bl-xl bg-gray-900">
      <h1 className="text-3xl text-center font-bold p-2">{projectName}</h1>
      <ProjectBanner bannerImage={bannerImage} />
      <ProjectHeader logo={logo} contributors={contributors} />
      <ProjectBody
        description={description}
        startDate={startDate}
        endDate={endDate}
      />
      <ProjectTags scopeTags={scopeTags} />
    </div>
  );
}
