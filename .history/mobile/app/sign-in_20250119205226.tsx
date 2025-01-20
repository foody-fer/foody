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
      router.push("/");
    } catch (error) {
      setErrorMessage("Invalid email or password");
    }
  };

  return (
    <ScrollView className="flex-grow bg-[#CFE1B9] p-4">
      <View className="items-center mb-4">
        <Image
          source={require("../images/logo.png")}
          className="w-36 h-36"
          resizeMode="contain"
        />
      </View>

      <View className="bg-white rounded-2xl p-4 shadow-md w-11/12 max-w-md mx-auto">
        <Text className="text-lg font-bold text-center text-[#373737] mb-2 font-quicksand">
          Welcome Back
        </Text>
        <Text className="text-sm text-center text-[#575A4B] mb-4 font-quicksand">
          We've missed you! Log in to continue.
        </Text>

        <View className="mb-3">
          <TextInput
            className="border border-[#AEB5A1] rounded-full px-4 py-3 bg-[#F8FBEF] text-sm font-quicksand"
            placeholder="E-mail / Username"
            value={input}
            onChangeText={handleInputChange}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View className="mb-3">
          <TextInput
            className="border border-[#AEB5A1] rounded-full px-4 py-3 bg-[#F8FBEF] text-sm font-quicksand"
            placeholder="Password"
            value={password}
            onChangeText={handlePasswordChange}
            secureTextEntry
          />
        </View>

        {errorMessage && (
          <Text className="text-xs text-red-500 text-center mb-2 font-quicksand">
            {errorMessage}
          </Text>
        )}

        <TouchableOpacity
          className="bg-[#575A4B] rounded-full px-4 py-3 items-center mt-4"
          onPress={handleSubmit}
        >
          <Text className="text-white text-sm font-bold font-quicksand">
            Sign In
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="mt-4 items-center"
          onPress={() => router.push("/sign-up")}
        >
          <Text className="text-sm text-center text-[#373737] font-quicksand">
            Don’t have an account?{" "}
            <Text className="text-[#718355] underline">Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignIn;
