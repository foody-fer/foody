"use client";

import Logo from "../components/Logo";
import Login from "../components/Login";
import SignIn from "../components/SignIn";
import { use } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const params = use(searchParams);
  const router = useRouter();

  useEffect(() => {
    if (params.token) {
      localStorage.setItem("token", params.token);
      router.push("/homepage");
    }
  }, [params.token, router]);

  return (
    <>
      <div className="bg-backgroundGreen min-h-screen flex justify-center items-center blur-[7px]">
        <div className="flex">
          <div className="w-[50%] flex items-center justify-center">
            <Logo />
          </div>

          <div className="w-[50%] flex flex-col items-center justify-center">
            <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-textColor mb-2">
              Join our community!
            </h1>
            <Login disabled={true} />
          </div>
        </div>
      </div>

      <SignIn />
    </>
  );
}
