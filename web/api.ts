export const apiCall = (url: string, options: RequestInit) => {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      ...(localStorage.getItem("token")
        ? { Authorization: `Bearer ${localStorage.getItem("token")}` }
        : {}),
    },
  }).then(async (res) => [await res.json(), res.status] as const);
};
