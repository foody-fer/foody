import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

const api = ""; // backend

function Login({ disabled }: { disabled: boolean }) {
  return (
    <View className="flex-1 items-center justify-center bg-white p-5">
      {/* Google Button */}
      <TouchableOpacity
        onPress={() => {
          if (!disabled)
            window.location.href = `${api}/oauth2/authorization/google`;
        }}
        disabled={disabled}
        className={`w-full items-center justify-center rounded-lg py-4 px-8 my-2 ${
          !disabled ? "opacity-100" : "opacity-70"
        } bg-[#8DB596] border-2 border-[#B5D6A7]`}
      >
        <View className="flex-row items-center">
          <Image
            source={require("../images/google-logo.png")}
            className="w-6 h-6 mr-2"
          />
          <Text className="text-white text-lg font-bold">
            Sign up with Google
          </Text>
        </View>
      </TouchableOpacity>

      {/* GitHub Button */}
      <TouchableOpacity
        onPress={() => {
          if (!disabled)
            window.location.href = `${api}/oauth2/authorization/github`;
        }}
        disabled={disabled}
        className={`w-full items-center justify-center rounded-lg py-4 px-8 my-2 ${
          !disabled ? "opacity-100" : "opacity-70"
        } bg-[#8DB596] border-2 border-[#B5D6A7]`}
      >
        <View className="flex-row items-center">
          <Image
            source={require("../images/github-logo.png")}
            className="w-6 h-6 mr-2"
          />
          <Text className="text-white text-lg font-bold">
            Sign up with GitHub
          </Text>
        </View>
      </TouchableOpacity>

      {/* OR Divider */}
      <View className="flex-row items-center my-5">
        <View className="flex-1 h-[1px] bg-black" />
        <Text className="mx-2 text-lg font-bold">or</Text>
        <View className="flex-1 h-[1px] bg-black" />
      </View>

      {/* Create Account Button */}
      <TouchableOpacity
        onPress={() => {
          if (!disabled) window.location.href = "/sign-up";
        }}
        disabled={disabled}
        className={`w-full items-center justify-center rounded-lg py-4 px-8 my-2 ${
          !disabled ? "opacity-100" : "opacity-70"
        } bg-[#5D5A4E]`}
      >
        <Text className="text-white text-lg font-bold">Create an account</Text>
      </TouchableOpacity>

      {/* Already Have Account Text */}
      <Text className="mt-2 text-lg font-bold text-[#B5D6A7]">
        Already have an account?
      </Text>

      {/* Sign In Button */}
      <TouchableOpacity
        onPress={() => {
          if (!disabled) window.location.href = "/sign-in";
        }}
        disabled={disabled}
        className={`w-full items-center justify-center rounded-lg py-4 px-8 my-2 ${
          !disabled ? "opacity-100" : "opacity-70"
        } bg-[#5D5A4E]`}
      >
        <Text className="text-white text-lg font-bold">Sign in</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Login;
