import Link from "next/link";
import { ReactElement } from "react";
import { FaLink } from "react-icons/fa";

type ProjectHeaderProps = {
  logo: string;
  link: string;
  contributors: string;
};

export default function ProjectHeader({
  logo,
  link,
  contributors,
}: ProjectHeaderProps): ReactElement {
  return (
    <header className="flex items-center my-2 justify-between">
      <div className="flex items-center gap-3">
        <div
          style={{
            backgroundImage: `url(${logo})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          className="w-12 h-12 rounded-full"
        ></div>
        <h2 className="text-green-300 line-clamp-1">
          By{" "}
          <span className="font-bold">
            {contributors?.split(",").join(", ")}
          </span>
        </h2>
      </div>
      <Link
        href={link}
        target="_blank"
        className="btn btn-link hover:text-primary"
        rel="noreferrer"
      >
        <FaLink />
        website
      </Link>
    </header>
  );
}
