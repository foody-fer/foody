"use client";

import { useQuery } from "@tanstack/react-query";
import Feed from "../../components/Feed";
import AddPost from "../../components/addPost";
import { useEffect, useState } from "react";
import { apiCall } from "~/api";

export default function Homepage() {
  const posts = useQuery({
    queryKey: ["posts"],
    queryFn: () => apiCall(`/posts`, { method: "GET" }),
    refetchOnWindowFocus: true, // Ažuriranje podataka kad se ponovo fokusira prozor
    staleTime: 0, // Podaci će biti uvijek svježi
  });
  console.log(posts.data);

  const [scroll, setScroll] = useState(true)

  useEffect(()=>{console.log(scroll);
  }, [scroll])

  if (posts.isLoading) {
    return (
      <div className="flex flex-col gap-1 justify-center items-center bg-backgroundGreen min-h-screen text-gray-600">
        <div className="spinner-border border-2" role="status" />
        <h1>Loading...</h1>
      </div>
    ); // Prikaz za vrijeme učitavanja
  }

  if (posts.isError) {
    return <div>Error loading posts: {posts.error.message}</div>; // Prikaz greške
  }

  return (
    <div className={"text-textColor bg-backgroundGreen "+ (scroll ? "pb-20 md:pb-0" : "overflow-hidden h-screen")}>
      <div className="flex flex-col gap-2 lg:ml-[-10%] pt-3 w-full items-center">
        <AddPost posts={posts} unable={setScroll}/>
        <Feed posts={posts} />
      </div>
    </div>
  );
}
