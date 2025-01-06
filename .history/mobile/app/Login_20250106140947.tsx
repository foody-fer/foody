import { Text } from "@/components/ui/CustomText";
import React from "react";
import { View, TouchableOpacity, Image } from "react-native";

const api = ""; // backend

function Login({ disabled }: { disabled: boolean }) {
  return (
    <View className="flex-1 justify-evenly items-center bg-[#cfe1b9] p-5">
      <View className="items-center">
        <Image
          source={require("../images/logo.png")}
          style={{ width: 150, height: 150 }} // Precizne dimenzije za logo
          resizeMode="contain"
          alt="Logo"
        />
      </View>

      <View className="space-y-4">
        <TouchableOpacity
          onPress={() => {
            if (!disabled)
              window.location.href = `${api}/oauth2/authorization/google`;
          }}
          className={`flex-row items-center justify-center rounded-full py-4 px-8 border-2 ${
            disabled
              ? "opacity-70"
              : "opacity-100 bg-[#718355] border-[#718355]"
          }`}
          disabled={disabled}
        >
          <View className="flex-row items-center">
            <Image
              source={require("../images/google-logo.png")}
              className="mr-2"
              style={{ width: 24, height: 24 }}
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
          className={`flex-row items-center justify-center rounded-full py-4 px-8 border-2 ${
            disabled
              ? "opacity-70"
              : "opacity-100 bg-[#718355] border-[#718355]"
          }`}
          disabled={disabled}
        >
          <View className="flex-row items-center">
            <Image
              source={require("../images/github-logo.png")}
              className="mr-2"
              style={{ width: 24, height: 24 }}
            />
            <Text className="text-lg font-bold text-white">
              Sign up with GitHub
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View className="flex-row items-center">
        <View className="flex-1 h-px bg-black" />
        <Text className="mx-3 text-lg font-bold">or</Text>
        <View className="flex-1 h-px bg-black" />
      </View>

      <View className="space-y-2">
        <TouchableOpacity
          onPress={() => {
            if (!disabled) window.location.href = "/sign-up";
          }}
          className={`rounded-full py-4 px-8 ${
            disabled ? "opacity-70" : "opacity-100 bg-[#575a4b]"
          }`}
          disabled={disabled}
        >
          <Text className="text-lg font-bold text-white">
            Create an account
          </Text>
        </TouchableOpacity>

        <Text className="text-lg font-bold text-[#575a4b]">
          Already have an account?
        </Text>

        <TouchableOpacity
          onPress={() => {
            if (!disabled) window.location.href = "/sign-in";
          }}
          className={`rounded-full py-4 px-8 ${
            disabled ? "opacity-70" : "opacity-100 bg-[#575a4b]"
          }`}
          disabled={disabled}
        >
          <Text className="text-lg font-bold text-white">Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Login;
