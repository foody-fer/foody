"use client";

import { useQuery } from "@tanstack/react-query";
import Feed from "../../components/Feed";
import AddPost from "../../components/addPost";
import { useState } from "react";
import { apiCall } from "~/api";

export default function Homepage() {
  const posts = useQuery({
    queryKey: ["posts"],
    queryFn: () => apiCall(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts`, { method: "GET"}),
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
  
  return (
    <div className="text-textColor bg-backgroundGreen">
      <div className="flex flex-col gap-2 ml-[3%] sm:ml-[15%] pt-3 w-full">
        <AddPost posts={posts}/>
        <Feed posts={posts}/>
      </div>
    </div>
  );
}
