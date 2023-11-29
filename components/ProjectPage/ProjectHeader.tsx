import { ReactElement } from "react";

type ProjectHeaderProps = {
  logo: string;
  contributors: string;
};

export default function ProjectHeader({
  logo,
  contributors,
}: ProjectHeaderProps): ReactElement {
  return (
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
        <span className="font-bold">{contributors?.split(",").join(", ")}</span>
      </h2>
    </header>
  );
}
