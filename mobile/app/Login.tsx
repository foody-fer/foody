import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Text } from "@/components/ui/CustomText";
import { useRouter } from "expo-router";

const api = process.env.BACKEND_URL || "https://foody-backend.zeko.run/api/v1"; // Dynamically fetch backend URL

function Login() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGoogleLogin = () => {
    console.log("google login");
  };

  const handleGithubLogin = () => {
    console.log("github login");
  };

  return (
    <View className="flex-1 justify-center items-center bg-[#cfe1b9] p-5">
      <View className="items-center">
        <Image
          source={require("../images/logo.png")}
          style={{ width: 150, height: 150 }}
          resizeMode="contain"
          alt="Logo"
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#718355" className="my-4" />
      ) : (
        <>
          {/* Google Login */}
          <TouchableOpacity
            onPress={() => handleGoogleLogin()}
            className="flex-row items-center justify-center rounded-full py-4 px-8 my-2 opacity-100 bg-[#718355] border-[#718355] border-2"
          >
            <View className="flex-row items-center">
              <Image
                source={require("../images/google-logo.png")}
                style={{ width: 24, height: 24 }}
              />
              <Text className="text-lg font-bold text-white ml-2">
                Sign up with Google
              </Text>
            </View>
          </TouchableOpacity>

          {/* GitHub Login */}
          <TouchableOpacity
            onPress={() => handleGithubLogin()}
            className="flex-row items-center justify-center rounded-full py-4 px-8 my-2 opacity-100 bg-[#718355] border-[#718355] border-2"
          >
            <View className="flex-row items-center">
              <Image
                source={require("../images/github-logo.png")}
                style={{ width: 24, height: 24 }}
              />
              <Text className="text-lg font-bold text-white ml-2">
                Sign up with GitHub
              </Text>
            </View>
          </TouchableOpacity>

          {/* Divider */}
          <View className="flex-row items-center my-5">
            <View className="flex-1 h-px bg-black" />
            <Text className="mx-3 text-lg font-bold">or</Text>
            <View className="flex-1 h-px bg-black" />
          </View>

          {/* Create Account */}
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/sign-up",
              })
            }
            className="rounded-full py-4 px-8 my-2 bg-[#575a4b]"
          >
            <Text className="text-lg font-bold text-white">
              Create an account
            </Text>
          </TouchableOpacity>

          {/* Sign In */}
          <Text className="mt-2 text-lg font-bold text-[#575a4b]">
            Already have an account?
          </Text>
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/sign-in",
              })
            }
            className="rounded-full py-4 px-8 my-2 bg-[#575a4b]"
          >
            <Text className="text-lg font-bold text-white">Sign in</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

export default Login;
