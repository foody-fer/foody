import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { apiCall, queryClient } from "@/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignIn = () => {
  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleInputChange = (text) => setInput(text);
  const handlePasswordChange = (text) => setPassword(text);

  const handleSubmit = async () => {
    try {
      const res = await apiCall("/auth", {
        method: "POST",
        body: JSON.stringify({
          user: {
            email: input,
            password: password,
          },
        }),
      });

      await AsyncStorage.setItem("token", res.token);
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      router.dismissTo("/");
    } catch (error) {
      setErrorMessage("Invalid email or password");
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-[#CFE1B9]">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        className="w-full p-4 font-quicksand"
      >
        <View className="items-center mb-4">
          <Image
            source={require("../images/logo.png")}
            className="w-36 h-36"
            resizeMode="contain"
          />
        </View>

        <View className="bg-white rounded-2xl p-4 shadow-md w-11/12 max-w-md mx-auto">
          <Text className="font-quicksand text-lg font-bold text-center text-[#373737] mb-2">
            Welcome Back
          </Text>
          <Text className="font-quicksand text-sm text-center text-[#575A4B] mb-4">
            We've missed you! Log in to continue.
          </Text>

          <View className="mb-3">
            <TextInput
              className="font-quicksand border border-[#AEB5A1] rounded-full px-4 py-3 bg-[#F8FBEF] text-sm"
              placeholder="E-mail / Username"
              value={input}
              onChangeText={handleInputChange}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View className="mb-3">
            <TextInput
              className="font-quicksand border border-[#AEB5A1] rounded-full px-4 py-3 bg-[#F8FBEF] text-sm"
              placeholder="Password"
              value={password}
              onChangeText={handlePasswordChange}
              secureTextEntry
            />
          </View>

          {errorMessage && (
            <Text className="text-xs text-red-500 text-center mb-2">
              {errorMessage}
            </Text>
          )}

          <TouchableOpacity
            className="bg-[#575A4B] rounded-full px-4 py-3 items-center mt-4"
            onPress={handleSubmit}
          >
            <Text className="text-white text-sm font-bold">Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="mt-4 items-center"
            onPress={() => router.push("/sign-up")}
          >
            <Text className="text-sm text-center text-[#373737]">
              Don’t have an account?{" "}
              <Text className="text-[#718355] underline">Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignIn;
