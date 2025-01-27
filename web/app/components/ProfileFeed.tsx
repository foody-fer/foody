import { useEffect, useState } from "react";
import Post from "./Post";
import { useQuery } from "@tanstack/react-query";
import { apiCall } from "~/api";
import { useGetUser } from "~/queries/getUser";

export default function ProfileFeed({ tab }: any) {
  const userQuery = useGetUser();
  const saved_posts = useQuery({
    queryKey: ["saved_posts"],
    queryFn: () => apiCall(`/saved_posts`, { method: "GET" }),
    refetchOnWindowFocus: true, // Ažuriranje podataka kad se ponovo fokusira prozor
    staleTime: 0, // Podaci će biti uvijek svježi
  });

  const user_posts = useQuery({
    queryKey: ["user_posts"],
    queryFn: () => apiCall(`/posts`, { method: "GET" }),
    refetchOnWindowFocus: true, // Ažuriranje podataka kad se ponovo fokusira prozor
    staleTime: 0, // Podaci će biti uvijek svježi
    select: (data) => {
      // Filtriraj podatke na klijentu (npr. samo objave koje imaju više od 100 lajkova)
      return data?.[0].filter((post:any) => post.user.username === userQuery.data.username);
    },
  });

  return (
    <div className="w-[94%] sm:w-[70%] md:w-[62%] lg:w-[50%] h-auto rounded-lg flex flex-col justify-center items-center pt-3 mb-3">
      {tab === "My posts" &&
        (user_posts.data?.length > 0 ? (
          user_posts.data?.map((post: any) => (
            <Post
              info={post}
              key={post.id}
              preview={false}
              posts={user_posts}
            />
          ))
        ) : (
          <p>No posts available.</p>
        ))}
      {tab === "Saved posts" &&
        (saved_posts.data?.[0].length > 0 ? (
          saved_posts.data?.[0].map((post: any) => (
            <Post
              info={post.post}
              key={post.post.id}
              preview={false}
              posts={saved_posts}
            />
          ))
        ) : (
          <p>No posts available.</p>
        ))}
    </div>
  );
}
