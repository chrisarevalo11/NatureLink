import { formValuesTypes } from "@/app/create/page";
import { ReactNode } from "react";

type InformationProps = {
  project: formValuesTypes;
};

export default function Information({ project }: InformationProps): ReactNode {
  const {
    projectName,
    bannerImage,
    logo,
    link,
    description,
    amount,
    startDate,
    endDate,
    scopeTags,
    contributors,
  } = project;
  const currentAmount: number = 2000;
  const tags: string[] = scopeTags?.split(",");

  return (
    <div className="flex flex-col gap-3 px-5 p-4 rounded-tl-xl rounded-tr-xl md:rounded-tr-none md:rounded-bl-xl bg-gray-900">
      <h1 className="text-3xl text-center font-bold p-2">{projectName}</h1>
      <figure
        style={{
          backgroundImage: `url(${bannerImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className="h-48 rounded-xl"
      ></figure>
      <header className="flex gap-3 items-center my-2">
        <div
          style={{
            backgroundImage: `url(${logo})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          className="w-12 h-12 rounded-full"
        ></div>
        <h2 className="text-green-300">
          By{" "}
          <span className="font-bold">
            {contributors?.split(",").join(", ")}
          </span>
        </h2>
      </header>
      <h3 className="text-sm text-gray-500 -mt-2">
        {startDate} - {endDate}
      </h3>
      <h2 className="font-bold text-xl">Description:</h2>
      <p>{description}</p>
      <h2 className="font-bold text-xl mt-2">Tags:</h2>
      <div className="flex flex-wrap gap-1 p-1">
        {scopeTags &&
          tags.map(
            (tag) =>
              tag && (
                <span
                  key={tag}
                  className="px-2 border-2 border-gray-400 rounded-md"
                >
                  {tag}
                </span>
              )
          )}
      </div>
    </div>
  );
}
