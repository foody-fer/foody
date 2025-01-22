import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Welcome to the chat!", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;

    const newMessage = { id: Date.now(), text: input, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    // Simulate bot response
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now() + 1, text: "Got it!", sender: "bot" },
      ]);
    }, 1000);

    setInput("");
  };

  return (
    <View className="flex-1 bg-[#CFE1B9]">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          className="flex-1 p-4"
          contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-end" }}
        >
          {messages.map((message) => (
            <View
              key={message.id}
              className={`mb-2 p-3 rounded-xl ${
                message.sender === "user"
                  ? "bg-[#F8FBEF] self-end"
                  : "bg-white self-start"
              } shadow-md`}
            >
              <Text
                className={`text-sm font-quicksand ${
                  message.sender === "user"
                    ? "text-[#575A4B]"
                    : "text-[#373737]"
                }`}
              >
                {message.text}
              </Text>
            </View>
          ))}
        </ScrollView>

        <View
          className="flex-row items-center bg-white p-3 shadow-md"
          style={{ paddingBottom: 20 }}
        >
          <TextInput
            className="flex-1 font-quicksand border border-[#AEB5A1] rounded-full px-4 py-3 bg-[#F8FBEF] text-sm"
            placeholder="Type a message..."
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity
            className="ml-3 bg-[#575A4B] rounded-full px-4 py-3"
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
