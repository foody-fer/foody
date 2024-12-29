"use client";
import { Input } from "@chakra-ui/react";
import React, { useState } from "react";
import Avatar from "react-avatar";
import Feed from "../../components/Feed";

export default function ProfilePage() {
  const [name, setName] = useState("Name Surname");
  const [bio, setBio] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Posts");

  const toggleEdit = () => setIsEditing((prev) => !prev);

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

  return (
    <div className="flex flex-col h-screen">
      <div className="p-10 mt-4">
        <div className="flex items-center space-x-4">
          <Avatar
            name={name}
            round={true}
            size="55"
            style={{ fontSize: "18px" }}
          />
          <h1 className="text-3xl text-textColor">{name}</h1>
        </div>

        <p className="text-textColor text-lg font-medium mt-8 ml-2">Bio:</p>

        <div className="flex mt-2 ml-2">
          {isEditing ? (
            <Input
              type="text"
              className="flex-1 p-2 border rounded border-black hover:border-black text-textColor"
              placeholder="Enter your bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          ) : (
            <Input
              variant="outline"
              disabled={true}
              placeholder="Enter your bio"
              value={bio}
              className="flex-1 p-2 cursor-not-allowed border rounded"
            />
          )}

          <button
            className="ml-3 p-2 px-4 rounded font-semibold bg-textColor text-white"
            onClick={toggleEdit}
          >
            {isEditing ? "Save bio" : "Edit bio"}
          </button>
        </div>
      </div>

      <div className="flex mt-4 ml-12 space-x-3">
        <button
          className={`p-2 px-4 rounded font-semibold ${
            selectedTab === "Posts"
              ? "bg-textColor text-white"
              : "border border-black text-textColor"
          }`}
          onClick={() => setSelectedTab("Posts")}
        >
          Posts
        </button>
        <button
          className={`p-2 px-4 rounded font-semibold ${
            selectedTab === "Recipes"
              ? "bg-textColor text-white"
              : "border border-black text-textColor"
          }`}
          onClick={() => setSelectedTab("Recipes")}
        >
          Recipes
        </button>
      </div>

      <div className="flex-1 mt-2 mx-10 mb-10">
        {renderContent()}
      </div>
    </div>
  );
}
