import { useEffect, useState } from "react";
import Post from "./Post";
import { useQuery } from "@tanstack/react-query";
import { apiCall } from "~/api";

export default function Feed({ posts } : any) {
  return (
    <div className="w-[94%] sm:w-[70%] md:w-[62%] lg:w-[43%] h-auto rounded-lg flex flex-col justify-center items-center pt-3 mb-3">
      {posts.data?.[0].length > 0 ? (
        posts.data?.[0].map((post: any) => (
          <Post
            info={post}
            key={post.id}
            preview={false}
            posts={posts}
          />
        ))
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
}
