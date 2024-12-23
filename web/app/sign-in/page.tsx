"use client";

import Logo from "../components/Logo";
import Login from "../components/Login";
import SignIn from "../components/SignIn";

export default function Home() {
  return (
    <>
        <div className="bg-backgroundGreen min-w-screen min-h-screen blur-[7px]">
          <div className="flex">
            <div className=" w-[50%] mt-24 flex items-center justify-center">
              <Logo/>
            </div>

            <div className="w-[50%] mt-36 flex flex-col items-center justify-center">
              <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-textColor mb-2">Join our community!</h1>
              <Login disabled={true}/>
            </div>
          </div>
        </div>

        <SignIn/>
    </>
  );
}