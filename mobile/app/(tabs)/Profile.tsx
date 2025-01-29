"use client";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { HStack } from "@/components/ui/hstack";
import {
  View,
  FlatList,
  SafeAreaView,
  TextInput,
  StyleSheet,
} from "react-native";
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
import Post from "../Post";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { queryClient } from "@/api";

const useGetUser = () => {
  const router = useRouter();
  return useQuery({
    queryKey: ["user"],
    retry: false,
    queryFn: async () => {
      try {
        const data = await apiCall("/auth", { method: "GET" });
        return data;
      } catch (error) {
        router.push("/Login");
        return null;
      }
    },
  });
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
    queryFn: async () => apiCall("/posts"),
  });
};

const useSaves = () => {
  return useQuery({
    queryKey: ["saved_posts"],
    queryFn: async () => apiCall("/saved_posts"),
  });
};

export default function ProfileScreen() {
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
  const { data: saved_posts, isLoading: isSavedPostsLoading } = useSaves();
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

      console.log("result.assets:", result.assets); // Debugging log

      // Ensure assets exist and are not null
      if (!result.canceled && result.assets) {
        const fileUri = result.assets[0].uri;

        const formData = new FormData();
        // @ts-ignore
        formData.append("user[avatar]", {
          uri: fileUri,
          name: "avatar.jpg",
          type: "image/jpeg",
        });

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

    if (!posts || !Array.isArray(posts)) {
      return <Text className="text-center text-jet mt-5">No posts yet</Text>;
    }

    const userPosts = posts.filter(
      (post: any) => post.user?.username === user?.username
    );

    if (!userPosts || !Array.isArray(userPosts)) {
      return <Text className="text-center text-jet mt-5">No posts yet</Text>;
    }

    return (
      <SafeAreaView>
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={userPosts || []}
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
                  postsQuery.refetch();
                });
              }}
              id={item.id}
              comments_count={item.comments_count}
              savedByCurrentUser={item.saved_by_current_user}
              refetchPosts={postsQuery.refetch}
            />
          )}
        />
      </SafeAreaView>
    );
  };

  const renderSavedPosts = () => {
    if (isSavedPostsLoading) {
      return <Spinner />;
    }

    if (!saved_posts || saved_posts.length === 0) {
      return (
        <Text className="text-center text-jet mt-5">No saved posts yet</Text>
      );
    }

    return (
      <SafeAreaView>
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={saved_posts}
          renderItem={({ item }) => (
            <Post
              user={item.post.user}
              content={item.post.content}
              images={item.post.images}
              likes={item.post.likes_count}
              likedByCurrentUser={item.post.liked_by_current_user}
              likePost={() => {
                apiCall(`/posts/${item.post.id}/likes`, {
                  method: item.post.liked_by_current_user ? "DELETE" : "POST",
                }).then(() => {
                  queryClient.invalidateQueries({ queryKey: ["saved_posts"] });
                });
              }}
              id={item.post.id}
              comments_count={item.post.comments_count}
              savedByCurrentUser={item.post.saved_by_current_user}
              refetchPosts={() =>
                queryClient.invalidateQueries({ queryKey: ["saved_posts"] })
              }
            />
          )}
        />
      </SafeAreaView>
    );
  };

  const renderContent = () => {
    if (selectedTab === "Posts") return renderPosts();
    if (selectedTab === "Saved") return renderSavedPosts();
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

              <Button
                className="rounded-full bg-[#718355]"
                onPress={() => {
                  AsyncStorage.removeItem("token");
                  router.push("/sign-in");
                }}
              >
                <Text style={{ color: "white" }}>Logout</Text>
              </Button>
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
              {["Posts", "Saved"].map((tab) => (
                <Button
                  key={tab}
                  className={
                    selectedTab === tab
                      ? "bg-jet mr-3 rounded-full"
                      : "mr-3 rounded-full"
                  }
                  onPress={() => setSelectedTab(tab)}
                >
                  <ButtonText>{tab}</ButtonText>
                </Button>
              ))}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CFE1B9",
  },
  topView: {
    backgroundColor: "#718355",
    borderRadius: 15,
    padding: 16,
    borderWidth: 0.2,
    marginBottom: 10,
    alignItems: "center",
  },
  postView: {
    marginTop: 10,
    padding: "5%",
    margin: "5%",
    width: "90%",
    borderRadius: 10,
    borderColor: "#575A4B",
    borderWidth: 0.2,
    alignItems: "center",
    backgroundColor: "#718355",
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    paddingBottom: 2,
    paddingTop: "1%",
  },
  iconLeft: {
    marginLeft: 10,
  },
  middleSection: {
    width: "100%",
    paddingTop: 20,
    alignItems: "center",
    marginVertical: 10,
    borderColor: "#718355",
    // backgroundColor: "#718355",
    borderRadius: 10,
    //  borderWidth: 1,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    borderColor: "#718355",
    borderWidth: 1,
  },
  bottomSection: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 10,
  },
  icon: {
    marginHorizontal: 5,
  },
  cameraButton: {
    position: "absolute",
    top: "18%",
    right: "3%",
    backgroundColor: "#575A4B",
    borderRadius: 20,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
    marginLeft: 10,
    textAlign: "center",
  },
  modalImage: {
    width: 200,
    height: 200,
    marginBottom: 15,
    borderRadius: 10,
  },
  imageNavigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  closeButton: {
    backgroundColor: "#575A4B",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    marginTop: 10,
  },
  closeButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    alignSelf: "flex-start",
    margin: 5,
    backgroundColor: "#575A4B",
    padding: 8,
    borderRadius: 10,
  },
});
