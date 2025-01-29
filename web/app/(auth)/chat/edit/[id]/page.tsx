"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { IoArrowBackCircle, IoArrowBackCircleOutline } from "react-icons/io5";
import { apiCall } from "~/api";
import { HiUserGroup } from "react-icons/hi";
import { useRouter } from "next/navigation";

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
}

export default function EditGroupChat() {
  const params = useParams(); // Koristimo useParams za dohvat ID-a
  const { id } = params; // ID grupe
  const [group, setGroup] = useState<Group | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [newName, setNewName] = useState<string>("");
  const [groupImage, setGroupImage] = useState<any>(null);
  const [groupImageSend, setgroupImageSend] = useState<File>();
  const [noGroupNameError, setnoGroupNameError] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await apiCall(`/chat_groups/${id}`, {
          method: "GET",
        });

        const fetchedGroup = response[0];
        setGroup(fetchedGroup);
        setNewName(fetchedGroup.name);
        setGroupImage(fetchedGroup.image);

        console.log(response);
      } catch (err) {
        console.error("Failed to fetch chat groups", err);
      }
    };

    fetchGroups();
  }, [id]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setgroupImageSend(file);
      const imageUrl = URL.createObjectURL(file);
      setGroupImage(imageUrl);
    }
  };

  const handleUpdateGroup = async () => {
    if (!group) return;

    if (!newName.trim()) {
      setnoGroupNameError("Please enter a group name.");
      return;
    } else {
      setnoGroupNameError("");
    }

    try {
      const formData = new FormData();

      formData.append("chat_group[name]", newName);

      if (groupImageSend) {
        formData.append("chat_group[image]", groupImageSend);
      }

      const response = await apiCall(`/chat_groups/${group.id}`, {
        method: "PATCH",
        body: formData,
      });

      router.push(`/chat/${id}`);

      console.log("Group updated:", response);
    } catch (err) {
      console.error("Failed to update group name", err);
    }
  };

  if (!id || !group) return <p>Loading...</p>;

  return (
    <div className="flex flex-col ml-[3%] sm:ml-[5%] md:ml-[15%] pt-3 h-[80vh] md:h-[95vh] w-[94%] sm:w-[90%] md:w-[80%]">
      {/* Header */}
      <div className="bg-navbarColor w-full p-4 text-2xl font-bold flex items-center gap-5 rounded-t-lg">
        <Link href={`/chat/${group.id}`} className="group">
          <IoArrowBackCircleOutline className="self-center w-8 h-8 sm:w-9 sm:h-9 lg:w-12 lg:h-12 group-hover:hidden" />
          <IoArrowBackCircle className="self-center w-8 h-8 sm:w-9 sm:h-9 lg:w-12 lg:h-12 hidden group-hover:block" />
        </Link>

        <p className="font-semibold text-3xl">Edit Group</p>
      </div>

      <div className="flex flex-col p-4 w-full h-full bg-[#f4ffe6] rounded-b-lg">
        <p className="text-lg font-medium mt-4 ml-10">Group name:</p>

        <input
          type="text"
          placeholder="Enter the group name..."
          value={newName}
          onChange={handleNameChange}
          className="w-[70%] ml-11 p-2 mt-2 ring-1 ring-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-resedaGreen text-textColor"
        />

        {noGroupNameError && (
          <p className="text-red-500 mt-2 ml-12 font-semibold">
            {noGroupNameError}
          </p>
        )}

        <p className="text-lg font-medium mt-2 ml-10">Group image:</p>

        <div
          className="w-40 h-40 rounded-full overflow-hidden flex items-center justify-center bg-resedaGreen relative ml-10 mt-2"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {groupImage ? (
            <img
              src={groupImage}
              alt={group.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
              <HiUserGroup className="w-8 h-8 text-gray-700" />
            </div>
          )}

          {isHovered && (
            <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full text-white text-4xl">
              +
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleImageUpload}
          />
        </div>

        <div className="flex justify-center mt-4 mb-4">
          <button
            onClick={handleUpdateGroup}
            className="w-40 h-11 bg-resedaGreen hover:bg-[#5b6f3b] text-white rounded-full"
          >
            Save Details
          </button>
        </div>
      </div>
    </div>
  );
}
