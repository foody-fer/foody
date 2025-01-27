"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsPlusCircle, BsFillPlusCircleFill } from "react-icons/bs";
import { FaChevronRight } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { apiCall } from "~/api";

interface User {
  id: any;
  avatar: string | null;
  bio: string | null;
  first_name: string;
  gender: string;
  last_name: string;
  username: string;
}

interface Group {
  id: number;
  name: string;
  image: string | null;
  is_dm: boolean;
  members: User[];
  created_at: string;
  updated_at: string;
  messages: any;
}

export default function Chatpage() {
  const [groups, setGroups] = useState<Group[]>([]);

  console.log(groups);
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await apiCall(`/chat_groups`, {
          method: "GET",
        });

        const groupsWithMessages = await Promise.all(
          response[0].map(async (group: any) => {
            const messagesResponse = await apiCall(
              `/chat_groups/${group.id}/messages`,
              {
                method: "GET",
              }
            );

            return {
              id: group.id,
              name: group.name,
              image: group.image,
              is_dm: group.is_dm,
              members: group.members,
              created_at: group.created_at,
              updated_at: group.updated_at,
              messages: messagesResponse || [], // Dodaj poruke u grupu
            };
          })
        );

        const formattedGroups = groupsWithMessages.sort(
          (a: Group, b: Group) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );

        setGroups(formattedGroups);

        console.log(formattedGroups); // Provjera podataka
      } catch (err) {
        console.error("Failed to fetch chat groups or messages", err);
      }
    };

    fetchGroups();
  }, []);

  return (
    <div className="text-textColor flex">
      <div className="flex flex-col ml-[3%] sm:ml-[5%] md:ml-[15%] pt-3 w-full">
        {/* Header */}
        <div className="bg-navbarColor rounded-t-lg w-[97%] sm:w-[95%] md:w-[90%] flex items-center justify-between p-3">
          <p className="font-semibold ml-5 text-3xl">Chat</p>
          <Link href="/new-chat">
            <div className="group cursor-pointer">
              <BsPlusCircle className="w-7 h-7 group-hover:hidden" />
              <BsFillPlusCircleFill className="w-7 h-7 hidden group-hover:block" />
            </div>
          </Link>
        </div>

        {/* Body */}
        <div className="bg-[#f4ffe6] rounded-b-lg w-[97%] sm:w-[95%] md:w-[90%] flex flex-col p-5 gap-4 overflow-y-auto h-[70vh] md:h-[85vh] scrollbar scrollbar-thumb-navbarColor scrollbar-track-transparent scrollbar-w-4">
          {groups.map((group) => (
            <Link href={`/chat/${group.id}`} key={group.id}>
              <div className="flex items-center justify-between bg-navbarColor rounded-lg p-4 hover:bg-[#93a970] transition duration-200 cursor-pointer">
                {/* Group Picture */}
                {group.image ? (
                  <img
                    src={group.image}
                    alt={group.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                ) : group.is_dm ? (
                  <div className="w-12 h-12 rounded-full bg-resedaGreen flex items-center justify-center mr-4">
                    {(() => {
                      const initials = group.name
                        .split(" ")
                        .map((word) => word[0])
                        .join("")
                        .toUpperCase();
                      return (
                        <span className="text-lg text-white">{initials}</span>
                      );
                    })()}
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center mr-4">
                    <HiUserGroup className="w-8 h-8 text-gray-700" />
                  </div>
                )}

                {/* Group Info */}
                <div className="flex-1">
                  <p className="text-[19px] font-semibold">{group.name}</p>
                  <p className="text-sm text-gray-700">
                    {group.messages[0]?.length > 0
                      ? group.messages[0][0]?.content.length > 32
                        ? `${group.messages[0][0].content.slice(0, 32)}...`
                        : group.messages[0][0].content
                      : "No messages to show..."}
                  </p>
                </div>

                {/* Chevron Icon */}
                <FaChevronRight className="w-5 h-5 text-textColor" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
