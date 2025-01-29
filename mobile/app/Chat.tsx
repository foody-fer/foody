import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { apiCall } from "./(tabs)";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { Spinner } from "@/components/ui/spinner";
import { Menu, MenuItem, MenuItemLabel } from "@/components/ui/menu";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useFocusEffect } from "expo-router";
import {
  Avatar,
  AvatarImage,
  AvatarFallbackText,
} from "@/components/ui/avatar";

const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => apiCall("/auth"),
  });
};
const Chat = () => {
  const router = useRouter();
  const [chat, setChat] = useState<any>();
  const { data: user, isLoading, error } = useUser();

  {
    isLoading && <Spinner />;
  }

  {
    error && <Text>Error</Text>;
  }

  const { id } = useLocalSearchParams();

  useFocusEffect(
    React.useCallback(() => {
      const fetchGroups = async () => {
        try {
          const response = await apiCall(`/chat_groups/${id}`, {
            method: "GET",
          });
          setChat(response);
        } catch (error) {
          console.error("Error in fetchGroups: ", error);
        }
      };

      fetchGroups();
    }, [id])
  );

  const messagesQuery = useQuery({
    queryKey: ["messages"],
    queryFn: () => apiCall(`/chat_groups/${id}/messages`),
    retry: false,
    refetchOnWindowFocus: true,
  });

  {
    isLoading && <Spinner />;
  }

  {
    error && <Text>Error</Text>;
  }
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (input.trim() === "") return;

    const formData = new FormData();
    formData.append("message[content]", input);

    try {
      const response = await apiCall(`/chat_groups/${id}/messages`, {
        method: "POST",
        body: formData,
      });
    } catch (error) {
      console.error("Error sending message: ", error);
    }

    messagesQuery.refetch();
    setInput("");
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
        formData.append("message[attachment]", blob);
        console.log(formData);

        const data = await apiCall(`/chat_groups/${id}/messages`, {
          method: "POST",
          body: formData,
        });

        messagesQuery.refetch();
      }
    } catch (error) {
      console.error("Error sending image: ", error);
    }
  };

  const handleEditGroup = (id) => {
    router.push({
      pathname: "../EditGroup",
      params: { id },
    });
  };

  const handleViewMembers = (id) => {
    router.push({
      pathname: "../ViewMembers",
      params: { id },
    });
  };

  return (
    <View className="flex-1 bg-[#CFE1B9]">
      <View className="flex-row pt-10 items-center justify-between pl-5 pr-5 pb-5 bg-[#718355] drop-shadow-md">
        <View className="flex-row items-center">
          {/* PROBATI DODATI FALLBACK IMAGE*/}
          <View className="w-12 h-12 bg-[#CFE1B9] rounded-full mr-4">
            {chat?.is_dm === true && (
              <Image
                source={{ uri: chat?.members[1]?.avatar }}
                className="w-12 h-12 rounded-full"
              />
            )}
            {chat?.image && (
              <Image
                source={{ uri: chat?.image }}
                className="w-12 h-12 rounded-full"
              />
            )}
          </View>
          <View>
            {chat?.is_dm === true ? (
              <Text className="text-xl">
                {chat?.members[1].user.first_name}{" "}
                {chat?.members[1].user.last_name}
              </Text>
            ) : (
              <Text className="text-xl">{chat?.name}</Text>
            )}
          </View>
        </View>
        {chat?.is_dm === false && (
          <Menu
            placement="bottom"
            offset={5}
            trigger={({ ...triggerProps }) => {
              return (
                <TouchableOpacity {...triggerProps}>
                  <Ionicons name="ellipsis-horizontal" size={30}></Ionicons>
                </TouchableOpacity>
              );
            }}
          >
            <MenuItem
              key="View members"
              textValue="View members"
              onPress={() => handleViewMembers(chat.id)}
            >
              <MenuItemLabel size="sm">View members</MenuItemLabel>
            </MenuItem>
            <MenuItem
              key="Edit group"
              textValue="Edit group"
              onPress={() => handleEditGroup(chat.id)}
            >
              <MenuItemLabel size="sm">Edit group</MenuItemLabel>
            </MenuItem>
          </Menu>
        )}
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <FlatList
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-end" }}
          data={messagesQuery.data || []}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              key={item.id}
              className={`mb-2 rounded-xl ${
                item.user?.username === user?.username
                  ? "self-end"
                  : "self-start"
              } mr-2 ml-2 flex-row items-center`}
            >
              {item.user?.username !== user?.username && (
                <Avatar className="bg-resedagreen mr-2">
                  {item.user?.avatar ? (
                    <AvatarImage
                      source={{ uri: item.user?.avatar }}
                      className="w-full h-full"
                    />
                  ) : (
                    <AvatarFallbackText className="font-quicksand">
                      {item.user?.username}
                    </AvatarFallbackText>
                  )}
                </Avatar>
              )}
              {chat?.is_dm === false &&
              item.user?.username !== user?.username ? (
                <View className="shadow-md bg-[#F8FBEF] p-3 rounded-xl">
                  <Text className="text-sm font-quicksand text-[#718355]">
                    {item.user?.username}
                  </Text>
                  <Text className="text-md font-quicksand text-[#373737]">
                    {item.content}
                  </Text>
                </View>
              ) : (
                <Text
                  className={`text-md font-quicksand ${
                    item.user?.username === user?.username
                      ? "text-[#575A4B] bg-white shadow-md p-3 rounded-xl"
                      : "text-[#373737] bg-[#F8FBEF] shadow-md"
                  }`}
                >
                  {item.content}
                </Text>
              )}
            </View>
          )}
          inverted
        />

        <View
          className="flex-row items-center bg-white p-3 shadow-md"
          style={{ paddingBottom: 25, paddingTop: 15 }}
        >
          <TextInput
            className="flex-1 font-quicksand border border-[#AEB5A1] rounded-full px-4 py-3 bg-[#F8FBEF] text-sm mr-2"
            placeholder="Type a message..."
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity>
            <Ionicons
              name="attach-outline"
              size={35}
              color="#718355"
              onPress={pickImageAsync}
            />
          </TouchableOpacity>
          <TouchableOpacity
            className="ml-2 bg-[#575A4B] rounded-full px-4 py-3"
            onPress={handleSend}
          >
            <Text className="text-white text-sm font-bold">Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Chat;
