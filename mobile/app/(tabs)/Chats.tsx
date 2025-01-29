import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { apiCall } from ".";
import { useQuery } from "@tanstack/react-query";
import {
  Avatar,
  AvatarImage,
  AvatarFallbackText,
} from "@/components/ui/avatar";

const ChatScreen = () => {
  const [lastMessages, setLastMessages] = useState({});

  const chatsQuery = useQuery({
    queryKey: ["chats"],
    queryFn: () => apiCall("/chat_groups"),
    retry: false,
  });
  const router = useRouter();

  const handlePressGroup = (id) => {
    router.push({
      pathname: "../Chat",
      params: { id },
    });
  };

  const handlePlus = () => {
    router.push("../New-chat");
  };

  const fetchLastMessages = async (id) => {
    try {
      const response = await apiCall(`/chat_groups/${id}/messages`, {
        method: "GET",
      });

      const lastMessage = response[0]?.content || "No messages yet";
      setLastMessages((prev) => ({ ...prev, [id]: lastMessage }));
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  useEffect(() => {
    if (chatsQuery.data) {
      chatsQuery.data.forEach((chat) => {
        fetchLastMessages(chat.id);
      });
    }
  }, [chatsQuery.data]);

  return (
    <SafeAreaView className="flex-1 bg-[#CFE1B9]">
      <FlatList
        contentContainerStyle={{ paddingVertical: 10 }}
        className="flex-1 px-4"
        data={chatsQuery.data || []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => handlePressGroup(item.id)}
            className="flex-row items-center p-4 mb-2 bg-[#F8FBEF] rounded-xl shadow"
          >
            {item.is_dm === true ? (
              <Avatar className="bg-resedagreen mr-4">
                {item?.avatar ? (
                  <AvatarImage
                    source={{ uri: item?.avatar }}
                    className="w-full h-full"
                  />
                ) : (
                  <AvatarFallbackText className="font-quicksand">
                    {item?.members[1].user.username}
                  </AvatarFallbackText>
                )}
              </Avatar>
            ) : (
              <Avatar className="bg-resedagreen mr-4">
                {item?.image ? (
                  <AvatarImage
                    source={{ uri: item?.image }}
                    className="w-full h-full"
                  />
                ) : (
                  <AvatarFallbackText className="font-quicksand">
                    {item?.name}
                  </AvatarFallbackText>
                )}
              </Avatar>
            )}
            <View>
              <Text className="text-[#575A4B] font-bold text-lg">
                {item.name}
              </Text>
              <Text className="text-[#718355] text-sm">
                {lastMessages[item.id] || "Loading..."}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity className="absolute bottom-5 left-3/4 bg-[#718355] rounded-full">
        <Ionicons
          name="add-circle-outline"
          size={50}
          color="#FFFFFF"
          className="p-2"
          onPress={handlePlus}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ChatScreen;
