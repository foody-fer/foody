"use client";
import { Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Feed from "../../components/Feed";
import { useGetUser } from "~/queries/getUser";
import { apiCall } from "~/api";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

export default function ProfilePage() {
  const profileSchema_first_name = z.object({
    first_name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .regex(/^[A-ZČĆŠĐŽ][a-zA-ZČĆŠĐŽčćšđž]*$/, "Incorrect first_name format"),
  });

  const profileSchema_last_name = z.object({
    last_name: z
      .string()
      .min(2, "last_name must be at least 2 characters")
      .regex(/^[A-ZŠČĆĐŽ][a-zA-ZČĆŠĐŽčćšđž]*$/, "Incorrect last_name format"),
  });

  const profileSchema_username = z.object({
    username: z
      .string()
      .min(4, "Username must be at least 4 characters")
      .regex(/^[a-zA-Z][a-zA-Z0-9._]*$/, "Incorrect username format")
  });

  const posts = useQuery({
    queryKey: ["posts"],
    queryFn: () => apiCall(`${process.env.NEXT_PUBLIC_API_URL}/posts`, { method: "GET"}),
    refetchOnWindowFocus: true, // Ažuriranje podataka kad se ponovo fokusira prozor
    staleTime: 0, // Podaci će biti uvijek svježi
  });
  
  const userQuery = useGetUser();
  const [name, setName] = useState(userQuery.data.first_name + " " + userQuery.data.last_name);
  const [firstName, setfirstName] = useState(userQuery.data.first_name);
  const [lastName, setlastName] = useState(userQuery.data.last_name);
  const [username, setUserName] = useState(userQuery.data.username);
  const [bio, setBio] = useState(userQuery.data.bio ? userQuery.data.bio : "");
  const [selectedTab, setSelectedTab] = useState("Posts");
  const [isHovered, setIsHovered] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [error, setError] = useState("");
  const [editingField, setEditingField] = useState<string | null>(null);

  const [originalData, setOriginalData] = useState({
    firstName: userQuery.data.first_name,
    lastName: userQuery.data.last_name,
    username: userQuery.data.username,
    bio: userQuery.data.bio? userQuery.data.bio : ""
  });

  const resetFields = () => {
    setfirstName(originalData.firstName);
    setlastName(originalData.lastName);
    setUserName(originalData.username);
    setBio(originalData.bio? originalData.bio : "");
    setError("");
    setErrors({});
  };

  useEffect(() => {
    setOriginalData({
      firstName: userQuery.data.first_name,
      lastName: userQuery.data.last_name,
      username: userQuery.data.username,
      bio: userQuery.data.bio
    });
  }, [userQuery.data]);

  if (userQuery.isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (userQuery.isError || !userQuery.data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Error loading user data.</p>
      </div>
    );
  }

  const avatarContent = userQuery.data.avatar ? 
  (
    <img
      src={userQuery.data.avatar}
      alt={`${name} image`}
      className="w-full h-full object-cover"
    />
  )
  : (
    <span className="text-white text-xl">
      {name.split(" ")[0][0].toUpperCase()}
      {name.split(" ")[1][0].toUpperCase()}
    </span>
  );
  
  const renderContent = () => {
    switch (selectedTab) {
      case "Posts":
        return (
          <div className="p-1 md:p-4">
            <p>Ovdje ce ici objave korisnika</p>
            <Feed posts={posts}/>
          </div>
        );
      case "Recipes":
        return (
          <div className="p-1 md:p-4">
            <p>Ovdje ce ici recepti korisnika</p>
            <Feed posts={posts}/>
          </div>
        );
      default:
        return null;
    }
  };

  const toggleEdit = (field: string) => {
    if (editingField === field) {
      handleSave(field); 
    } else {
      resetFields();
      setEditingField(field);
    }
  };

  const imgUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;
  
    const formData = new FormData();
    formData.append("user[avatar]", file);
  
    try {
      const data = await apiCall(`${process.env.NEXT_PUBLIC_API_URL}/registrations`, {
        method: "PATCH",
        body: formData,
      });
  
      userQuery.refetch();
    } catch (error) {
      console.error("Error updating avatar:", error);
    }
  };
  
  const handleSave = async (field: string) => {
    const formData = new FormData();
  
    if (field === "firstName") {
      formData.append("user[first_name]", firstName);
    } else if (field === "lastName") {
      formData.append("user[last_name]", lastName);
    } else if (field === "username") {
      formData.append("user[username]", username);
    } else if (field === "bio") {
      formData.append("user[bio]", bio);
    }
  
    try {
      // Validate first name with Zod
      if(field === "firstName"){
        profileSchema_first_name.parse({ first_name: firstName });
      } else if (field === "lastName") {
        profileSchema_last_name.parse({ last_name: lastName });
      } else if (field === "username") {
        profileSchema_username.parse({ username: username });
      }
  
      // Reset errors if validation passes
      setErrors({});
  
      // Make API call to update the profile
      const [data, status] = await apiCall(`${process.env.NEXT_PUBLIC_API_URL}/registrations`, {
        method: "PATCH",
        body: formData,
      });
  
      if (status === 422) {
        setError(data.error.username);
        return;
      }
  
      console.log("Profile updated successfully:", data);
      userQuery.refetch();
      setName(data.first_name + " " + data.last_name);
      setError("");

      setEditingField(null);
  
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.errors.reduce((acc: any, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {});
        setErrors(formattedErrors);
      }
    }
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
        
        <p className="text-lg font-medium mt-4 ml-3">First name:</p>

        <div className="flex ml-3 text-gray-900">
          {editingField === "firstName" ? (
            <Input
              type="text"
              className="flex-1 p-2 border rounded-full border-black hover:border-black text-gray-900"
              placeholder="Enter your name"
              value={firstName}
              onChange={(e) => setfirstName(e.target.value)}
            />
          ) : (
            <Input
              variant="outline"
              disabled={true}
              placeholder="Enter your name"
              value={firstName}
              className="flex-1 p-2 cursor-not-allowed border rounded-full text-gray-900 disabled:text-gray-800 disabled:opacity-100"
            />
          )}

          <button
            className="ml-3 p-2 w-40 text-base rounded-full font-semibold bg-textColor text-white"
            onClick={() => toggleEdit("firstName")}
          >
            {editingField === "firstName" ? "Save first name" : "Edit first name"}
          </button>
        </div>

        {errors.first_name && (
          <div style={{ color: "red" }} className="lg:text-[15px] ml-4 mt-1">
            {errors.first_name}
          </div>
        )}

        <p className="text-lg font-medium mt-4 ml-3">Last name:</p>
        
        <div className="flex ml-3 text-gray-900">
          {editingField === "lastName" ? (
            <Input
              type="text"
              className="flex-1 p-2 border rounded-full border-black hover:border-black text-gray-900"
              placeholder="Enter your surname"
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
            />
          ) : (
            <Input
              variant="outline"
              disabled={true}
              placeholder="Enter your surname"
              value={lastName}
              className="flex-1 p-2 cursor-not-allowed border rounded-full text-gray-900 disabled:text-gray-800 disabled:opacity-100"
            />
          )}

          <button
            className="ml-3 p-2 w-40 text-base rounded-full font-semibold bg-textColor text-white"
            onClick={() => toggleEdit("lastName")}
          >
            {editingField === "lastName" ? "Save last name" : "Edit last name"}
          </button>
        </div>

        {errors.last_name && (
          <div style={{ color: "red" }} className="lg:text-[15px] ml-4 mt-1">
            {errors.last_name}
          </div>
        )}

    	  <p className="text-lg font-medium mt-4 ml-3">Username:</p>

        <div className="flex ml-3 text-gray-900">
          {editingField === "username" ? (
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
            onClick={() => toggleEdit("username")}
          >
            {editingField === "username" ? "Save username" : "Edit username"}
          </button>
        </div>
        

        {errors.username ? (
          <div style={{ color: "red" }} className="lg:text-[15px] ml-4 mt-1">
            {errors.username}
          </div>
        ) : error && (
          <div style={{ color: "red" }} className="lg:text-[15px] ml-4 mt-1">
            Username {error}.
          </div>
        )}


        <p className="text-lg font-medium mt-4 ml-3">Bio:</p>

        <div className="flex mt-2 ml-3">
          {editingField === "bio" ? (
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
            onClick={() => toggleEdit("bio")}
          >
            {editingField === "bio" ? "Save bio" : "Edit bio"}
          </button>
        </div>

        <p className="text-lg font-medium mt-4 ml-3">Gender:</p>

        <div className="ml-5 text-gray-900 text-base">
          {userQuery.data.gender.charAt(0).toUpperCase() + userQuery.data.gender.slice(1)}
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