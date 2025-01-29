"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { IoArrowBackCircle, IoArrowBackCircleOutline } from "react-icons/io5";
import { apiCall } from "~/api";
import { HiUserGroup } from "react-icons/hi";
import { FiPaperclip } from "react-icons/fi";
import { IoIosMore } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useGetUser } from "~/queries/getUser";
import { IoTrashBinOutline } from "react-icons/io5";
import {
  MenuRoot,
  MenuTrigger,
  MenuContent,
  MenuItem,
  Button,
} from "@chakra-ui/react";

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

export default function GroupChat() {
  const userQuery = useGetUser();
  const router = useRouter();

  const params = useParams(); // Koristimo useParams za dohvat ID-a
  const { id } = params; // ID grupe
  const [group, setGroup] = useState<Group>();
  const [newMessage, setNewMessage] = useState("");
  const [myUsername, setmyUsername] = useState(userQuery.data.username);
  const [image, setImage] = useState<any>(null);
  const [imageSend, setImageSend] = useState<File>();
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const chatMessages = useQuery({
    queryKey: ["chatMessages"],
    queryFn: () => apiCall(`/chat_groups/${id}/messages`, { method: "GET" }),
    refetchOnWindowFocus: true, // Ažuriranje podataka kad se ponovo fokusira prozor
    staleTime: 0, // Podaci će biti uvijek svježi
    refetchInterval: 1000,
  });

  console.log(chatMessages);
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await apiCall(`/chat_groups/${id}`, {
          method: "GET",
        });

        setGroup(response[0]);

        console.log(response);
      } catch (err) {
        console.error("Failed to fetch chat groups", err);
      }
    };

    fetchGroups();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages.data]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImageSend(file);
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      console.log(newMessage.trim());
      console.log(`Sending message to group ${id}: ${newMessage}`);

      try {
        const formData = new FormData();

        formData.append("message[content]", newMessage);

        if (imageSend) {
          formData.append("message[attachment]", imageSend);
        }

        const [data, status] = await apiCall(`/chat_groups/${id}/messages`, {
          method: "POST",
          body: formData,
        });

        if (status === 201) {
          chatMessages.refetch();
          console.log(data);
          setImage(null);
          setImageSend(undefined);
        }
      } catch (err) {
        console.error("Failed to update group name", err);
      }
    }

    setNewMessage("");
  };

  const handleMessageDelete = (messageId: number) => {
    fetch(`/chat_groups/${id}/messages/${messageId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete message");
        }
        console.log("Message deleted");

        // Refetch messages after the deletion
        chatMessages.refetch();
      })
      .catch((err) => {
        console.error("Failed to delete message", err);
      });
  };

  const handleDelete = async (messageId: number) => {
    const response = await apiCall(`/chat_groups/${id}/messages/${messageId}`, {
      method: "DELETE",
    });

    chatMessages.refetch();
  };

  if (chatMessages.isLoading) return <p>Loading...</p>;

  if (!id) return <p>Loading...</p>;

  const handleViewMembers = () => {
    router.push(`/chat/members/${id}`);
  };

  const handleEditGroup = () => {
    router.push(`/chat/edit/${id}`);
  };

  return (
    <div className="flex flex-col ml-[3%] sm:ml-[5%] md:ml-[15%] pt-3 h-[80vh] md:h-[95vh] w-[94%] sm:w-[90%] md:w-[80%]">
      {/* Header */}
      <div className="bg-navbarColor w-full p-4 text-2xl font-bold flex items-center gap-20 rounded-t-lg">
        <Link href={"/chat"} className="group">
          <IoArrowBackCircleOutline className="self-center w-8 h-8 sm:w-9 sm:h-9 lg:w-12 lg:h-12 group-hover:hidden" />
          <IoArrowBackCircle className="self-center w-8 h-8 sm:w-9 sm:h-9 lg:w-12 lg:h-12 hidden group-hover:block" />
        </Link>
        <div className="flex items-center">
          {/* Group Picture */}
          {group?.image ? (
            <img
              src={group.image}
              alt={group.name}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : group?.is_dm ? (
            <div className="w-12 h-12 rounded-full bg-resedaGreen flex items-center justify-center">
              {(() => {
                const initials = group.name
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .toUpperCase();
                return (
                  <span className="text-lg text-white font-normal">
                    {initials}
                  </span>
                );
              })()}
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
              <HiUserGroup className="w-8 h-8 text-gray-700" />
            </div>
          )}
          <p className="font-semibold ml-3 text-xl sm:text-2xl lg:text-3xl">
            {group?.name}
          </p>
        </div>

        {group?.id && !group?.is_dm && (
          <div className="ml-auto">
            <MenuRoot positioning={{ placement: "bottom-start" }}>
              <MenuTrigger asChild>
                <Button className="outline-none" size="sm">
                  <IoIosMore
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    className="h-9 w-9 rounded-xl hover:bg-[#c4cbb9] transition duration-300"
                  />
                </Button>
              </MenuTrigger>
              <MenuContent className="cursor-pointer absolute right-[6%] sm:right-[6%] md:right-[5%] lg:right-[5%] z-50 bg-[#c4cbb9]">
                <MenuItem
                  value="view-members"
                  onClick={handleViewMembers}
                  className="cursor-pointer hover:bg-[#aab0a2]"
                >
                  View members
                </MenuItem>
                <MenuItem
                  value="edit-group"
                  onClick={handleEditGroup}
                  className="cursor-pointer hover:bg-[#aab0a2]"
                >
                  Edit group
                </MenuItem>
              </MenuContent>
            </MenuRoot>
          </div>
        )}
      </div>

      <div className="flex flex-col p-4 w-full h-full overflow-y-auto gap-4 bg-[#f4ffe6] scrollbar scrollbar-thumb-navbarColor scrollbar-track-transparent scrollbar-w-4">
        {chatMessages.data?.[0]?.length > 0 ? (
          [...chatMessages.data?.[0]]
            .sort(
              (a, b) =>
                new Date(a.created_at).getTime() -
                new Date(b.created_at).getTime()
            )
            .map((message: any) => {
              const formatDateTime = (dateTime: string) => {
                const date = new Date(dateTime);
                const day = String(date.getDate()).padStart(2, "0");
                const month = String(date.getMonth() + 1).padStart(2, "0");
                const year = date.getFullYear();
                const hours = String(date.getHours()).padStart(2, "0");
                const minutes = String(date.getMinutes()).padStart(2, "0");

                return `${day}.${month}.${year} ${hours}:${minutes}`;
              };

              return (
                <div
                  key={message.id}
                  className={`flex gap-2 flex-row items-center ${
                    message.user.username === myUsername
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  {message.user.username !== myUsername &&
                    (message.user.avatar ? (
                      <img
                        src={message.user.avatar}
                        alt={message.user.username}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-resedaGreen flex items-center justify-center text-white">
                        {message.user.first_name[0]}
                        {message.user.last_name[0]}
                      </div>
                    ))}

                  <div
                    className={`max-w-[45%] p-3 relative ${
                      message.user.username === myUsername
                        ? "bg-[#8d9f6f] text-white rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-br-none"
                        : "bg-[#cddcb4] text-black rounded-tl-lg rounded-tr-lg rounded-br-lg rounded-bl-none"
                    }`}
                  >
                    <div
                      className={`flex items-center ${
                        message.user.username === myUsername
                          ? "justify-end gap-2"
                          : "justify-start"
                      }`}
                    >
                      <p className="text-lg font-semibold">
                        {message.user.first_name}
                      </p>

                      {/* Ikona kante za smeće, prikazuje se samo ako je poruka od trenutnog korisnika */}
                      {message.user.username === myUsername && (
                        <IoTrashBinOutline
                          className="w-4 h-4 text-red-500 hover:scale-125 transition duration-300 cursor-pointer"
                          onClick={() => handleDelete(message.id)}
                        />
                      )}
                    </div>

                    {message.attachment_url && (
                      <div className="mt-2">
                        <img
                          src={message.attachment_url}
                          alt="Attachment"
                          className="max-w-[200px] max-h-[200px] rounded-lg shadow-md"
                        />
                      </div>
                    )}

                    <p
                      className={`text-base mt-2 ${
                        message.user.username === myUsername
                          ? "text-right"
                          : "text-left"
                      }`}
                    >
                      {message.content}
                    </p>
                    <p
                      className={`text-xs mt-1 ${
                        message.user.username === myUsername
                          ? "text-right"
                          : "text-left"
                      }`}
                    >
                      {formatDateTime(message.created_at)}
                    </p>
                  </div>

                  {message.user.username === myUsername &&
                    (message.user.avatar ? (
                      <img
                        src={message.user.avatar}
                        alt={message.user.username}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-resedaGreen flex items-center justify-center text-white">
                        {message.user.first_name[0]}
                        {message.user.last_name[0]}
                      </div>
                    ))}
                </div>
              );
            })
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-lg text-gray-500">No messages to show</p>
          </div>
        )}
        <div ref={messagesEndRef}></div>
      </div>

      <div className="bg-[#c4cbb9] w-full p-4 flex items-center flex-col rounded-b-lg">
        <div className="flex w-full items-center">
          <input
            type="text"
            placeholder="Write a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 p-2 ring-1 ring-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-resedaGreen text-textColor"
          />

          <label htmlFor="file-upload">
            <FiPaperclip className="w-6 h-6 ml-2 cursor-pointer transform hover:scale-125 transition-transform duration-200 ease-in-out" />
          </label>

          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleImageUpload}
          />

          <button
            onClick={handleSendMessage}
            className="ml-2 bg-resedaGreen text-white p-2 rounded-full"
          >
            Send
          </button>
        </div>

        {/* Prikaz slike ispod svega */}
        {image && (
          <div className="mt-2">
            <img
              src={image}
              alt="Preview"
              className="h-12 w-auto border border-gray-400 rounded-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
}
