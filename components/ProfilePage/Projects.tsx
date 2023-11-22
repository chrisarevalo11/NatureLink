import { ReactElement, useState } from "react";

export default function Projects(): ReactElement {
  const [projects, setProjects] = useState([]);

  if (!projects.length) {
    return <h1 className="text-gray-700">There are no projects yet</h1>;
  }

  return <div className="space-y-2 w-full"></div>;
}
