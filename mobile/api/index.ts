import AsyncStorage from "@react-native-async-storage/async-storage";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export const apiCall = async (url: string, options: RequestInit = {}) => {
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
    console.log("OK request");
    return await res.json();
  }

  throw [res.status, await res.text()];
};
