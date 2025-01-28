import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import { apiCall } from "./(tabs)";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const ViewMembers = () => {
  return <View className="flex-1 bg-[#CFE1B9]"></View>;
};

export default ViewMembers;
