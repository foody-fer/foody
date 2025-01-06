import { Text } from "@/components/ui/CustomText";
import React from "react";
import { View, TouchableOpacity, Image } from "react-native";

const api = ""; // backend

function Login({ disabled }: { disabled: boolean }) {
  return (
    <View className="flex-1 items-center justify-center bg-white p-5">
      <TouchableOpacity
        onPress={() => {
          if (!disabled)
            window.location.href = `${api}/oauth2/authorization/google`;
        }}
        className={`flex-row items-center justify-center rounded-full py-4 px-8 my-2 border-2 ${
          disabled ? "opacity-70" : "opacity-100 bg-[#8DB596] border-[#B5D6A7]"
        }`}
        disabled={disabled}
      >
        <View className="flex-row items-center">
          <Image
            source={require("../images/google-logo.png")}
            className="w-6 h-6 mr-2"
          />
          <Text className="text-lg font-bold text-white">
            Sign up with Google
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          if (!disabled)
            window.location.href = `${api}/oauth2/authorization/github`;
        }}
        className={`flex-row items-center justify-center rounded-full py-4 px-8 my-2 border-2 ${
          disabled ? "opacity-70" : "opacity-100 bg-[#8DB596] border-[#B5D6A7]"
        }`}
        disabled={disabled}
      >
        <View className="flex-row items-center">
          <Image
            source={require("../images/github-logo.png")}
            className="w-6 h-6 mr-2"
          />
          <Text className="text-lg font-bold text-white">
            Sign up with GitHub
          </Text>
        </View>
      </TouchableOpacity>

      <View className="flex-row items-center my-5">
        <View className="flex-1 h-px bg-black" />
        <Text className="mx-3 text-lg font-bold">or</Text>
        <View className="flex-1 h-px bg-black" />
      </View>

      <TouchableOpacity
        onPress={() => {
          if (!disabled) window.location.href = "/sign-up";
        }}
        className={`rounded-full py-4 px-8 my-2 ${
          disabled ? "opacity-70" : "opacity-100 bg-[#5D5A4E]"
        }`}
        disabled={disabled}
      >
        <Text className="text-lg font-bold text-white">Create an account</Text>
      </TouchableOpacity>

      <Text className="mt-2 text-lg font-bold text-[#B5D6A7]">
        Already have an account?
      </Text>

      <TouchableOpacity
        onPress={() => {
          if (!disabled) window.location.href = "/sign-in";
        }}
        className={`rounded-full py-4 px-8 my-2 ${
          disabled ? "opacity-70" : "opacity-100 bg-[#5D5A4E]"
        }`}
        disabled={disabled}
      >
        <Text className="text-lg font-bold text-white">Sign in</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Login;
