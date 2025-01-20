"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import {
  IoHomeOutline,
  IoBarChartOutline,
  IoPersonOutline,
  IoHome,
  IoBarChart,
  IoPerson,
} from "react-icons/io5";
import { useGetUser } from "~/queries/getUser";
import { FaSignOutAlt } from "react-icons/fa";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userQuery = useGetUser();
  const router = useRouter();

  if (userQuery.isLoading) {
    return (
      <div className="flex flex-col gap-1 justify-center items-center bg-backgroundGreen min-h-screen text-gray-600">
        <div className="spinner-border border-2" role="status" />
        <h1>Loading...</h1>
      </div>
    );
  }

  if (userQuery.isError || !userQuery.data) {
    return (
      <div className="flex flex-col gap-1 justify-center items-center bg-backgroundGreen min-h-screen text-gray-600">
        <div className="spinner-border border-2" role="status" />
        <h1>Error...</h1>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-backgroundGreen">
      <aside className="w-[13%] bg-navbarColor p-2 fixed h-[96%] ml-3 sm:ml-8 mt-3 rounded-lg">
        <nav>
          <img src="/images/logo.png" alt="Logo" className="mt-8 mb-20" />

          <div className="flex flex-col items-center justify-center mb-16">
            <Link
              href={"/homepage"}
              className="group flex flex-col items-center justify-center"
            >
              <IoHomeOutline
                size={50}
                color="white"
                className="group-hover:hidden"
              />
              <IoHome
                size={50}
                className="hidden group-hover:block text-resedaGreen"
              />
              <p className="text-center text-[#ffffff] group-hover:text-resedaGreen">
                Home
              </p>
            </Link>
          </div>

          <div className="flex flex-col items-center justify-center mb-16">
            <Link
              href={"/progress"}
              className="group flex flex-col items-center justify-center"
            >
              <IoBarChartOutline
                size={50}
                color="white"
                className="group-hover:hidden"
              />
              <IoBarChart
                size={50}
                className="hidden group-hover:block text-resedaGreen"
              />
              <p className="text-center text-[#ffffff] group-hover:text-resedaGreen">
                Progress
              </p>
            </Link>
          </div>

          <div className="flex flex-col items-center justify-center mb-8">
            <Link
              href={"/profile"}
              className="group flex flex-col items-center justify-center"
            >
              <IoPersonOutline
                size={50}
                color="white"
                className="group-hover:hidden"
              />
              <IoPerson
                size={50}
                className="hidden group-hover:block text-resedaGreen"
              />
              <p className="text-center text-[#ffffff] group-hover:text-resedaGreen">
                Profile
              </p>
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center">
            <button
              className="bg-resedaGreen text-gray-100 w-10 md:w-20 lg:w-28 py-2 rounded-full transition-transform duration-200 hover:scale-110 flex justify-center"
              onClick={() => {
              localStorage.clear();
              console.log("Sign out");
              router.push("/")
              }}
            >
              <p className="hidden md:block">Sign out</p>
              <FaSignOutAlt className="block md:hidden m-1 w-5 h-5"/>
            </button>
          </div>
        </nav>
      </aside>

      <main className="w-full ml-[23%] overflow-x-hidden">{children}</main>
    </div>
  );
}
