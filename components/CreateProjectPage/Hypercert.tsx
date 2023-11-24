import { ReactElement } from "react";
import { formValuesTypes } from "@/app/create/page";
import Image from "next/image";

type HypercertProps = {
  formValues: formValuesTypes;
};

export default function Hypercert({
  formValues,
}: HypercertProps): ReactElement {
  const { projectName, bannerImage, logo, startDate, endDate, scopeTags } =
    formValues;

  const tags: string[] = scopeTags.split(",");

  const isValidURL = (url: string) => {
    const urlPattern = /^(https):\/\/[^ "]+$/;
    return urlPattern.test(url);
  };

  return (
    <div
      style={
        isValidURL(bannerImage)
          ? {
              backgroundImage: `url(${bannerImage})`,
              position: "sticky",
              top: "1em",
            }
          : {}
      }
      className={`w-[95%] p-2 flex flex-col items-center rounded-3xl overflow-hidden justify-around
       gap-3 text-base-100 md:w-[90%] lg:w-1/3 max-w-[250px] sticky lg:top-4 h-[330px] shadow-xl m-2
          ${
            isValidURL(bannerImage)
              ? `bg-no-repeat bg-center bg-cover`
              : "bg-gradient-to-b from-gray-800 to-gray-900"
          }
        `}
    >
      <div
        style={{
          backgroundColor: "#666",
          backgroundImage: `url(${logo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="w-12 h-12 bg-gray-600 rounded-full absolute top-6 left-4"
      ></div>
      <div className="text-center space-y-2 absolute inset-0 bg-gradient-to-b from-transparent to-black flex flex-col justify-end p-3">
        <h1 className="text-xl mt-2 font-bold border-b-2 border-solid border-gray-500 pb-3">
          {projectName}
        </h1>
        <div className="flex justify-evenly text-sm text-slate-400 border-b-2 border-solid border-gray-500 pb-3">
          <h2>
            <span className="font-bold">From:</span> {startDate}
          </h2>
          <h2>
            <span className="font-bold">To:</span> {endDate}
          </h2>
        </div>
        <div className="flex justify-center flex-wrap gap-1 p-1">
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
