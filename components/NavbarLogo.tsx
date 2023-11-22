import React from "react";
import Image from "next/image";
import { kdam } from "@/styles/fonts";
import Link from "next/link";

export default function NavbarLogo(): React.ReactElement {
  return (
    <Link href={"/"} className="grow">
      <div className="flex items-center gap-2">
        <Image src={"/images/logo.svg"} alt="logo" width={40} height={40} />
        <h1
          className={`hidden text-green400 ${kdam.className} md:block text-2xl`}
        >
          NatureLink
        </h1>
      </div>
    </Link>
  );
}
