import React from "react";
import { Text as RNText, TextProps as RNTextProps } from "react-native";

interface CustomTextProps extends RNTextProps {
  children: React.ReactNode;
}

export const Text = ({ children, style, ...props }: CustomTextProps) => {
  return (
    <RNText style={[{ fontFamily: "Quicksand_400Regular" }, style]} {...props}>
      {children}
    </RNText>
  );
};
