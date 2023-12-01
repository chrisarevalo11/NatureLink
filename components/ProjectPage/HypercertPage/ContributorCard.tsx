import Link from "next/link";
import { ReactElement } from "react";

export default function ContributorCard(): ReactElement {
  return (
    <Link
      href="/profile"
      className="bg-gray-800 hover:bg-gray-700 transition-all p-2 rounded-lg flex items-center gap-3"
    >
      <figure
        style={{
          backgroundImage: `url(/images/placeholder.jpg)`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className="w-12 h-12 rounded-full"
      ></figure>
      <div className="flex flex-col items-start gap-1">
        <h2 className="font-bold text-sm lg:text-md">0x13db...24d7</h2>
        <span className="text-xs lg:text-sm line-clamp-1 text-gray-500">
          25% contributed
        </span>
      </div>
    </Link>
  );
}
