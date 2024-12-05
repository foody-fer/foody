"use client";

import { useQuery } from "@tanstack/react-query";

export default function Home({ params }:any) {
  const query = useQuery({
    queryKey: ["test", params.username],
    queryFn: async () => {
      return await fetch(`https://jsonplaceholder.typicode.com/users`).then(
        (res) => res.json()
      );
    },
  });

  if (query.isLoading) return <div>loading</div>;
  if (query.isError) return <div>error</div>;

  return <div>hello from test {JSON.stringify(query.data)}</div>;
}
