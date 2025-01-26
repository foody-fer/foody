"use client";
import Link from "next/link";
import { useState } from "react";
import { IoArrowBackCircle, IoArrowBackCircleOutline } from "react-icons/io5";
import { MdAddPhotoAlternate } from "react-icons/md";

export default function NewChatpage() {
  const [groupName, setgroupName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [groupImage, setGroupImage] = useState<any>(null);
  const [chatType, setChatType] = useState<"GROUP" | "DM">("GROUP");

  const handleSearch = () => {
    console.log("Search initiated:", searchTerm);
    return;
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Check if a file is selected
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Create a preview URL
      setGroupImage(imageUrl); // Update state with the URL
      console.log("Image selected:", file);
    }
  };

  const handleCreate = () => {
    if (chatType === "GROUP" && !groupName.trim()) {
      alert("Please enter a group name.");
      return;
    }
    console.log(
      chatType === "GROUP"
        ? `Group created with name: ${groupName}, Image: ${groupImage}`
        : "Direct message created"
    );
    // Add logic to handle creation
  };

  return (
    <div className="flex flex-col ml-[3%] sm:ml-[5%] md:ml-[15%] mt-3 w-full pb-5">
      {/* Header */}
      <div className="bg-navbarColor rounded-t-lg w-[94%] sm:w-[90%] md:w-[80%] flex items-center p-3">
        <Link href={"/chat"} className="group">
          <IoArrowBackCircleOutline className="self-center w-8 h-8 sm:w-9 sm:h-9 lg:w-12 lg:h-12 group-hover:hidden" />
          <IoArrowBackCircle className="self-center w-8 h-8 sm:w-9 sm:h-9 lg:w-12 lg:h-12 hidden group-hover:block" />
        </Link>
        <p className="font-semibold ml-5 text-2xl lg:text-3xl">New Chat</p>
      </div>

      {/* Body */}
      <div className="bg-[#f4ffe6] rounded-b-lg w-[94%] sm:w-[90%] md:w-[80%]">
        {/*Radios*/}
        <div className="flex flex-row items-center justify-center gap-2 mt-4">
          <label
            className={`${
              chatType === "GROUP" ? "bg-[#5b6f3b] text-white" : "bg-[#ffff]"
            } flex justify-center items-center border-1 border-gray-400 rounded-full w-36 md:w-48 lg:w-72 h-12 md:text-base lg:text-lg font-medium cursor-pointer`}
          >
            <input
              type="radio"
              className="opacity-0 absolute"
              name="chatType"
              value="GROUP"
              checked={chatType === "GROUP"}
              onChange={() => setChatType("GROUP")}
            />
            GROUP
          </label>

          <label
            className={`${
              chatType === "DM" ? "bg-[#5b6f3b] text-white" : "bg-[#ffff]"
            } flex justify-center items-center border-1 border-gray-400 rounded-full w-36 md:w-48 lg:w-72 h-12 md:text-base lg:text-lg font-medium cursor-pointer`}
          >
            <input
              type="radio"
              className="opacity-0 absolute"
              name="chatType"
              value="DM"
              checked={chatType === "DM"}
              onChange={() => setChatType("DM")}
            />
            DM
          </label>
        </div>

        {chatType === "GROUP" && (
          <>
            <p className="text-lg font-medium mt-4 ml-10">Group name:</p>

            <input
              type="text"
              className="w-[70%] ml-11 p-2 mt-2 ring-1 ring-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-resedaGreen text-textColor"
              placeholder="Enter group name"
              value={groupName}
              onChange={(e) => setgroupName(e.target.value)}
            />
          </>
        )}

        <p className="text-lg font-medium mt-4 ml-10">
          {chatType === "GROUP" ? "Members:" : "User:"}
        </p>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search users by email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[70%] ml-11 p-2 mt-2 ring-1 ring-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-resedaGreen text-textColor"
          />

          <button
            onClick={handleSearch}
            className="w-16 sm:w-20 md:w-16 lg:w-20 mt-2 bg-resedaGreen hover:bg-[#5b6f3b] text-white rounded-full"
          >
            Search
          </button>
        </div>

        {chatType === "GROUP" && (
          <>
            <p className="text-lg font-medium mt-4 ml-10">Group image:</p>

            <div className="flex flex-col items-start ml-11 mt-2">
              <label
                htmlFor="imageUploadGroup"
                className="cursor-pointer bg-resedaGreen hover:bg-[#5b6f3b] text-white flex justify-center items-center gap-2 w-72 h-10 rounded-full"
              >
                <span>Add image</span>
                <MdAddPhotoAlternate />
              </label>

              <input
                type="file"
                id="imageUploadGroup"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />

              {groupImage && (
                <div className="flex justify-center w-72 mt-4">
                  <img
                    src={groupImage}
                    alt="Group Preview"
                    className="w-28 h-28 object-cover border-2 border-gray-300 rounded-full"
                  />
                </div>
              )}
            </div>
          </>
        )}

        <div className="flex justify-center mt-4 mb-4">
          <button
            onClick={handleCreate}
            className="w-40 h-11 bg-resedaGreen hover:bg-[#5b6f3b] text-white rounded-full"
          >
            {chatType === "GROUP" ? "Create" : "Chat"}
          </button>
        </div>
      </div>
    </div>
  );
}
