import { ReactElement } from "react";
import { formValuesTypes } from "@/app/create/page";

type HypercertProps = {
  formValues: formValuesTypes;
};

export default function Hypercert({
  formValues,
}: HypercertProps): ReactElement {
  const { projectName, bannerImage, startDate, endDate, scopeTags } =
    formValues;

  const tags: string[] = scopeTags.split(",");

  return (
    <div className="card w-[95%] p-2 flex flex-col items-center justify-around gap-3 text-base-100 md:w-[90%] lg:w-1/3 max-w-[280px] lg:sticky lg:top-4 min-h-[350px] bg-gradient-to-b from-gray-700 to-gray-900 shadow-xl m-2">
      <h1 className="text-2xl mt-2">{projectName}</h1>
      <div className="text-center space-y-2">
        <h2>From: {startDate}</h2>
        <h2>To: {endDate}</h2>
        <div className="flex flex-wrap gap-1">
          {scopeTags &&
            tags.map(
              (tag) =>
                tag && (
                  <span className="px-2 border-2 border-gray-400 rounded-md">
                    {tag}
                  </span>
                )
            )}
        </div>
      </div>
    </div>
  );
}
