import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import { apiCall } from "./(tabs)";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import {
  Avatar,
  AvatarImage,
  AvatarFallbackText,
} from "@/components/ui/avatar";
import { queryClient } from "@/api";

interface User {
  id: any;
  avatar: string | null;
  bio: string | null;
  first_name: string;
  gender: string;
  last_name: string;
  username: string;
}

const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => apiCall("/auth"),
  });
};

const NewChat = () => {
  const router = useRouter();

  const [groupType, setGroupType] = useState("group");
  const [groupName, setGroupName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [noUserError, setNoUserError] = useState("");
  const [noGroupNameError, setNoGroupNameError] = useState("");
  const [noSelectedError, setNoSelectedError] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { data: user, isLoading, error } = useUser();

  {
    isLoading && <Spinner />;
  }

  {
    error && <Text>Error</Text>;
  }

  const handleSearch = async () => {
    try {
      let response;
      console.log("Search term: ", searchTerm);

      if (searchTerm.trim() !== "") {
        response = await apiCall(`/users?username=${searchTerm}`, {
          method: "GET",
        });
      } else {
        response = await apiCall("/users", { method: "GET" });
      }

      if (response) {
        if (response.length === 0) {
          setNoUserError("No user found with that combination of letters.");
          setUsers([]);
        } else {
          setUsers(response);
          setNoUserError("");
        }
      }

      console.log("Response: ", response);
      console.log("Users: ", users);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setSelectedImage(result.assets[0].uri);
      console.log(selectedImage);
    }
  };

  const handleCreate = async () => {
    if (groupType === "group" && groupName.trim() === "") {
      setNoGroupNameError("Please enter a group name.");
      console.log("No group name error: ", noGroupNameError);
      return;
    } else {
      setNoGroupNameError("");
    }

    if (groupType === "group") {
      if (selectedUsers.length < 2) {
        setNoSelectedError("Please select at least two users.");
        return;
      } else {
        setNoSelectedError("");
      }
    } else if (groupType === "dm") {
      if (selectedUsers.length !== 1) {
        setNoSelectedError("Please select exactly one user.");
        return;
      } else {
        setNoSelectedError("");
      }
    }

    const formData = new FormData();

    if (groupType === "group") {
      formData.append("chat_group[name]", groupName);

      selectedUsers.forEach((user) => {
        formData.append("chat_group[user_ids][]", user.id);
      });

      /*if (selectedImage) {
        formData.append("chat_group[image]", {
          uri: selectedImage.uri,
          type: selectedImage.type,
          name: selectedImage.fileName,
        });
      }*/

      console.log("Form data: ", formData);

      try {
        const response = await apiCall("/chat_groups", {
          method: "POST",
          body: formData,
        });

        queryClient.invalidateQueries({ queryKey: ["chats"] });
        console.log("Group created successfully:", response);
        router.push("./(tabs)/Chats");
      } catch (error) {
        console.error("Error creating chat group:", error);
      }
    } else if (groupType === "dm") {
      selectedUsers.forEach((user) => {
        formData.append("chat_group[user_ids][]", user.id);
      });
      formData.append("chat_group[is_dm]", "true");

      try {
        const response = await apiCall("/chat_groups", {
          method: "POST",
          body: formData,
        });

        queryClient.invalidateQueries({ queryKey: ["chats"] });
        console.log("DM created successfully:", response);
        router.push("./(tabs)/Chats");
      } catch (error) {
        console.error("Error creating direct message chat:", error);
      }
    }
  };

  const handleUserSelect = (user: User) => {
    setSelectedUsers((prevSelectedUsers) => {
      if (
        prevSelectedUsers.some((selectedUser) => selectedUser.id === user.id)
      ) {
        console.log("Selected users: ", selectedUsers);
        return prevSelectedUsers.filter(
          (selectedUser) => selectedUser.id !== user.id
        );
      } else {
        console.log("Selected users: ", selectedUsers);
        return [...prevSelectedUsers, user];
      }
    });
  };

  return (
    <View className="flex-1 bg-[#CFE1B9]">
      <FlatList
        data={[]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={() => null}
        ListHeaderComponent={
          <View className="mt-10 ml-5 mr-5">
            <Text className="font-semibold text-4xl mb-5">New chat</Text>
            <View className="flex-row border border-[#575A4B] rounded-full bg-[#F8FBEF] mb-2">
              <TouchableOpacity
                className={`flex-1 px-4 py-2 rounded-l-full ${
                  groupType === "group" ? "bg-[#575A4B]" : ""
                }`}
                onPress={() => setGroupType("group")}
              >
                <Text
                  className={`text-center text-sm font-bold ${
                    groupType === "group" ? "text-white" : "text-[#575A4B]"
                  }`}
                >
                  GROUP
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`flex-1 px-4 py-2 rounded-r-full ${
                  groupType === "dm" ? "bg-[#575A4B]" : ""
                }`}
                onPress={() => setGroupType("dm")}
              >
                <Text
                  className={`text-center text-sm font-bold ${
                    groupType === "dm" ? "text-white" : "text-[#575A4B]"
                  }`}
                >
                  DM
                </Text>
              </TouchableOpacity>
            </View>
            {groupType === "group" ? (
              <View>
                <View className="mb-2">
                  <Text className="text-base mb-2 font-bold">Group name:</Text>
                  <View className="flex-row items-center">
                    <TextInput
                      className={`flex-1 border rounded-full px-3 py-2 text-base`}
                      editable={true}
                      value={groupName}
                      placeholder="Enter group name"
                      onChangeText={setGroupName}
                    />
                  </View>
                  {noGroupNameError && (
                    <Text className="text-red-500 mt-2 ml-12 font-semibold">
                      {noGroupNameError}
                    </Text>
                  )}
                </View>
                <View className="mb-2">
                  <Text className="text-base mb-2 font-bold">
                    Participants:
                  </Text>
                  <View className="flex-row items-center">
                    <TextInput
                      className={`flex-1 border rounded-full px-3 py-2 text-base`}
                      editable={true}
                      value={searchTerm}
                      placeholder="Search users by username..."
                      onChangeText={setSearchTerm}
                    />
                    <TouchableOpacity
                      className="ml-2 bg-jet px-4 py-2 rounded-full"
                      onPress={handleSearch}
                    >
                      <Text className="text-white font-bold">Search</Text>
                    </TouchableOpacity>
                  </View>
                  {noUserError ? (
                    <Text className="text-red-500 mt-2 ml-5 font-semibold">
                      {noUserError}
                    </Text>
                  ) : null}

                  <FlatList
                    className="mt-2"
                    data={users || []}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => {
                      const isSelected = selectedUsers.some(
                        (selectedUser) => selectedUser.id === item.id
                      );
                      return (
                        <View key={item.id}>
                          <View>
                            {item?.username !== user.username && (
                              <View className="flex-row items-center mb-2 justify-between">
                                <View className="flex-row items-center">
                                  <Avatar className="bg-resedagreen mr-2">
                                    {item?.avatar ? (
                                      <AvatarImage
                                        source={{ uri: item?.avatar }}
                                        className="w-full h-full"
                                      />
                                    ) : (
                                      <AvatarFallbackText className="font-quicksand">
                                        {item?.username}
                                      </AvatarFallbackText>
                                    )}
                                  </Avatar>
                                  <Text className="text-xl">
                                    {item?.username}
                                  </Text>
                                </View>
                                <View>
                                  <TouchableOpacity
                                    className="ml-2 bg-jet px-4 py-2 rounded-full"
                                    onPress={() => handleUserSelect(item)}
                                  >
                                    {isSelected ? (
                                      <Text className="text-white font-bold">
                                        Deselect
                                      </Text>
                                    ) : (
                                      <Text className="text-white font-bold">
                                        Select
                                      </Text>
                                    )}
                                  </TouchableOpacity>
                                </View>
                              </View>
                            )}
                          </View>
                        </View>
                      );
                    }}
                  />
                  {noSelectedError ? (
                    <Text className="text-red-500 mt-2 ml-5 font-semibold">
                      {noSelectedError}
                    </Text>
                  ) : null}
                </View>
                <View className="mb-2">
                  <Text className="text-base mb-2 font-bold">Group image:</Text>
                  <View className="flex-row items-center">
                    <Avatar className="bg-resedagreen">
                      {selectedImage ? (
                        <AvatarImage
                          source={{ uri: selectedImage }}
                          className="w-full h-full"
                        />
                      ) : (
                        <AvatarFallbackText className="font-quicksand">
                          {groupName}
                        </AvatarFallbackText>
                      )}
                    </Avatar>
                    <TouchableOpacity
                      className="ml-2 bg-jet px-4 py-2 rounded-full"
                      onPress={pickImageAsync}
                    >
                      <Text className="text-white font-bold">Add image</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ) : (
              <View className="mb-2">
                <Text className="text-base mb-2 font-bold">User:</Text>
                <View className="flex-row items-center">
                  <TextInput
                    className={`flex-1 border rounded-full px-3 py-2 text-base`}
                    editable={true}
                    value={searchTerm}
                    placeholder="Search users by username..."
                    onChangeText={setSearchTerm}
                  />
                  <TouchableOpacity
                    className="ml-2 bg-jet px-4 py-2 rounded-full"
                    onPress={handleSearch}
                  >
                    <Text className="text-white font-bold">Search</Text>
                  </TouchableOpacity>
                </View>
                {noUserError ? (
                  <Text className="text-red-500 mt-2 ml-5 font-semibold">
                    {noUserError}
                  </Text>
                ) : null}

                <FlatList
                  className="mt-2"
                  data={users || []}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => {
                    const isSelected = selectedUsers.some(
                      (selectedUser) => selectedUser.id === item.id
                    );
                    return (
                      <View key={item.id}>
                        <View>
                          {item?.username !== user.username && (
                            <View className="flex-row items-center mb-2 justify-between">
                              <View className="flex-row items-center">
                                <Avatar className="bg-resedagreen mr-2">
                                  {item?.avatar ? (
                                    <AvatarImage
                                      source={{ uri: item?.avatar }}
                                      className="w-full h-full"
                                    />
                                  ) : (
                                    <AvatarFallbackText className="font-quicksand">
                                      {item?.username}
                                    </AvatarFallbackText>
                                  )}
                                </Avatar>
                                <Text className="text-xl">
                                  {item?.username}
                                </Text>
                              </View>
                              <View>
                                <TouchableOpacity
                                  className="ml-2 bg-jet px-4 py-2 rounded-full"
                                  onPress={() => handleUserSelect(item)}
                                >
                                  {isSelected ? (
                                    <Text className="text-white font-bold">
                                      Deselect
                                    </Text>
                                  ) : (
                                    <Text className="text-white font-bold">
                                      Select
                                    </Text>
                                  )}
                                </TouchableOpacity>
                              </View>
                            </View>
                          )}
                        </View>
                      </View>
                    );
                  }}
                />
                {noSelectedError ? (
                  <Text className="text-red-500 mt-2 ml-5 font-semibold">
                    {noSelectedError}
                  </Text>
                ) : null}
              </View>
            )}
            <View className="flex items-center mt-2">
              <TouchableOpacity
                className="ml-2 bg-jet px-4 py-2 rounded-full mb-2"
                onPress={handleCreate}
              >
                <Text className="text-white font-bold">Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
      />
    </View>
  );
};

export default NewChat;
