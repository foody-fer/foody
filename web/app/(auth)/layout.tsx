import Link from "next/link";
import React from "react";
import {
  IoHomeOutline,
  IoBarChartOutline,
  IoPersonOutline,
  IoHome,
  IoBarChart,
  IoPerson,
} from "react-icons/io5";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-backgroundGreen">
      <aside className="w-[13%] bg-navbarColor p-2 fixed h-[96%] ml-3 sm:ml-8 mt-3 rounded-lg">
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

      <main className="w-full ml-[23%] overflow-x-hidden">{children}</main>
    </div>
  );
}
