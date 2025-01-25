"use client";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { HStack } from "@/components/ui/hstack";
import { View, FlatList, SafeAreaView, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, ButtonText } from "@/components/ui/button";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "@/components/ui/CustomText";
import { apiCall } from ".";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { z } from "zod";
import Comments from "@/components/ui/Comments";

const useGetUser = () => {
  const router = useRouter();
  return useQuery({
    queryKey: ["user"],
    retry: false,
    queryFn: async () => {
      const [data, status] = await apiCall("/auth", { method: "GET" });
      if (status !== 200) {
        router.push("/Login");
        return null;
      }

      return data;
    },
  });
};

const Post = ({
  user,
  content,
  images,
  likes,
  likedByCurrentUser,
  likePost,
  id,
  comments_count,
}: {
  user: { username: string; avatar: string | null };
  content: string;
  images: { id: number; url: string }[];
  likes: number;
  likedByCurrentUser: boolean;
  likePost: () => void;
  id: string;
  comments_count: string;
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handlePreviousImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return (
    <View className="mt-2 p-[5%] m-[5%] w-[90%] rounded-lg items-center bg-[#718355] border border-[#575A4B] border-opacity-20">
      <View className="flex flex-row justify-start w-full pb-0.5 pt-[1%]">
        {user.avatar ? (
          <Image
            source={{ uri: user.avatar }}
            style={{ width: 30, height: 30, borderRadius: 15 }}
          />
        ) : (
          <Ionicons
            name="person-circle"
            size={30}
            color="#575A4B"
            className="ml-2.5"
          />
        )}
        <Text className="text-lg mb-3.5 text-center">
          {user?.username || "Unknown User"}
        </Text>
      </View>

      <Text>{content}</Text>

      <View className="w-full pt-5 flex items-center my-2.5 border-[#718355] rounded-lg">
        {images.length > 0 && (
          <>
            <Image
              source={{ uri: images[currentImageIndex].url }}
              className="w-72 h-72 rounded-lg border border-[#718355] border-opacity-100"
            />
            {images.length > 1 && (
              <View className="flex flex-row justify-between items-center w-full mt-2.5">
                <TouchableOpacity
                  onPress={handlePreviousImage}
                  disabled={currentImageIndex === 0}
                >
                  <Ionicons
                    name="chevron-back"
                    size={24}
                    color={currentImageIndex === 0 ? "#575A4B" : "#CFE1B9"}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleNextImage}
                  disabled={currentImageIndex === images.length - 1}
                >
                  <Ionicons
                    name="chevron-forward"
                    size={24}
                    color={
                      currentImageIndex === images.length - 1
                        ? "#575A4B"
                        : "#CFE1B9"
                    }
                  />
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      </View>

      <View className="flex flex-row justify-around w-full mt-2.5">
        <Text>{likes}</Text>
        <TouchableOpacity onPress={likePost}>
          <Ionicons
            name="heart"
            size={24}
            color={likedByCurrentUser ? "red" : "#575A4B"}
            className="mx-1.25"
          />
        </TouchableOpacity>
        <Text>{comments_count}</Text>
        <TouchableOpacity>
          <Ionicons
            name="chatbubble"
            size={24}
            color="#575A4B"
            className="mx-1.25"
          />
        </TouchableOpacity>
      </View>

      <Comments postInfo={id} />
    </View>
  );
};

const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => apiCall("/auth"),
  });
};

const usePosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: () => apiCall("/posts"),
  });
};

const useRecipes = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: () => apiCall("/posts"), //kasnije promijeniti u recipes
  });
};

