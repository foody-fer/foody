import React from "react";
import { Image, View } from "react-native";

function Logo() {
  return (
    <View className="items-center justify-center">
      <Image
        source={require("../../images/logo.png")}
        className="w-9/12 h-auto"
        resizeMode="contain"
        alt="Logo"
      />
    </View>
  );
}

export default Logo;
