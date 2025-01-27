import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { apiCall } from "./(tabs)";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { Spinner } from "@/components/ui/spinner";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => apiCall("/auth"),
  });
};
const Chat = () => {
  const { data: user, isLoading, error } = useUser();

  {
    isLoading && <Spinner />;
  }

  {
    error && <Text>Error</Text>;
  }

  const { id } = useLocalSearchParams();
  const messagesQuery = useQuery({
    queryKey: ["messages"],
    queryFn: () => apiCall(`/chat_groups/${id}/messages`),
    retry: false,
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

  return (
    <View className="flex-1 bg-[#CFE1B9]">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <FlatList
          className="flex-1 mt-10"
          contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-end" }}
          data={messagesQuery.data || []}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              key={item.id}
              className={`mb-2 p-3 rounded-xl ${
                item.user?.username === user.username
                  ? "bg-[#F8FBEF] self-end"
                  : "bg-white self-start"
              } shadow-md mr-4`}
            >
              <Text
                className={`text-sm font-quicksand ${
                  item.user?.username === user.username
                    ? "text-[#575A4B]"
                    : "text-[#373737]"
                }`}
              >
                {item.content}
              </Text>
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
