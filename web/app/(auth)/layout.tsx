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
  IoChatboxEllipsesOutline,
  IoChatboxEllipses  
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
      <aside className="w-[13%] bg-navbarColor p-2 fixed h-[96%] md:ml-[7rem] lg:ml-[10rem] mt-3 rounded-lg hidden md:block">
        <nav>
          <img src="/images/logo.png" alt="Logo" className="mt-8 mb-12" />

          <div className="flex flex-col items-center justify-center mb-10">
            <Link
              href={"/homepage"}
              className="group flex flex-col items-center justify-center"
            >
              <IoHomeOutline
                size={45}
                color="white"
                className="group-hover:hidden"
              />
              <IoHome
                size={45}
                className="hidden group-hover:block text-resedaGreen"
              />
              <p className="text-center text-[#ffffff] group-hover:text-resedaGreen">
                Home
              </p>
            </Link>
          </div>

          <div className="flex flex-col items-center justify-center mb-10">
            <Link
              href={"/progress"}
              className="group flex flex-col items-center justify-center"
            >
              <IoBarChartOutline
                size={45}
                color="white"
                className="group-hover:hidden"
              />
              <IoBarChart
                size={45}
                className="hidden group-hover:block text-resedaGreen"
              />
              <p className="text-center text-[#ffffff] group-hover:text-resedaGreen">
                Progress
              </p>
            </Link>
          </div>

          <div className="flex flex-col items-center justify-center mb-10">
            <Link
              href={"/profile"}
              className="group flex flex-col items-center justify-center"
            >
              <IoPersonOutline
                size={45}
                color="white"
                className="group-hover:hidden"
              />
              <IoPerson
                size={45}
                className="hidden group-hover:block text-resedaGreen"
              />
              <p className="text-center text-[#ffffff] group-hover:text-resedaGreen">
                Profile
              </p>
            </Link>
          </div>

          <div className="flex flex-col items-center justify-center mb-10">
            <Link
              href={"/chat"}
              className="group flex flex-col items-center justify-center"
            >
              <IoChatboxEllipsesOutline
                size={45}
                color="white"
                className="group-hover:hidden"
              />
              <IoChatboxEllipses
                size={45}
                className="hidden group-hover:block text-resedaGreen"
              />
              <p className="text-center text-[#ffffff] group-hover:text-resedaGreen">
                Chat
              </p>
            </Link>
          </div>

          <div className="flex flex-col items-center justify-center">
            <button
              className="bg-resedaGreen text-gray-100 md:w-20 lg:w-24 py-2 rounded-full transition-transform duration-200 hover:scale-110 flex justify-center"
              onClick={() => {
              localStorage.clear();
              console.log("Sign out");
              router.push("/")
              }}
            >
              <p className="hidden md:block">Sign out</p>
            </button>
          </div>
        </nav>
      </aside>

      <nav className="md:hidden w-full z-50 fixed bottom-0 flex flex-row gap-12 sm:gap-16 bg-navbarColor justify-center items-center h-24">
        <div>
          <Link
            href={"/homepage"}
            className="group flex flex-col items-center justify-center"
          >
            <IoHomeOutline
              size={38}
              color="white"
              className="group-hover:hidden"
            />
            <IoHome
              size={38}
              className="hidden group-hover:block text-resedaGreen"
            />
            <p className="text-center text-[#ffffff] group-hover:text-resedaGreen">
              Home
            </p>
          </Link>
        </div>

        <div className="flex flex-col items-center justify-center">
          <Link
            href={"/progress"}
            className="group flex flex-col items-center justify-center"
          >
            <IoBarChartOutline
              size={38}
              color="white"
              className="group-hover:hidden"
            />
            <IoBarChart
              size={38}
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
              size={38}
              color="white"
              className="group-hover:hidden"
            />
            <IoPerson
              size={38}
              className="hidden group-hover:block text-resedaGreen"
            />
            <p className="text-center text-[#ffffff] group-hover:text-resedaGreen">
              Profile
            </p>
          </Link>
        </div>

        <div className="flex flex-col items-center justify-center">
          <Link
            href={"/chat"}
            className="group flex flex-col items-center justify-center"
          >
            <IoChatboxEllipsesOutline
              size={38}
              color="white"
              className="group-hover:hidden"
            />
            <IoChatboxEllipses
              size={38}
              className="hidden group-hover:block text-resedaGreen"
            />
            <p className="text-center text-[#ffffff] group-hover:text-resedaGreen">
              Chat
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

      <main className="w-full md:ml-[10rem] lg:ml-[15rem] overflow-x-hidden pb-20 md:pb-0">{children}</main>
    </div>
  );
}