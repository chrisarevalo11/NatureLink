import { Fragment, ReactNode } from "react";

type ProjectTagsProps = {
  scopeTags: string;
};

export default function ProjectTags({
  scopeTags,
}: ProjectTagsProps): ReactNode {
  const tags: string[] = scopeTags?.split(",");

  return (
    <Fragment>
      {scopeTags && <h2 className="font-bold text-xl mt-2">Tags:</h2>}
      <div className="flex flex-wrap gap-1 p-1">
        {scopeTags &&
          tags.map(
            (tag) =>
              tag && (
                <div key={tag} className="badge badge-neutral">
                  {tag}
                </div>
              )
          )}
      </div>
    </Fragment>
  );
}
