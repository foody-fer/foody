"use client";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField } from "@/components/ui/input";
import { View, FlatList } from "react-native";
import { useFonts, Quicksand_400Regular } from "@expo-google-fonts/quicksand";
import { useEffect, useState } from "react";
import { Button, ButtonText } from "@/components/ui/button";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "@/components/ui/CustomText";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { apiCall } from "@/api";

const Post = ({
  user,
  content,
  images,
  likes,
  likedByCurrentUser,
  likePost,
}: {
  user: { username: string; avatar: string | null };
  content: string;
  images: { id: number; url: string }[];
  likes: number;
  likedByCurrentUser: boolean;
  likePost: () => void;
}) => {
  return (
    <View className="mt-2 p-5 m-5 w-[90%] rounded-lg items-center border-[#575A4B]">
      <View className="flex-row justify-start w-full pb-2 pt-1 border border-[#718355]">
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
        <Text className="text-lg mb-3.5 text-center">{user.username}</Text>
      </View>

      <Text>{content}</Text>

      <View className="w-full items-center my-2.5 border border-[#718335]">
        {images.map((image) => (
          <Image
            key={image.id}
            source={{ uri: image.url }}
            className="w-[150px] h-[150px] rounded-lg border border-[#718355]"
          />
        ))}
      </View>

      <View className="flex-row justify-around w-full mt-2.5">
        <Text>{likes}</Text>
        <TouchableOpacity onPress={likePost}>
          <Ionicons
            name="heart"
            size={24}
            color={likedByCurrentUser ? "red" : "#575A4B"}
            className="mx-5"
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons
            name="chatbubble"
            size={24}
            color="#575A4B"
            className="mx-5"
          />
        </TouchableOpacity>
      </View>
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
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => apiCall("/posts"),
    retry: false,
  });

  const { data: user, isLoading, error } = useUser();

  {
    isLoading && <Spinner />;
  }

  {
    error && <Text>Error</Text>;
  }

  const [userName, setUserName] = useState("");
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [isEditingUserName, setIsEditingUserName] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Posts");
  const [originalName, setOriginalName] = useState(userName);
  const [originalBio, setOriginalBio] = useState(bio);

  const { data: posts, isLoading: isPostsLoading } = usePosts();
  const { data: recipes, isLoading: isRecipesLoading } = useRecipes();

  interface ProfileUpdateData {
    username: string;
    bio: string;
    profilePicture: string | null;
  }

  const updateProfileMutation = useMutation<unknown, Error, ProfileUpdateData>({
    mutationFn: async (updatedData: ProfileUpdateData) => {
      const [data, status] = await apiCall("/update-profile", {
        method: "PATCH",
        body: JSON.stringify(updatedData),
        headers: { "Content-Type": "application/json" },
      });

      if (status !== 200) {
        throw new Error(data.message || "Failed to update profile");
      }

      return data;
    },
    onSuccess: (data) => {
      console.log("Profile updated successfully:", data);
    },
    onError: (error) => {
      console.log("Error updating profile:", error);
    },
  });

  const handleSaveProfile = () => {
    console.log("Sending data: ", { username: userName, bio, profilePicture });
    updateProfileMutation.mutate({
      username: userName,
      bio: bio,
      profilePicture: profilePicture,
    });
  };

  const toggleEditUserName = () => {
    setIsEditingUserName((prev) => {
      if (!prev) {
        setOriginalName(userName);
      } else if (userName !== originalName) {
        handleSaveProfile();
      }
      return !prev;
    });
  };

  const toggleEditBio = () => {
    setIsEditingBio((prev) => {
      if (!prev) {
        setOriginalBio(bio);
      } else if (bio !== originalBio) {
        handleSaveProfile();
      }
      return !prev;
    });
  };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePicture(result.assets[0].uri);
      handleSaveProfile();
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
          />
        )}
      />
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
          />
        )}
      />
    );
  };

  const renderContent = () => {
    return selectedTab === "Posts" ? renderPosts() : renderRecipes();
  };

  useEffect(() => {
    if (user) {
      setUserName(user.username || "");
      setBio(user.bio || "");
      setProfilePicture(user.avatar || null);
    }
  }, [user]);

  return (
    <View className="flex-1 bg-teagreen">
      <View className="pt-10 pl-10 pr-10">
        <View className="flex-row justify-between items-center">
          <HStack space="2xl" className="items-center">
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
          </HStack>
          {/*Button
            className="bg-jet rounded-full"
            //onPress={() => setSelectedTab("Posts")} promijeniti funkcionalnost u logoutanje
          >
            <ButtonText className="">Logout</ButtonText>
          </Button>*/}
        </View>

        <View className="flex-row mt-5 items-center">
          {isEditingUserName ? (
            <Input
              variant="outline"
              isDisabled={false}
              className="flex-1 rounded-full"
            >
              <InputField
                onChangeText={setUserName}
                placeholder={userName}
                className="text-jet font-quicksand py-2"
              />
            </Input>
          ) : (
            <Text className=" text-jet text-2xl font-quicksand">
              {userName}
            </Text>
          )}
          <Ionicons
            name="create"
            size={20}
            onPress={toggleEditUserName}
            className="text-jet ml-5"
          />
        </View>

        <View className="flex-row mt-5 items-center">
          {isEditingBio ? (
            <Input
              variant="outline"
              isDisabled={false}
              className="flex-1 rounded-full"
            >
              <InputField
                onChangeText={setBio}
                placeholder={bio}
                className="text-jet font-quicksand py-1"
              />
            </Input>
          ) : (
            <Input
              variant="outline"
              isDisabled={true}
              className="flex-1 rounded-full"
            >
              <InputField
                onChangeText={setBio}
                placeholder={bio}
                className="text-jet font-quicksand py-1"
              />
            </Input>
          )}

          <Ionicons
            name="create"
            size={20}
            onPress={toggleEditBio}
            className="text-jet ml-5"
          />
        </View>
      </View>

      <View className="flex-row mt-5 justify-center">
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

      <View className="flex-1 items-center">{renderContent()}</View>
    </View>
  );
}
