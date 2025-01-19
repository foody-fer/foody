import { useQuery } from "@tanstack/react-query";
import { apiCall } from ".";

export const useAuth = () => {
  return useQuery({
    queryKey: ["auth"],
    queryFn: () => {
      return apiCall<null | {
        id: number;
        username: string;
        first_name: string;
        last_name: string;
        gender: string;
        avatar: null | string;
      }>("/auth");
    },
  });
};
