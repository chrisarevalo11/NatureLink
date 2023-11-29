import { ReactNode } from "react";

export default function Apply(): ReactNode {
  return (
    <div className="flex flex-col gap-3 justify-center">
      <h1 className="text-3xl font-bold text-center">Apply as evaluator</h1>
      <p className="text-sm py-2">
        You can apply as an evaluator for this project. In case you are selected
        (notification via email) you will be able to audit the project. Once the
        evaluation is committed, you will receive a compensation and an NFT that
        certifies your evaluation.
      </p>
      <button className="btn btn-primary btn-wide self-center"> Apply</button>
    </div>
  );
}
