export const apiCall = (url: `/${string}`, options: RequestInit = {}) => {
  return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1${url}`, {
    ...options,
    headers: {
      ...options.headers,
      ...(localStorage.getItem("token")
        ? { Authorization: `Bearer ${localStorage.getItem("token")}` }
        : {}),
    },
  }).then(async (res) => {
    let data = null;
    if (res.status !== 204) {
      try {
        data = await res.json();
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }
    return [data, res.status] as const;
  });
};
