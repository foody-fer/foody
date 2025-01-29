import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { apiCall } from "./(tabs)";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import {
  Avatar,
  AvatarImage,
  AvatarFallbackText,
} from "@/components/ui/avatar";
import * as ImagePicker from "expo-image-picker";
import { queryClient } from "@/api";

const EditGroup = () => {
  const { id } = useLocalSearchParams();
  const [chat, setChat] = useState<any>();
  const [editingName, setEditingName] = useState(false);
  const [groupName, setGroupName] = useState("");

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const response = await apiCall(`/chat_groups/${id}`, {
          method: "GET",
        });
        setChat(response);
        setGroupName(response.name);
      } catch (error) {
        console.error("Error in fetchGroup: ", error);
      }
    };

    fetchGroup();
  }, []);

  const toggleEdit = () => {
    if (editingName === false) {
      setEditingName(true);
    } else {
      setEditingName(false);
      handleSaveGroup();
    }
  };

  const handleSaveGroup = async () => {
    if (groupName === "") return;

    const formData = new FormData();
    formData.append("chat_group[name]", groupName);

    try {
      const response = await apiCall(`/chat_groups/${id}`, {
        method: "PATCH",
        body: formData,
      });

      queryClient.invalidateQueries({ queryKey: ["chats"] });

      console.log(response);
    } catch (error) {
      console.error("Error updating groupname: ", error);
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

        const formData = new FormData();
        // @ts-ignore
        formData.append("chat_group[image]", {
          uri: fileUri,
          type: "image/jpeg",
          name: "image.jpg",
        });

        const data = await apiCall(`/chat_groups/${id}`, {
          method: "PATCH",
          body: formData,
        });
      }
    } catch (error) {
      console.error("Error sending image: ", error);
    }
  };

  return (
    <View className="flex-1 bg-[#CFE1B9]">
      <View className="mt-10 ml-5 mr-5">
        <Text className="font-semibold text-4xl mb-5">Edit Group</Text>
        <View className="mb-2">
          <Text className="text-base mb-2 font-bold">Group name:</Text>
          <View className="flex-row items-center">
            <TextInput
              className={`flex-1 border rounded-full px-3 py-2 text-base`}
              editable={editingName === true}
              value={groupName}
              onChangeText={setGroupName}
            />
            <TouchableOpacity
              className="ml-2 bg-jet px-4 py-2 rounded-full"
              onPress={toggleEdit}
            >
              <Text className="text-white font-bold">
                {editingName === true ? "Save" : "Edit"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="mb-2">
          <Text className="text-base mb-2 font-bold">Group image:</Text>
          <View className="flex-row items-center">
            <Avatar className="bg-resedagreen">
              {chat?.image ? (
                <AvatarImage
                  source={{ uri: chat?.image }}
                  className="w-full h-full"
                />
              ) : (
                <AvatarFallbackText className="font-quicksand">
                  {chat?.name}
                </AvatarFallbackText>
              )}
            </Avatar>
            <TouchableOpacity
              className="ml-2 bg-jet px-4 py-2 rounded-full"
              onPress={pickImageAsync}
            >
              <Text className="text-white font-bold">Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default EditGroup;
