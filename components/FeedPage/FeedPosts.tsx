import { ReactElement } from "react";
import PostCard from "./PostCard";
import ShareAPost from "./ShareAPost";

export default function FeedPosts(): ReactElement {
  return (
    <div className="w-full md:w-1/2 bg-gray-900 p-2 rounded-lg overflow-auto">
      <div className="space-y-2">
        <ShareAPost />
        <PostCard
          userHandle="chris-arevalo"
          postContent="sssss"
          likes={30}
          postMedia={["img1", "ime1"]}
        />
        <PostCard
          userHandle="chris-arevalo"
          postContent="sssss"
          likes={30}
          postMedia={["img1", "ime1"]}
        />
        <PostCard
          userHandle="chris-arevalo"
          postContent="sssss"
          likes={30}
          postMedia={["img1", "ime1"]}
        />
      </div>
    </div>
  );
}
