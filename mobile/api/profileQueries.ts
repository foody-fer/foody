import { useQuery } from "@tanstack/react-query";
import { apiCall } from ".";

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => apiCall("/auth"),
  });
};

export const usePosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: () => apiCall("/posts"),
  });
};

export const useRecipes = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: () => apiCall("/posts"), //kasnije promijeniti u recipes
  });
};
