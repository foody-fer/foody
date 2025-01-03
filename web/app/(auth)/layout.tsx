"use client";

import Link from "next/link";
import React from "react";
import {
  IoBarChart,
  IoBarChartOutline,
  IoHome,
  IoHomeOutline,
  IoPerson,
  IoPersonOutline,
} from "react-icons/io5";
import { useGetUser } from "~/queries/getUser";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userQuery = useGetUser();
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
      <aside className="w-[13%] bg-navbarColor p-2 fixed h-full ml-8 mt-3 rounded-lg">
        <nav>
          <img src="/images/logo.png" alt="Logo" className="mt-10 mb-28" />

          <div className="flex flex-col items-center justify-center mb-24">
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

          <div className="flex flex-col items-center justify-center mb-24">
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

          <div className="flex flex-col items-center justify-center">
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
        </nav>
      </aside>

      <main className="w-full ml-[23%] overflow-y-auto">{children}</main>
    </div>
  );
}
