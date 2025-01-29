import type { NextConfig } from "next";

const getFrontendUrl = () => {
  if (process.env.VERCEL_URL) {
    if (process.env.VERCEL_ENV === "production") {
      return `https://foody.zeko.run`;
    }

    return `https://${process.env.VERCEL_URL}`;
  }

  return `http://localhost:${process.env.PORT || 3000}`;
};

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_FRONTEND_URL: getFrontendUrl(),
  },
};

export default nextConfig;
