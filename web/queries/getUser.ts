import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { apiCall } from "~/api";

export const useGetUser = () => {
  const router = useRouter();
  return useQuery({
    queryKey: ["user"],
    retry: false,
    queryFn: async () => {
      const [data, status] = await apiCall(`/auth`, { method: "GET" });
      if (status !== 200) {
        localStorage.removeItem("token");

        router.push("/sign-in");
        return null;
      }

      return data;
    },
  });
};
