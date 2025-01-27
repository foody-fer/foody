"use client";
import Link from "next/link";
import { useState } from "react";
import { IoArrowBackCircle, IoArrowBackCircleOutline } from "react-icons/io5";
import { MdAddPhotoAlternate } from "react-icons/md";
import { apiCall } from "~/api";
import { useGetUser } from "~/queries/getUser";
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

export default function NewChatpage() {
  const userQuery = useGetUser();
  const [myUsername, setMyUserName] = useState(userQuery.data.username);
  const [groupName, setgroupName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [groupImage, setGroupImage] = useState<any>(null);
  const [chatType, setChatType] = useState<"GROUP" | "DM">("GROUP");
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [noGroupNameError, setnoGroupNameError] = useState<string>("");
  const [noSelectedError, setnoSelectedError] = useState<string>("");
  const [noUserError, setNoUserError] = useState<string>("");
  const [groupImageSend, setgroupImageSend] = useState<File>();

  const router = useRouter();

  const handleSearch = async () => {
    try {
      let response;

      if (searchTerm) {
        response = await apiCall(`/users?username=${searchTerm}`, {
          method: "GET",
        });
      } else {
        response = await apiCall("/users", { method: "GET" });
      }

      if (response && response[0]) {
        if (response[0].length === 0) {
          setNoUserError("No user found with that combination of letters.");
        } else {
          setUsers(response[0]);
          setNoUserError("");
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setgroupImageSend(file);
      const imageUrl = URL.createObjectURL(file);
      setGroupImage(imageUrl);
    }
  };

  const handleCreate = async () => {
    if (chatType === "GROUP" && !groupName.trim()) {
      setnoGroupNameError("Please enter a group name.");
      return;
    } else {
      setnoGroupNameError("");
    }

    if (chatType === "GROUP") {
      if (selectedUsers.length < 2) {
        setnoSelectedError("Please select at least two users.");
        return;
      } else {
        setnoSelectedError("");
      }
    } else if (chatType === "DM") {
      if (selectedUsers.length !== 1) {
        setnoSelectedError("Please select exactly one user.");
        return;
      } else {
        setnoSelectedError("");
      }
    }

    if (chatType === "GROUP") {
      const formData = new FormData();

      formData.append("chat_group[name]", groupName);

      selectedUsers.forEach((user) => {
        console.log(user.id);
        formData.append("chat_group[user_ids][]", user.id);
      });

      if (groupImageSend) {
        formData.append("chat_group[image]", groupImageSend);
      }

      try {
        const [data, status] = await apiCall("/chat_groups", {
          method: "POST",
          body: formData,
        });

        if (status === 201) {
          console.log("Group created successfully:", data);
          router.push("/chat");
        }
      } catch (error) {
        console.error("Error creating chat group:", error);
      }
    } else if (chatType === "DM") {
      const formData = new FormData();

      // ovdje dodemo tek ako je selected 1 user, tako da je ok

      // OVO TREBA POPRAVITI!!!!!!!!!!!!!!!!!!!!
      selectedUsers.forEach((user) => {
        console.log(user.id);
        formData.append("chat_group[user_ids][]", user.id);
      });

      formData.append("chat_group[is_dm]", "true");

      console.log(formData);

      try {
        const [data, status] = await apiCall("/chat_groups", {
          method: "POST",
          body: formData,
        });

        if (status === 201) {
          console.log("Direct message chat created successfully:", data);
          router.push("/chat");
        }
      } catch (error) {
        console.error("Error creating direct message chat:", error);
      }
    }
  };

  const handleChatTypeChange = (type: "GROUP" | "DM") => {
    setChatType(type);
    setSearchTerm("");
    setUsers([]);
    setNoUserError("");
    setnoGroupNameError("");
    setnoSelectedError("");
    setgroupName("");
    setGroupImage(null);
    setgroupImageSend(undefined);
    setSelectedUsers([]); // Reset selected users on chat type change
  };

  const handleUserSelect = (user: User) => {
    setSelectedUsers((prevSelectedUsers) => {
      if (
        prevSelectedUsers.some((selectedUser) => selectedUser.id === user.id)
      ) {
        return prevSelectedUsers.filter(
          (selectedUser) => selectedUser.id !== user.id
        );
      } else {
        return [...prevSelectedUsers, user];
      }
    });
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
              onChange={() => handleChatTypeChange("GROUP")}
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
              onChange={() => handleChatTypeChange("DM")}
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

            {noGroupNameError && (
              <p className="text-red-500 mt-2 ml-12 font-semibold">
                {noGroupNameError}
              </p>
            )}
          </>
        )}

        <p className="text-lg font-medium mt-4 ml-10">
          {chatType === "GROUP" ? "Participants:" : "User:"}
        </p>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search users by username..."
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

        {noUserError ? (
          <p className="text-red-500 mt-2 ml-12 font-semibold">{noUserError}</p>
        ) : (
          <>
            <div className="mt-2 ml-11 w-[70%] max-h-60 overflow-y-auto scrollbar scrollbar-thumb-resedaGreen scrollbar-track-transparent scrollbar-w-4">
              {users
                .filter((user) => user.username !== myUsername) // Filtriraj korisnika koji je u myUsername
                .map((user) => {
                  const avatarContent = user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white text-lg">
                      {user.first_name ? user.first_name[0].toUpperCase() : ""}
                      {user.last_name ? user.last_name[0].toUpperCase() : ""}
                    </span>
                  );

                  const isSelected = selectedUsers.some(
                    (selectedUser) => selectedUser.id === user.id
                  );

                  return (
                    <div
                      key={user.id}
                      className={`flex items-center gap-3 p-1 mt-2 mr-1 cursor-pointer ${isSelected ? "bg-[#c7d2bb] rounded-full" : ""}`}
                      onClick={() => handleUserSelect(user)}
                    >
                      <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center bg-resedaGreen relative">
                        {avatarContent}
                      </div>
                      <span className="text-lg">{user.username}</span>
                    </div>
                  );
                })}
            </div>

            {noSelectedError && (
              <p className="text-red-500 mt-2 ml-12 font-semibold">
                {noSelectedError}
              </p>
            )}
          </>
        )}

        {chatType === "GROUP" && (
          <>
            <p className="text-lg font-medium mt-2 ml-10">Group image:</p>

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
