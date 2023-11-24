import { formValuesTypes } from "@/app/create/page";
import Link from "next/link";
import { ReactNode } from "react";

type ProjectCardProps = {
  projectMetadata: formValuesTypes;
  currentAmount?: number;
};

export default function ProjectCard({
  projectMetadata,
  currentAmount,
}: ProjectCardProps): ReactNode {
  const {
    projectName,
    bannerImage,
    logo,
    description,
    amount,
    startDate,
    endDate,
    contributors,
  } = projectMetadata;

  const contributedAmount = currentAmount || 0;

  return (
    <div className="card card-compact md:card-normal w-full bg-gray-900  shadow-xl overflow-hidden group relative">
      <Link href={"#"}>
        <figure
          className="w-full h-44"
          style={{
            backgroundImage: `url(${bannerImage})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        ></figure>
        <div className="card-body relative">
          <span
            className="h-12 w-12 absolute -top-6 right-4 rounded-full"
            style={{
              backgroundImage: `url(${logo})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          ></span>
          <h2 className="card-title">{projectName}</h2>
          <h2 className="-mt-2 text-green-300">
            <span className="font-bold">By:</span>{" "}
            {contributors?.split(",").join(", ")}
          </h2>
          <h3 className="text-slate-400 text-sm -mt-2 mb-2">
            {startDate} - {endDate}
          </h3>
          <p className="line-clamp-2 text-sm">{description}</p>
          <div className="flex justify-center items-center mt-2 gap-2">
            <progress
              className="progress progress-primary w-56 mx-auto"
              value={contributedAmount}
              max={amount}
            ></progress>
            <span>{Math.round((contributedAmount / amount) * 100)}%</span>
          </div>
          <div className="card-actions justify-end">
            <button className="btn btn-primary relative w-full -bottom-24 group-hover:bottom-0 transition-all mt-3 hover-enabled">
              Donate
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
