import AsyncStorage from "@react-native-async-storage/async-storage";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export const apiCall = async <T = any>(
  url: string,
  options: RequestInit = {}
) => {
  const token = await AsyncStorage.getItem("token");
  const res = await fetch(`https://foody-backend.zeko.run/api/v1${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
    },
  });

  if (res.status === 401 && token) {
    await AsyncStorage.removeItem("token");
  }

  if (res.ok) {
    return (await res.json()) as T;
  }

  throw [res.status, await res.text()];
};
