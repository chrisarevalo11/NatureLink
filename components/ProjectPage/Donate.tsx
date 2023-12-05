import { ReactNode } from "react";
import DonationForm from "./DonationForm";
import ProgressBar from "./ProgressBar";

type DonateProps = {
  RequiredAmount: number;
};

export default function Donate({ RequiredAmount }: DonateProps): ReactNode {
  const currentAmount: number = 11000;

  return (
    <div className="w-full flex flex-col gap-5">
      <h1 className="text-3xl font-bold text-center">Donate</h1>
      <DonationForm />
      <ProgressBar
        currentAmount={currentAmount}
        RequiredAmount={RequiredAmount}
      />
    </div>
  );
}
