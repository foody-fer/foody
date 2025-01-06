import React from "react";
import { Image, View } from "react-native";

function Logo() {
  return (
    <View className="items-center justify-center">
      <Image
        source={require("../../images/logo.png")}
        className="w-100 h-35 h-auto"
        resizeMode="contain"
        alt="Logo"
      />
    </View>
  );
}

export default Logo;
