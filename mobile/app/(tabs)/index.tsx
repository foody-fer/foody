import { useQuery } from "@tanstack/react-query";
import { Text } from "react-native";

export default function HomeScreen() {
  const query = useQuery({
    queryKey: ["test"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return await fetch(`https://jsonplaceholder.typicode.com/users`).then(
        (res) => res.json()
      );
    },
  });

  if (query.isLoading) return <Text>loading</Text>;
  if (query.isError) return <Text>error</Text>;

  return <Text>hello from test {JSON.stringify(query.data)}</Text>;
}
