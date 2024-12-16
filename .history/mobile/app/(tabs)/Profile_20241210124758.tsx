import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField } from "@/components/ui/input";
import { Text, TextInput, View } from "react-native";
import { useFonts, Quicksand_400Regular } from "@expo-google-fonts/quicksand";
import { useState } from "react";
import { Button, ButtonText } from "@/components/ui/button";

export default function ProfileScreen() {
  let fonts = useFonts({
    Quicksand_400Regular,
  });

  const [name, setName] = useState("Ime Prezime");
  const [bio, setBio] = useState("This is my bio!");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Posts");

  const toggleEdit = () => setIsEditing((prev) => !prev);

  return (
    <>
      <View className="flex-1 p-10 bg-teagreen">
        <HStack space="xl" className="items-center">
          <Avatar className="bg-resedagreen">
            <AvatarFallbackText className="font-quicksand">
              {name}
            </AvatarFallbackText>
          </Avatar>
          <Text className="font-quicksand text-jet text-3xl">{name}</Text>
        </HStack>

        <View className="flex-row mt-2 pt-4">
          {isEditing ? (
            <Input
              variant="outline"
              size="lg"
              isDisabled={false}
              className="font-quicksand text-jet"
            >
              <InputField placeholder="Enter your bio" />
            </Input>
          ) : (
            <Input
              variant="outline"
              size="lg"
              isDisabled={true}
              className="font-quicksand text-jet"
            >
              <InputField placeholder="Enter your bio" />
            </Input>
          )}

          <Button size="lg" variant="solid" className="bg-jet ml-3">
            <ButtonText className="font-quicksand" onPress={toggleEdit}>
              {isEditing ? "Save bio" : "Edit bio"}
            </ButtonText>
          </Button>
        </View>
      </View>

      <View></View>
    </>
  );
}
