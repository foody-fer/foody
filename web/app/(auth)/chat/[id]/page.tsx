"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { IoArrowBackCircle, IoArrowBackCircleOutline } from "react-icons/io5";
import { apiCall } from "~/api";
import { HiUserGroup } from "react-icons/hi";
import { IoIosMore } from "react-icons/io";
import { useRouter } from "next/navigation";
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
  const params = useParams(); // Koristimo useParams za dohvat ID-a
  const { id } = params; // ID grupe
  const [groupaaa, setGroup] = useState<Group>();
  const [newMessage, setNewMessage] = useState("");
  const router = useRouter();

  console.log("aa", groupaaa);

  const group = {
    id: id,
    name: `Group ${id}`,
    messages: [
      {
        id: 1,
        user: "Ana",
        profilePicture: "/images/google-logo.png",
        text: "Hej ekipa, jeste vidjeli novi AI alat od OpenAI?",
        time: "09:45",
      },
      {
        id: 2,
        user: "Marko",
        profilePicture: "/images/google-logo.png",
        text: "Da, ChatGPT 5 izgleda stvarno impresivno!",
        time: "09:46",
      },
      {
        id: 3,
        user: "Luka",
        profilePicture: "/images/google-logo.png",
        text: "To je onaj alat koji može generirati kod? Koristio sam ga neki dan.",
        time: "09:47",
      },
      {
        id: 4,
        user: "Ana",
        profilePicture: "/images/google-logo.png",
        text: "Da, upravo taj! Baš pomaže u razvoju projekata.",
        time: "09:48",
      },
      {
        id: 5,
        user: "Marko",
        profilePicture: "/images/google-logo.png",
        text: "Ja sam s njim optimizirao SQL upite. Uštedio mi je sate rada.",
        time: "09:50",
      },
      {
        id: 6,
        user: "Ivana",
        profilePicture: "/images/google-logo.png",
        text: "Zadnjih nekoliko tjedana intenzivno istražujem nove AI alate i kako ih možemo implementirati u našim projektima. Postoji nekoliko opcija koje su već vrlo moćne, ali OpenAI se definitivno izdvaja po svojoj svestranosti i sposobnosti za generiranje koda, pisanje tekstova, pa čak i obavljanja složenih zadataka poput prepoznavanja slika. Mislim da će budućnost umjetničke inteligencije biti nevjerojatno uzbudljiva, s velikim potencijalom za sve industrije, od software developmenta do marketinga i obrazovanja. A najbolji dio je što nam je AI alat postao pristupačan, a za nas developere to je nevjerojatna prilika za unapređenje naših radnih procesa i smanjenje vremena potrebnog za razvoj novih aplikacija i rješenja. S obzirom na to da smo već sada svjesni koliko je AI moćan, vjerujem da će u budućnosti doći do još većih inovacija, a s njima i bolje mogućnosti za korištenje u realnom vremenu, čime će se povećati naš produktivnost.",
        time: "09:52",
      },
      {
        id: 7,
        user: "Ana",
        profilePicture: "/images/google-logo.png",
        text: "Zadnjih nekoliko tjedana intenzivno istražujem nove AI alate i kako ih možemo implementirati u našim projektima. Postoji nekoliko opcija koje su već vrlo moćne, ali OpenAI se definitivno izdvaja po svojoj svestranosti i sposobnosti za generiranje koda, pisanje tekstova, pa čak i obavljanja složenih zadataka poput prepoznavanja slika. Mislim da će budućnost umjetničke inteligencije biti nevjerojatno uzbudljiva, s velikim potencijalom za sve industrije, od software developmenta do marketinga i obrazovanja. A najbolji dio je što nam je AI alat postao pristupačan, a za nas developere to je nevjerojatna prilika za unapređenje naših radnih procesa i smanjenje vremena potrebnog za razvoj novih aplikacija i rješenja. S obzirom na to da smo već sada svjesni koliko je AI moćan, vjerujem da će u budućnosti doći do još većih inovacija, a s njima i bolje mogućnosti za korištenje u realnom vremenu, čime će se povećati naš produktivnost.",
        time: "09:52",
      },
      {
        id: 8,
        user: "Luka",
        profilePicture: "/images/google-logo.png",
        text: "Baš me zanima kako će se nositi s OpenAI-jem. Konkurencija uvijek donese nešto dobro.",
        time: "09:53",
      },
      {
        id: 9,
        user: "Ana",
        profilePicture: "/images/google-logo.png",
        text: "Definitivno! A i cijene će vjerojatno postati pristupačnije za nas developere.",
        time: "09:55",
      },
      {
        id: 10,
        user: "Marko",
        profilePicture: "/images/google-logo.png",
        text: "Slažem se. Nadam se da će dodati i više podrške za naše jezike.",
        time: "09:57",
      },
      {
        id: 11,
        user: "Ivana",
        profilePicture: "/images/google-logo.png",
        text: "Da, to bi bilo odlično! Trenutno moram koristiti engleski za većinu projekata.",
        time: "09:59",
      },
    ],
  };

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

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log(`Sending message to group ${id}: ${newMessage}`);
      // Dodaj novu poruku u grupu ili pošaljite na server
      setNewMessage("");
    }
  };

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
          {groupaaa?.image ? (
            <img
              src={groupaaa.image}
              alt={groupaaa.name}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : groupaaa?.is_dm ? (
            <div className="w-12 h-12 rounded-full bg-resedaGreen flex items-center justify-center">
              {(() => {
                const initials = groupaaa.name
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .toUpperCase();
                return <span className="text-lg text-white">{initials}</span>;
              })()}
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
              <HiUserGroup className="w-8 h-8 text-gray-700" />
            </div>
          )}
          <p className="font-semibold ml-3 text-xl sm:text-2xl lg:text-3xl">
            {groupaaa?.name}
          </p>
        </div>

        {groupaaa?.id && !groupaaa?.is_dm && (
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
        {group.messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-2 flex-row items-center ${message.user === "Ana" ? "justify-end" : "justify-start"}`}
          >
            {message.user !== "Ana" && (
              <img
                src={message.profilePicture}
                alt={message.user}
                className="w-10 h-10 rounded-full"
              />
            )}

            <div
              className={`max-w-[45%] p-3 relative ${
                message.user === "Ana"
                  ? "bg-[#8d9f6f] text-white rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-br-none"
                  : "bg-[#cddcb4] text-black rounded-tl-lg rounded-tr-lg rounded-br-lg rounded-bl-none"
              }`}
            >
              <p
                className={`text-lg font-semibold ${
                  message.user === "Ana" ? "text-right" : "text-left"
                }`}
              >
                {message.user}
              </p>
              <p className="text-base">{message.text}</p>
              <p
                className={`text-xs ${message.user === "Ana" ? "text-right" : "text-left"}`}
              >
                {message.time}
              </p>
            </div>

            {message.user === "Ana" && (
              <img
                src={message.profilePicture}
                alt={message.user}
                className="w-10 h-10 rounded-full"
              />
            )}
          </div>
        ))}
      </div>

      <div className="bg-[#c4cbb9] w-full p-4 flex items-center rounded-b-lg">
        <input
          type="text"
          placeholder="Write a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-2 ring-1 ring-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-resedaGreen text-textColor"
        />

        <button
          onClick={handleSendMessage}
          className="ml-2 bg-resedaGreen text-white p-2 rounded-full"
        >
          Send
        </button>
      </div>
    </div>
  );
}
