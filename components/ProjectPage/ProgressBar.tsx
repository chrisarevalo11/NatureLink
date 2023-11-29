import { ReactNode } from "react";

type ProgressBarProps = {
  currentAmount: number;
  RequiredAmount: number;
};

export default function ProgressBar({
  currentAmount,
  RequiredAmount,
}: ProgressBarProps): ReactNode {
  return (
    <div className="flex flex-col items-center gap-2 w-full my-4">
      <div className="w-full flex justify-center relative">
        <progress
          className="progress progress-primary w-full md:w-[90%] h-5"
          value={currentAmount}
          max={RequiredAmount}
        ></progress>
        <h3 className="absolute top-[-3px] font-bold">
          {Math.round((currentAmount / RequiredAmount) * 100)}%
        </h3>
      </div>
      <div className="flex w-full md:w-[90%] justify-between items-center">
        <h3>Raised: {currentAmount}</h3>
        <h3 className="text-primary text-lg font-bold">
          Goal: {RequiredAmount}
        </h3>
      </div>
    </div>
  );
}
