import { ReactElement } from "react";

export default function PostHeader({
  userHandle,
}: {
  userHandle: string;
}): ReactElement {
  return (
    <div className="flex justify-start items-center gap-3">
      <div className="avatar">
        <div className="w-10 md:w-12 bg-green400 rounded-full">
          {/* <Image /> */}
        </div>
      </div>
      <h2 className="font-semibold">@{userHandle}</h2>
    </div>
  );
}
