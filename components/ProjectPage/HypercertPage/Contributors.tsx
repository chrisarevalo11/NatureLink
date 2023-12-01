import { Fragment, ReactNode } from "react";
import ContributorCard from "./ContributorCard";

export default function Contributors(): ReactNode {
  return (
    <Fragment>
      <h1 className="text-3xl font-bold text-center m-2">Contributors</h1>
      <div className="w-full md:w-[90%] mx-auto grid grid-cols-2 max-h-44 overflow-scroll no-scrollbar gap-2 bg-gray-900 p-1 rounded-xl">
        <ContributorCard />
        <ContributorCard />
        <ContributorCard />
        <ContributorCard />
        <ContributorCard />
        <ContributorCard />
        <ContributorCard />
        <ContributorCard />
      </div>
    </Fragment>
  );
}
