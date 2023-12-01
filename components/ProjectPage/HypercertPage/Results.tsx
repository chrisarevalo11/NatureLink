import { ReactNode } from "react";

export default function Results(): ReactNode {
  return (
    <section id="results" className="my-5">
      <h1 className="text-3xl font-bold text-center">Results</h1>
      <p className="my-10 text-center text-lg text-gray-500">
        Results not submitted yet
      </p>
    </section>
  );
}
