import { ReactElement } from "react";
import Image from "next/image";

export default function FeedProfileCard(): ReactElement {
  return (
    <div className="hidden md:block md:w-1/4 h-fit bg-gray-900 p-2 rounded-lg sticky top-3">
      <div className="space-y-2">
        <Image
          alt="Profile Picture"
          className="rounded-full object-cover mx-auto"
          height="100"
          src="/images/placeholder.jpg"
          width="100"
        />
        <h2 className="text-xl font-bold text-center">User Name</h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm text-center">
          Bio: This is a user bio
        </p>
        <div className="text-center">
          <p className="font-bold text-sm">
            50 <span className="font-normal">Posts</span>
          </p>
          <p className="font-bold text-sm">
            200 <span className="font-normal">Followers</span>
          </p>
          <p className="font-bold text-sm">
            300 <span className="font-normal">Following</span>
          </p>
        </div>
      </div>
    </div>
  );
}
