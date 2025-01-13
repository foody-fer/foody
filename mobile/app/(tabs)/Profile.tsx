import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField } from "@/components/ui/input";
import { View, FlatList } from "react-native";
import { useFonts, Quicksand_400Regular } from "@expo-google-fonts/quicksand";
import { useState } from "react";
import { Button, ButtonText } from "@/components/ui/button";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "@/components/ui/CustomText";
import { apiCall } from ".";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";

const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => apiCall("/auth"),
  });
};

export default function ProfileScreen() {
  let fonts = useFonts({
    Quicksand_400Regular,
  });

  const [name, setName] = useState("Ime Prezime");
  const [bio, setBio] = useState("Enter your bio!");
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Posts");
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  const { data, isLoading, error } = useUser();

  const [posts, setPosts] = useState([
    { name: "Post 1", id: "1" },
    { name: "Post 2", id: "2" },
    { name: "Post 3", id: "3" },
    { name: "Post 4", id: "4" },
    { name: "Post 5", id: "5" },
    { name: "Post 6", id: "6" },
    { name: "Post 7", id: "7" },
    { name: "Post 8", id: "8" },
    { name: "Post 9", id: "9" },
    { name: "Post 10", id: "10" },
  ]);

  const [recipes, setRecipes] = useState([
    { name: "Recipe 1", id: "1" },
    { name: "Recipe 2", id: "2" },
    { name: "Recipe 3", id: "3" },
    { name: "Recipe 4", id: "4" },
    { name: "Recipe 5", id: "5" },
    { name: "Recipe 6", id: "6" },
    { name: "Recipe 7", id: "7" },
    { name: "Recipe 8", id: "8" },
    { name: "Recipe 9", id: "9" },
    { name: "Recipe 10", id: "10" },
  ]);

  const toggleEditName = () => setIsEditingName((prev) => !prev);
  const toggleEditBio = () => setIsEditingBio((prev) => !prev);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePicture(result.assets[0].uri);
    }
  };

  const renderContent = () => {
    switch (selectedTab) {
      case "Posts":
        return (
          <FlatList
            className="w-3/4"
            keyExtractor={(item) => item.id}
            data={posts}
            renderItem={({ item }) => (
              <Text className="text-jet mt-10 p-10 bg-resedagreen font-quicksand">
                {item.name}
              </Text>
            )}
          />
        );
      case "Recipes":
        return (
          <FlatList
            className="w-3/4"
            keyExtractor={(item) => item.id}
            data={recipes}
            renderItem={({ item }) => (
              <Text className="text-jet mt-10 p-10 bg-resedagreen font-quicksand">
                {item.name}
              </Text>
            )}
          />
        );
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Text>Error</Text>;
  }

  return (
    <View className="flex-1 bg-teagreen">
      <View className="p-10">
        <HStack space="xl" className="items-center">
          <Avatar className="bg-resedagreen">
            {data.avatar ? (
              <AvatarImage
                source={{ uri: data.avatar }}
                className="w-full h-full"
              />
            ) : (
              <AvatarFallbackText className="font-quicksand">
                {data.name}
              </AvatarFallbackText>
            )}
          </Avatar>
          <Ionicons
            name="create"
            size={20}
            onPress={pickImageAsync}
            className="text-jet"
          />
          {isEditingName ? (
            <Input variant="outline" isDisabled={false} className="flex-1">
              <InputField
                onChangeText={setName}
                placeholder={name}
                className="text-jet font-quicksand py-2"
              />
            </Input>
          ) : (
            <Text className=" text-jet text-2xl font-quicksand">{name}</Text>
          )}
          <Ionicons
            name="create"
            size={20}
            onPress={toggleEditName}
            className="text-jet"
          />
        </HStack>

        <Text className="text-jet text-2xl font-quicksand">
          {data.first_name}
        </Text>

        <View className="flex-row mt-10 items-center">
          {isEditingBio ? (
            <Input variant="outline" isDisabled={false} className="flex-1">
              <InputField
                onChangeText={setBio}
                placeholder={bio}
                className="text-jet font-quicksand py-2"
              />
            </Input>
          ) : (
            <Input variant="outline" isDisabled={true} className="flex-1">
              <InputField
                onChangeText={setBio}
                placeholder={bio}
                className="text-jet font-quicksand py-2"
              />
            </Input>
          )}

          <Ionicons
            name="create"
            size={20}
            onPress={toggleEditBio}
            className="text-jet"
          />
        </View>
      </View>

      <View className="flex-row mt-4 justify-center">
        {selectedTab === "Posts" ? (
          <Button
            className="bg-jet mr-3"
            onPress={() => setSelectedTab("Posts")}
          >
            <ButtonText className="">Posts</ButtonText>
          </Button>
        ) : (
          <Button
            variant="outline"
            className="mr-3"
            onPress={() => setSelectedTab("Posts")}
          >
            <ButtonText className="">Posts</ButtonText>
          </Button>
        )}

        {selectedTab === "Recipes" ? (
          <Button
            className="bg-jet mr-3"
            onPress={() => setSelectedTab("Recipes")}
          >
            <ButtonText className="">Recipes</ButtonText>
          </Button>
        ) : (
          <Button
            variant="outline"
            className="mr-3"
            onPress={() => setSelectedTab("Recipes")}
          >
            <ButtonText className="">Recipes</ButtonText>
          </Button>
        )}
      </View>

      <View className="flex-1 ml-10 mr-10 mb-10 items-center">
        {renderContent()}
      </View>
    </View>
  );
}
