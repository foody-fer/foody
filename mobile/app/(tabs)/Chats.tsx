import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const ChatScreen = () => {
  const router = useRouter();
  const chats = [
    {
      id: 1,
      name: "Grupa 1",
      lastMessage: "Zadnja porukaaaa",
    },
    {
      id: 2,
      name: "Random Group",
      lastMessage: "Zadnja poruka",
    },
    {
      id: 3,
      name: "Random Group",
      lastMessage: "Zadnja poruka bla bla bla bla",
    },
  ];

  const handlePressGroup = () => {
    router.push("../Chat");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#CFE1B9]">
      {/* Header */}
      <View className="flex-row justify-between items-center px-4 py-2 bg-[#718355]">
        <Text className="text-white text-2xl font-bold">Chats</Text>
        <TouchableOpacity>
          <Ionicons name="add-circle-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Chats List */}
      <ScrollView
        contentContainerStyle={{ paddingVertical: 10 }}
        className="flex-1 px-4"
      >
        {chats.map((chat) => (
          <TouchableOpacity
            key={chat.id}
            onPress={handlePressGroup}
            className="flex-row items-center p-4 mb-2 bg-[#F8FBEF] rounded-xl shadow"
          >
            {/* Chat Icon */}
            <View className="w-12 h-12 bg-[#CFE1B9] rounded-full mr-4" />
            {/* Chat Info */}
            <View>
              <Text className="text-[#575A4B] font-bold text-lg">
                {chat.name}
              </Text>
              <Text className="text-[#718355] text-sm">{chat.lastMessage}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChatScreen;
