import ExploreTabs from "@/components/ExplorePage/ExploreTabs";
import { ReactNode } from "react";

export default function Create(): ReactNode {
  return (
    <section className="flex flex-col items-center my-3 w-full">
      <ExploreTabs />
    </section>
  );
}
