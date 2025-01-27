import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { apiCall } from ".";
import { useQuery } from "@tanstack/react-query";

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
            <View className="w-12 h-12 bg-[#CFE1B9] rounded-full mr-4" />
            <View>
              <Text className="text-[#575A4B] font-bold text-lg">
                {item.name}
              </Text>
              <Text className="text-[#718355] text-sm">
                {lastMessages[item.id] || "Loading..."}
              </Text>
              {/* probati napraviti last message */}
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
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ChatScreen;
