import { useEffect, useState } from "react";
import Post from "./Post";
import { useQuery } from "@tanstack/react-query";
import { apiCall } from "~/api";

export default function Feed() {
  const posts = useQuery({
    queryKey: ["posts"],
    queryFn: () => apiCall(`${process.env.NEXT_PUBLIC_API_URL}/posts`, { method: "GET"}),
    refetchOnWindowFocus: true, // Ažuriranje podataka kad se ponovo fokusira prozor
    staleTime: 0, // Podaci će biti uvijek svježi
  });
  console.log(posts.data);
  
  if (posts.isLoading) {
    return <div>Loading...</div>; // Prikaz za vrijeme učitavanja
  }

  if (posts.isError) {
    return <div>Error loading posts: {posts.error.message}</div>; // Prikaz greške
  }

  const update = () => {
    posts.refetch();
  };

  const deletePost = async (id: any) => {
    const response = await apiCall(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`,
      {
        method: "DELETE",
      }
    );
    console.log(response);

    posts.refetch();
  };

  return (
    <div className="w-[94%] sm:w-[70%] md:w-[62%] lg:w-[46%] h-auto rounded-lg flex flex-col justify-center items-center pt-3 mb-3">
      {posts.data?.[0].length > 0 ? (
        posts.data?.[0].map((post: any) => (
          <Post
            info={post}
            key={post.id}
            preview={false}
            posts={posts}
            update={update}
            deletePost={deletePost}
          />
        ))
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
}
