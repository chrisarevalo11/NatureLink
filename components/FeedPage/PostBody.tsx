import { ReactElement } from "react";

type PostCardProps = {
  postContent: string;
  postMedia?: string[];
};

export default function PostBody({
  postContent,
  postMedia,
}: PostCardProps): ReactElement {
  return (
    <div className="m-2">
      {postContent}
      <div>{postMedia}</div>
    </div>
  );
}
