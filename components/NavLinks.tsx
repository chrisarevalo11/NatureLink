import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dispatch, ReactElement, SetStateAction } from "react";

function NavLink({ text, href }: link): ReactElement {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link
      className={`hover:text-emerald-800 transition-all ${
        isActive && "text-emerald-900 pointer-events-none"
      }`}
      href={href}
    >
      <li>{text}</li>
    </Link>
  );
}

type ResponsiveNavLinkProps = {
  text: string;
  href: string;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

function ResponsiveNavLink({
  text,
  href,
  setIsSidebarOpen,
}: ResponsiveNavLinkProps): ReactElement {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link
      className={`hover:text-emerald-800 transition-all ${
        isActive && "text-emerald-900 pointer-events-none"
      }`}
      href={href}
      onClick={() => setIsSidebarOpen(false)}
    >
      <li>{text}</li>
    </Link>
  );
}

type NavLinksResponsiveProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

export function NavLinksResponsive({
  isSidebarOpen,
  setIsSidebarOpen,
}: NavLinksResponsiveProps): ReactElement {
  return (
    <ul
      className={`absolute z-[10] h-[100vh] inset-0 flex flex-col items-center justify-center gap-20 shadow bg-gray-950 text-primary font-bold rounded-box transition-all ${
        isSidebarOpen ? "top-0" : "-top-full"
      }`}
    >
      {links.map((item) => (
        <ResponsiveNavLink
          setIsSidebarOpen={setIsSidebarOpen}
          key={item.text}
          text={item.text}
          href={item.href}
        />
      ))}
      <button onClick={() => setIsSidebarOpen(false)}>✖️</button>
    </ul>
  );
}

export default function NavLinks(): ReactElement {
  return (
    <ul className="hidden lg:flex flex-row items-center gap-3 mx-7 grow font-bold text-green400">
      {links.map((item) => (
        <NavLink key={item.text} text={item.text} href={item.href} />
      ))}
    </ul>
  );
}

type link = {
  text: string;
  href: string;
};

const links: link[] = [
  {
    text: "Home",
    href: "/home",
  },
  {
    text: "Create",
    href: "/create",
  },
  {
    text: "Explore",
    href: "/explore",
  },
  {
    text: "Profile",
    href: "/profile",
  },
];
