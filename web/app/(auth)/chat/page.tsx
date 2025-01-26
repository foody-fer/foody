"use client";
import Link from "next/link";
import { BsPlusCircle, BsFillPlusCircleFill } from "react-icons/bs";
import { FaChevronRight } from "react-icons/fa";

export default function Chatpage() {
  const groups = [
    {
      id: 1,
      name: "Tech Enthusiasts",
      lastMessage: "Discuss the latest in tech. Bok kako si?",
      image: "/images/google-logo.png",
    },
    {
      id: 2,
      name: "Music Lovers",
      lastMessage: "Share your favorite tunes.",
      image: "/images/google-logo.png",
    },
    {
      id: 3,
      name: "Fitness Freaks",
      lastMessage: "Tips and tricks for staying fit.",
      image: "/images/google-logo.png",
    },
    {
      id: 4,
      name: "Foodies",
      lastMessage: "Explore recipes and food trends.",
      image: "/images/google-logo.png",
    },
    {
      id: 5,
      name: "Travel Diaries",
      lastMessage: "Share your travel experiences.",
      image: "/images/google-logo.png",
    },
    {
      id: 6,
      name: "Photography Club",
      lastMessage: "Capture and share moments.",
      image: "/images/google-logo.png",
    },
    {
      id: 7,
      name: "Book Readers",
      lastMessage: "Discuss your favorite books.",
      image: "/images/google-logo.png",
    },
    {
      id: 8,
      name: "Book Readers",
      lastMessage: "Discuss your favorite books.",
      image: "/images/google-logo.png",
    },
    {
      id: 9,
      name: "Book Readers",
      lastMessage: "Discuss your favorite books.",
      image: "/images/google-logo.png",
    },
    {
      id: 10,
      name: "Book Readers",
      lastMessage: "Discuss your favorite books.",
      image: "/images/google-logo.png",
    },
    {
      id: 11,
      name: "Book Readers",
      lastMessage: "Discuss your favorite books.",
      image: "/images/google-logo.png",
    },
    {
      id: 12,
      name: "Book Readers",
      lastMessage: "Discuss your favorite books.",
      image: "/images/google-logo.png",
    },
  ];

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
                <img
                  src={group.image}
                  alt={group.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                {/* Group Info */}
                <div className="flex-1">
                  <p className="text-[19px] font-semibold">{group.name}</p>
                  <p className="text-sm text-gray-700">
                    {group.lastMessage.length > 30
                      ? `${group.lastMessage.slice(0, 30)}...`
                      : group.lastMessage}
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