export default function ProfileScreen() {
  const profileSchema_first_name = z.object({
    first_name: z
      .string()
      .min(2, "First name must be at least 2 characters")
      .regex(/^[A-ZČĆŠĐŽ][a-zA-ZČĆŠĐŽčćšđž]*$/, "Incorrect first_name format"),
  });

  const profileSchema_last_name = z.object({
    last_name: z
      .string()
      .min(2, "Last name must be at least 2 characters")
      .regex(/^[A-ZŠČĆĐŽ][a-zA-ZČĆŠĐŽčćšđž]*$/, "Incorrect last_name format"),
  });

  const profileSchema_username = z.object({
    username: z
      .string()
      .min(4, "Username must be at least 4 characters")
      .regex(/^[a-zA-Z][a-zA-Z0-9._]*$/, "Incorrect username format"),
  });

  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => apiCall("/posts"),
    retry: false,
  });

  const { data: user, isLoading, error } = useUser();
  const router = useRouter();

  {
    isLoading && <Spinner />;
  }

  {
    error && <Text>Error</Text>;
  }

  const userQuery = useGetUser();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState("");
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState("Posts");
  const [editingField, setEditingField] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState<any>({});
  const [originalData, setOriginalData] = useState({});

  const { data: posts, isLoading: isPostsLoading } = usePosts();
  const { data: recipes, isLoading: isRecipesLoading } = useRecipes();

  const toggleEdit = (field: string) => {
    if (editingField === field) {
      handleSaveProfile(field);
    } else {
      setEditingField(field);
    }
  };

  useEffect(() => {
    if (user?.data) {
      setOriginalData({
        firstName: user?.data.first_name,
        lastName: user?.data.last_name,
        username: user?.data.username,
        bio: user?.data.bio || "",
        gender: user?.data.gender || "",
      });
      setFirstName(user?.data.first_name);
      setLastName(user?.data.last_name);
      setUserName(user?.data.username);
      setBio(user?.data.bio || "");
      setGender(user?.data.gender || "");
    }
  }, [user?.data]);

  const handleSaveProfile = async (field: string) => {
    const formData = new FormData();

    if (field === "firstname") {
      formData.append("user[first_name]", firstName);
    } else if (field === "lastname") {
      formData.append("user[last_name]", lastName);
    } else if (field === "username") {
      formData.append("user[username]", userName);
    } else if (field === "bio") {
      formData.append("user[bio]", bio);
    }

    try {
      if (field === "firstname") {
        profileSchema_first_name.parse({ first_name: firstName });
      } else if (field === "lastname") {
        profileSchema_last_name.parse({ last_name: lastName });
      } else if (field === "username") {
        profileSchema_username.parse({ username: userName });
      }

      setErrors({});
      setErrorMessage("");

      const response = await apiCall("/registrations", {
        method: "PATCH",
        body: formData,
      });

      console.log("Response: ", response);

      if (response.status === 422) {
        setErrorMessage("Username has already been taken.");
        return;
      }

      console.log("Profile successfully updated: ", response);
      userQuery.refetch();
      setFirstName(response.first_name);
      setLastName(response.last_name);
      setErrorMessage("");
      setEditingField(null);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.errors.reduce((acc: any, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {});
        setErrors(formattedErrors);
      } else if (
        error ===
        JSON.stringify({ error: { username: ["has already been taken"] } })
      ) {
        setErrorMessage("Username has already been taken.");
      } else {
        console.error("Error updating profile: ", error);
      }
    }
  };

  const pickImageAsync = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled && result.assets.length > 0) {
        const fileUri = result.assets[0].uri;

        const response = await fetch(fileUri);
        const blob = await response.blob();

        const formData = new FormData();
        formData.append("user[avatar]", blob, "avatar.jpg");

        const data = await apiCall("/registrations", {
          method: "PATCH",
          body: formData,
        });

        userQuery.refetch();
      }
    } catch (error) {
      console.error("Error updating avatar: ", error);
    }
  };

  const renderPosts = () => {
    if (isPostsLoading) {
      return <Spinner />;
    }
    if (!posts || posts.length === 0) {
      return <Text className="text-center text-jet mt-5">No posts yet</Text>;
    }
    const userPosts = posts.filter(
      (post: any) => post.user?.username === user?.username
    );
    if (userPosts.length === 0) {
      return <Text className="text-center text-jet mt-5">No posts yet</Text>;
    }
    return (
      <SafeAreaView>
        <FlatList
          className="w-full"
          keyExtractor={(item) => item.id}
          data={userPosts}
          renderItem={({ item }) => (
            <Post
              user={item.user}
              content={item.content}
              images={item.images}
              likes={item.likes_count}
              likedByCurrentUser={item.liked_by_current_user}
              likePost={() => {
                apiCall(`/posts/${item.id}/likes`, {
                  method: item.liked_by_current_user ? "DELETE" : "POST",
                }).then(() => {
                  postsQuery.refetch(); // Refetch posts after liking/unliking
                });
              }}
              id={item.id}
              comments_count={item.comments_count}
            />
          )}
        />
      </SafeAreaView>
    );
  };

  const renderRecipes = () => {
    if (isRecipesLoading) {
      return <Spinner />;
    }
    if (!recipes || recipes.length === 0) {
      return <Text className="text-center text-jet mt-5">No recipes yet</Text>;
    }
    const userRecipes = posts.filter(
      (post: any) => post.user?.username === user?.username
    );
    if (userRecipes.length === 0) {
      return <Text className="text-center text-jet mt-5">No recipes yet</Text>;
    }
    return (
      <SafeAreaView className="flex-1">
        <FlatList
          className="w-full"
          keyExtractor={(item) => item.id}
          data={userRecipes}
          renderItem={({ item }) => (
            <Post
              user={item.user}
              content={item.content}
              images={item.images}
              likes={item.likes_count}
              likedByCurrentUser={item.liked_by_current_user}
              likePost={() => {
                apiCall(`/posts/${item.id}/likes`, {
                  method: item.liked_by_current_user ? "DELETE" : "POST",
                }).then(() => {
                  postsQuery.refetch(); // Refetch posts after liking/unliking
                });
              }}
              id={item.id}
              comments_count={item.comments_count}
            />
          )}
        />
      </SafeAreaView>
    );
  };

  const renderContent = () => {
    return selectedTab === "Posts" ? renderPosts() : renderRecipes();
  };

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name || "");
      setLastName(user.last_name || "");
      setUserName(user.username || "");
      setBio(user.bio || "");
      setProfilePicture(user.avatar || null);
      setGender(user.gender || "");
    }
  }, [user]);

  return (
    <View className="flex-1 bg-teagreen">
      <FlatList
        data={[]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={() => null}
        ListHeaderComponent={
          <View className="pt-10 pl-10 pr-10">
            <View className="flex-row justify-between items-center">
              <HStack space="2xl" className="items-center mb-2">
                <Avatar className="bg-resedagreen">
                  {user?.avatar ? (
                    <AvatarImage
                      source={{ uri: user?.avatar }}
                      className="w-full h-full"
                    />
                  ) : (
                    <AvatarFallbackText className="font-quicksand">
                      {user?.username}
                    </AvatarFallbackText>
                  )}
                </Avatar>
                <Ionicons
                  name="create"
                  size={20}
                  onPress={pickImageAsync}
                  className="text-jet"
                />
                <Text className="font-bold text-xl">
                  {firstName + " " + lastName}
                </Text>
              </HStack>
            </View>

            <View className="mb-2">
              <Text className="text-base mb-2 font-bold">First name:</Text>
              <View className="flex-row items-center">
                <TextInput
                  className={`flex-1 border rounded-full px-3 py-2 text-base`}
                  editable={editingField === "firstname"}
                  value={firstName}
                  onChangeText={setFirstName}
                />
                <TouchableOpacity
                  className="ml-2 bg-jet px-4 py-2 rounded-full"
                  onPress={() => toggleEdit("firstname")}
                >
                  <Text className="text-white font-bold">
                    {editingField === "firstname" ? "Save" : "Edit"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {errors.first_name && (
              <Text className="text-lg ml-4 mb-2 color-red-700">
                {errors.first_name}
              </Text>
            )}

            <View className="mb-2">
              <Text className="text-base mb-2 font-bold">Last name:</Text>
              <View className="flex-row items-center">
                <TextInput
                  className={`flex-1 border rounded-full px-3 py-2 text-base`}
                  editable={editingField === "lastname"}
                  value={lastName}
                  onChangeText={setLastName}
                />
                <TouchableOpacity
                  className="ml-2 bg-jet px-4 py-2 rounded-full"
                  onPress={() => toggleEdit("lastname")}
                >
                  <Text className="text-white font-bold">
                    {editingField === "lastname" ? "Save" : "Edit"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {errors.last_name && (
              <Text className="text-lg ml-4 mb-2 color-red-700">
                {errors.last_name}
              </Text>
            )}

            <View className="mb-2">
              <Text className="text-base mb-2 font-bold">Username:</Text>
              <View className="flex-row items-center">
                <TextInput
                  className={`flex-1 border rounded-full px-3 py-2 text-base`}
                  editable={editingField === "username"}
                  value={userName}
                  onChangeText={setUserName}
                />
                <TouchableOpacity
                  className="ml-2 bg-jet px-4 py-2 rounded-full"
                  onPress={() => toggleEdit("username")}
                >
                  <Text className="text-white font-bold">
                    {editingField === "username" ? "Save" : "Edit"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {errors.username && (
              <Text className="text-lg ml-4 mb-2 color-red-700">
                {errors.username}
              </Text>
            )}

            {errorMessage && (
              <Text className="text-lg ml-4 mb-2 color-red-700">
                {errorMessage}
              </Text>
            )}

            <View className="mb-2">
              <Text className="text-base mb-2 font-bold">Bio:</Text>
              <View className="flex-row items-center">
                <TextInput
                  className={`flex-1 border rounded-full px-3 py-2 text-base`}
                  editable={editingField === "bio"}
                  value={bio}
                  onChangeText={setBio}
                />
                <TouchableOpacity
                  className="ml-2 bg-jet px-4 py-2 rounded-full"
                  onPress={() => toggleEdit("bio")}
                >
                  <Text className="text-white font-bold">
                    {editingField === "bio" ? "Save" : "Edit"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View className="mb-4">
              <Text className="text-base mb-2 font-bold">Gender:</Text>
              <TextInput
                className="flex-1 rounded-full px-3 py-2 text-base"
                editable={false}
                value={gender.charAt(0).toUpperCase() + gender.slice(1)}
              />
            </View>

            <View className="flex-row justify-center">
              {selectedTab === "Posts" ? (
                <Button
                  className="bg-jet mr-3 rounded-full"
                  onPress={() => setSelectedTab("Posts")}
                >
                  <ButtonText className="">Posts</ButtonText>
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="mr-3 rounded-full"
                  onPress={() => setSelectedTab("Posts")}
                >
                  <ButtonText className="">Posts</ButtonText>
                </Button>
              )}

              {selectedTab === "Recipes" ? (
                <Button
                  className="bg-jet mr-3 rounded-full"
                  onPress={() => setSelectedTab("Recipes")}
                >
                  <ButtonText className="">Recipes</ButtonText>
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="mr-3 rounded-full"
                  onPress={() => setSelectedTab("Recipes")}
                >
                  <ButtonText className="">Recipes</ButtonText>
                </Button>
              )}
            </View>
          </View>
        }
        ListFooterComponent={
          <View className="flex-1 items-center">{renderContent()}</View>
        }
      />
    </View>
  );
}
