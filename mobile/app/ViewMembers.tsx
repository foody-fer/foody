import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import { apiCall } from "./(tabs)";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import {
  Avatar,
  AvatarImage,
  AvatarFallbackText,
} from "@/components/ui/avatar";

const ViewMembers = () => {
  const { id } = useLocalSearchParams();

  const membersQuery = useQuery({
    queryKey: ["members"],
    queryFn: () => apiCall(`/chat_groups/${id}/members`),
    retry: false,
  });

  return (
    <View className="flex-1 bg-[#CFE1B9]">
      <View className="mt-10 ml-5 mr-5">
        <Text className="font-semibold text-4xl mb-5">View members</Text>
        <FlatList
          data={membersQuery.data || []}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View key={item.id} className="flex-row items-center mb-2">
              <Avatar className="bg-resedagreen mr-2">
                {item.user?.avatar ? (
                  <AvatarImage
                    source={{ uri: item.user?.avatar }}
                    className="w-full h-full"
                  />
                ) : (
                  <AvatarFallbackText className="font-quicksand">
                    {item.user?.username}
                  </AvatarFallbackText>
                )}
              </Avatar>
              <Text className="text-xl">{item.user?.username}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default ViewMembers;
