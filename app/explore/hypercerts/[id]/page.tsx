import { ReactNode } from "react";

export default function Page({
  params,
}: {
  params: { id: string };
}): ReactNode {
  const { id } = params;
  return <h1>My hypercert id is {id}</h1>;
}
