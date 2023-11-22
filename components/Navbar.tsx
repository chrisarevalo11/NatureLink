"use client";

import { ConnectWallet } from "@thirdweb-dev/react";
import Logo from "./NavbarLogo";
import NavLinks, { NavLinksResponsive } from "./NavLinks";
import Image from "next/image";

export default function Component() {
  return (
    <nav className="navbar bg-gray-900 lg:min-w-fit lg:w-[60%] lg:max-w-[850px] pe-4 ps-4 lg:rounded-full mx-auto flex justify-around ">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <Image
              className=""
              src={"/images/burger.svg"}
              alt="bars"
              width={20}
              height={20}
            />
          </label>
          <NavLinksResponsive />
        </div>
        <Logo />
      </div>
      <div className="navbar-center hidden lg:flex">
        <NavLinks />
      </div>
      <div className="navbar-end">
        <ConnectWallet
          theme={"dark"}
          modalSize={"compact"}
          btnTitle={"Connect Wallet"}
          modalTitleIconUrl={""}
          style={{
            borderRadius: "100px",
            backgroundColor: "#73c358",
          }}
        />
      </div>
    </nav>
  );
}
