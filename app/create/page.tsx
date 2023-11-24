"use client";

import React, { ReactNode, useState } from "react";
import ProjectForm from "@/components/CreateProjectPage/ProjectForm";
import Hypercert from "@/components/CreateProjectPage/Hypercert";

export type formValuesTypes = {
  projectName: string;
  bannerImage: string;
  logo: string;
  description?: string;
  link: string;
  amount: number;
  startDate: string;
  endDate: string;
  scopeTags: string;
  contributors?: string;
};

export default function Create(): ReactNode {
  const [formValues, setFormValues] = useState<formValuesTypes>({
    projectName: "",
    bannerImage: "",
    logo: "",
    description: "",
    link: "",
    amount: 0,
    startDate: "",
    endDate: "",
    scopeTags: "",
    contributors: "",
  });

  return (
    <section className="flex flex-col justify-evenly items-center my-3 w-full gap-4 md:gap-8">
      <h1 className="text-green400 font-bold text-4xl md:text-5xl my-3 text-center">
        Create a project
      </h1>
      <div className="flex flex-col-reverse gap-5 lg:gap-0 w-full lg:flex-row justify-evenly items-center lg:items-start">
        <ProjectForm formValues={formValues} setFormValues={setFormValues} />
        <Hypercert formValues={formValues} />
      </div>
    </section>
  );
}
