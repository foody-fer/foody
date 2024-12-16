"use client";

import Logo from "./components/Logo";
import Login from "./components/Login";

export default function Home() {
  return (
    <>
        <div className="bg-backgroundGreen min-h-screen">
          <div className="flex">
            <div className=" w-[50%] mt-28 flex items-center justify-center">
              <Logo/>
            </div>

            <div className="w-[50%] mt-32 flex flex-col items-center justify-center">
              <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-textColor mb-2">Join our community!</h1>
              <Login/>
            </div>
          </div>
        </div>
    </>
  );
}