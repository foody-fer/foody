"use client";
import { Input } from "@chakra-ui/react";
import React, { useState } from "react";
import Feed from "../../components/Feed";
import { useGetUser } from "~/queries/getUser";

export default function ProfilePage() {
  const userQuery = useGetUser();

  const [name, setName] = useState(userQuery.data.first_name + " " + userQuery.data.last_name);
  const [username, setUserName] = useState(userQuery.data.username);
  const [bio, setBio] = useState("");
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [isEditingUserName, setIsEditingUserName] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Posts");
  const [isHovered, setIsHovered] = useState(false);
  const [image, setImage] = useState("");
  
  const avatarContent = userQuery.data.avatar ? 
  (
    <img
      src={image || userQuery.data.avatar.replace(    // ovaj replace cemo maknuti kada fran rjesi problem sa linkom
        "example.com",
        "foody-backend.zeko.run"
      )}
      alt={`${name}`}
      className="w-full h-full object-cover"
    />
  )
  : (
    <span className="text-white text-xl">
      {name.split(" ")[0][0].toUpperCase()}
      {name.split(" ")[1][0].toUpperCase()}
    </span>
  );

  const toggleEditBio = () => setIsEditingBio((prev) => !prev);
  const toggleEditUserName = () => setIsEditingUserName((prev) => !prev);

  const renderContent = () => {
    switch (selectedTab) {
      case "Posts":
        return (
          <div className="p-1 md:p-4">
            <p>Ovdje ce ici objave korisnika</p>
            <Feed />
          </div>
        );
      case "Recipes":
        return (
          <div className="p-1 md:p-4">
            <p>Ovdje ce ici recepti korisnika</p>
            <Feed />
          </div>
        );
      default:
        return null;
    }
  };

  const imgUpload = (e: any) => {
    const file = e.target.files?.[0];
    if (file) setImage(URL.createObjectURL(file)); // stvara privremeni URL sa kojeg se ce prikazivati slika
    console.log(file);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="p-10 mt-4">
        <div className="flex items-center space-x-4">
          <div
            className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center bg-resedaGreen relative"
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)}  
          >
            {avatarContent}

            {isHovered && (
              <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full text-white text-4xl">
                +
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={imgUpload}
            />
          </div>
          <h1 className="text-3xl text-textColor">{name}</h1>
        </div>

    	  <p className="text-lg font-medium mt-4 ml-3">Username:</p>

        <div className="flex ml-3 text-gray-900">
          {isEditingUserName ? (
            <Input
              type="text"
              className="flex-1 p-2 border rounded-full border-black hover:border-black text-gray-900"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          ) : (
            <Input
              variant="outline"
              disabled={true}
              placeholder="Enter your username"
              value={username}
              className="flex-1 p-2 cursor-not-allowed border rounded-full text-gray-900 disabled:text-gray-800 disabled:opacity-100"
            />
          )}

          <button
            className="ml-3 p-2 w-40 text-base rounded-full font-semibold bg-textColor text-white"
            onClick={toggleEditUserName}
          >
            {isEditingUserName ? "Save username" : "Edit username"}
          </button>
        </div>
        
        <p className="text-lg font-medium mt-2 ml-3">Bio:</p>

        <div className="flex mt-2 ml-3">
          {isEditingBio ? (
            <Input
              type="text"
              className="flex-1 p-2 border rounded-full border-black hover:border-black text-gray-900"
              placeholder="Enter your bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          ) : (
            <Input
              variant="outline"
              disabled={true}
              className="flex-1 p-2 cursor-not-allowed border rounded-full text-gray-900 disabled:text-gray-800 disabled:opacity-100"
              placeholder="Enter your bio"
              value={bio}
            />
          )}

          <button
            className="ml-3 p-2 w-40 rounded-full font-semibold bg-textColor text-white"
            onClick={toggleEditBio}
          >
            {isEditingBio ? "Save bio" : "Edit bio"}
          </button>
        </div>
      </div>

      <div className="flex mt-4 ml-12 space-x-3">
        <button
          className={`p-2 px-4 rounded-full font-semibold ${
            selectedTab === "Posts"
              ? "bg-textColor text-white"
              : "border border-black text-textColor"
          }`}
          onClick={() => setSelectedTab("Posts")}
        >
          Posts
        </button>
        <button
          className={`p-2 px-4 rounded-full font-semibold ${
            selectedTab === "Recipes"
              ? "bg-textColor text-white"
              : "border border-black text-textColor"
          }`}
          onClick={() => setSelectedTab("Recipes")}
        >
          Recipes
        </button>
      </div>

      <div className="flex-1 mt-2 mx-10 mb-10">{renderContent()}</div>
    </div>
  );
}