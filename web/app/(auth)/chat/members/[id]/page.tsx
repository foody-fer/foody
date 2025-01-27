"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { IoArrowBackCircle, IoArrowBackCircleOutline } from "react-icons/io5";
import { apiCall } from "~/api";

interface User {
  id: any;
  user: {
    id: any;
    avatar: string | null;
    bio: string | null;
    first_name: string;
    gender: string;
    last_name: string;
    username: string;
  };
}

export default function EditGroupChat() {
  const params = useParams(); // Koristimo useParams za dohvat ID-a
  const { id } = params; // ID grupe
  const [members, setMembers] = useState<User[]>([]);
  console.log(members);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await apiCall(`/chat_groups/${id}/members`, {
          method: "GET",
        });

        setMembers(response[0]); // Adjust this if your response is not an array of users
      } catch (err) {
        console.error("Failed to fetch chat groups", err);
      }
    };

    fetchMembers();
  }, [id]);

  if (!id) return <p>Loading...</p>;

  return (
    <div className="flex flex-col ml-[3%] sm:ml-[5%] md:ml-[15%] pt-3 h-[80vh] md:h-[95vh] w-[94%] sm:w-[90%] md:w-[80%]">
      {/* Header */}
      <div className="bg-navbarColor w-full p-4 text-2xl font-bold flex items-center gap-5 rounded-t-lg">
        <Link href={`/chat/${id}`} className="group">
          <IoArrowBackCircleOutline className="self-center w-8 h-8 sm:w-9 sm:h-9 lg:w-12 lg:h-12 group-hover:hidden" />
          <IoArrowBackCircle className="self-center w-8 h-8 sm:w-9 sm:h-9 lg:w-12 lg:h-12 hidden group-hover:block" />
        </Link>

        <p className="font-semibold text-3xl">Group Members</p>
      </div>

      <div className="flex flex-col p-4 w-full h-full bg-[#f4ffe6] rounded-b-lg">
        {/* Display usernames of members */}
        <div className="mt-2 ml-11 w-[70%] max-h-72 md:max-h-96 overflow-y-auto scrollbar scrollbar-thumb-resedaGreen scrollbar-track-transparent scrollbar-w-4">
          {members.map((member) => {
            const avatarContent = member.user.avatar ? (
              <img
                src={member.user.avatar}
                alt={member.user.username}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-white text-lg">
                {member.user.first_name
                  ? member.user.first_name[0].toUpperCase()
                  : ""}
                {member.user.last_name
                  ? member.user.last_name[0].toUpperCase()
                  : ""}
              </span>
            );

            return (
              <div key={member.id} className="flex items-center gap-3 mb-3">
                <div className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center bg-resedaGreen relative">
                  {avatarContent}
                </div>
                <p className="text-xl">{member.user.username}</p>{" "}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
