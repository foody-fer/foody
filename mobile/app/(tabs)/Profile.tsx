import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField } from "@/components/ui/input";
import { Text, TextInput, View, ScrollView } from "react-native";
{
  /*import { useFonts, Quicksand_400Regular } from "@expo-google-fonts/quicksand";*/
}
import { useState } from "react";
import { Button, ButtonText } from "@/components/ui/button";

export default function ProfileScreen() {
  {
    /*let fonts = useFonts({
    Quicksand_400Regular,
  });*/
  }

  const [name, setName] = useState("Ime Prezime");
  const [bio, setBio] = useState("This is my bio!");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Posts");

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const renderContent = () => {
    switch (selectedTab) {
      case "Posts":
        return (
          <ScrollView className="p-4">
            <Text className="text-jet">
              What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
              printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s, when an
              unknown printer took a galley of type and scrambled it to make a
              type specimen book. It has survived not only five centuries, but
              also the leap into electronic typesetting, remaining essentially
              unchanged. It was popularised in the 1960s with the release of
              Letraset sheets containing Lorem Ipsum passages, and more recently
              with desktop publishing software like Aldus PageMaker including
              versions of Lorem Ipsum. Why do we use it? It is a long
              established fact that a reader will be distracted by the readable
              content of a page when looking at its layout. The point of using
              Lorem Ipsum is that it has a more-or-less normal distribution of
              letters, as opposed to using 'Content here, content here', making
              it look like readable English. Many desktop publishing packages
              and web page editors now use Lorem Ipsum as their default model
              text, and a search for 'lorem ipsum' will uncover many web sites
              still in their infancy. Various versions have evolved over the
              years, sometimes by accident, sometimes on purpose (injected
              humour and the like). Where does it come from? Contrary to popular
              belief, Lorem Ipsum is not simply random text. It has roots in a
              piece of classical Latin literature from 45 BC, making it over
              2000 years old. Richard McClintock, a Latin professor at
              Hampden-Sydney College in Virginia, looked up one of the more
              obscure Latin words, consectetur, from a Lorem Ipsum passage, and
              going through the cites of the word in classical literature,
              discovered the undoubtable source. Lorem Ipsum comes from sections
              1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The
              Extremes of Good and Evil) by Cicero, written in 45 BC. This book
              is a treatise on the theory of ethics, very popular during the
              Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
              amet..", comes from a line in section 1.10.32. The standard chunk
              of Lorem Ipsum used since the 1500s is reproduced below for those
              interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum
              et Malorum" by Cicero are also reproduced in their exact original
              form, accompanied by English versions from the 1914 translation by
              H. Rackham. Where can I get some? There are many variations of
              passages of Lorem Ipsum available, but the majority have suffered
              alteration in some form, by injected humour, or randomised words
              which don't look even slightly believable. If you are going to use
              a passage of Lorem Ipsum, you need to be sure there isn't anything
              embarrassing hidden in the middle of text. All the Lorem Ipsum
              generators on the Internet tend to repeat predefined chunks as
              necessary, making this the first true generator on the Internet.
              It uses a dictionary of over 200 Latin words, combined with a
              handful of model sentence structures, to generate Lorem Ipsum
              which looks reasonable. The generated Lorem Ipsum is therefore
              always free from repetition, injected humour, or
              non-characteristic words etc.
            </Text>
          </ScrollView>
        );
      case "Recipes":
        return (
          <ScrollView className="p-4">
            <Text className="text-jet">
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
              posuere cubilia curae; Integer vel tellus eu ligula lacinia
              faucibus. Vestibulum at eros dictum, efficitur nisl eu, pulvinar
              libero. Maecenas volutpat risus a eros condimentum, sed faucibus
              nisl convallis. Suspendisse gravida vulputate erat, et fermentum
              sem vehicula pulvinar. Proin a tortor placerat, tristique nunc
              quis, ultricies sapien. Ut in sagittis dolor, non faucibus ex. Sed
              in dui commodo, ullamcorper eros a, efficitur nisi. Sed et
              imperdiet nisl. Donec scelerisque enim et erat facilisis
              consequat. Aliquam et mauris eu turpis tincidunt tempus nec quis
              nibh. Phasellus vulputate ante eu semper euismod. Etiam dignissim
              nulla in porttitor fringilla. Donec ullamcorper, neque quis
              aliquam posuere, mauris urna vestibulum elit, hendrerit eleifend
              mauris dolor quis nulla. Quisque in facilisis ante. Nam risus est,
              fringilla at tincidunt ac, convallis sit amet lacus. Quisque
              faucibus facilisis leo ac porta. Curabitur efficitur aliquam nisl.
              Etiam ut metus at nisi volutpat pulvinar sed at nisl. Sed suscipit
              tincidunt arcu molestie efficitur. Curabitur eu nisi et nibh
              placerat egestas. Nam ut tempus sem. Sed consequat molestie velit
              at maximus. Curabitur pulvinar est in sapien dictum, sed convallis
              ipsum rhoncus. Sed accumsan lectus ante, quis pellentesque felis
              vestibulum quis. Pellentesque tincidunt leo nisl, id vulputate sem
              dictum sed. Cras dictum arcu ut nibh dignissim, eget venenatis
              nisl blandit. Fusce convallis vulputate arcu, fringilla imperdiet
              urna ornare ac. Suspendisse non finibus nisi. Nunc sollicitudin
              nisl ac turpis mollis mattis. Vivamus et diam rutrum, egestas nisi
              quis, varius massa. Nunc non elementum libero. Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Proin et ligula ut nulla
              fringilla pretium. Nunc nunc lectus, aliquet vel tincidunt sit
              amet, tincidunt non neque. Aenean ac ligula mi. Proin quis lacus a
              dui sagittis posuere vitae ac augue. Vivamus iaculis nulla ac
              ipsum vestibulum, vel facilisis risus mattis. Donec venenatis eros
              nisl, id convallis sapien molestie ut. Quisque venenatis gravida
              velit, ac consectetur diam auctor vel. Maecenas mauris nunc,
              feugiat at urna vitae, eleifend suscipit ipsum. Sed lacinia
              consequat orci, non mattis erat sagittis id. Proin vel nulla sit
              amet mauris tincidunt viverra. Integer egestas auctor lobortis. Ut
              non nisl sit amet lectus porta egestas et nec urna. In efficitur
              tincidunt quam, ac scelerisque mi consequat ut. Suspendisse
              malesuada tortor quis tellus aliquam, vel condimentum turpis
              lobortis. Nunc semper eros ut quam condimentum laoreet. Maecenas
              maximus, felis eu dictum posuere, quam justo euismod elit, quis
              scelerisque erat odio quis massa. In maximus blandit magna, at
              auctor est pretium aliquam. Cras vitae arcu vitae dolor dictum
              cursus. Aliquam sed purus lorem. Morbi pulvinar purus non
              porttitor imperdiet. Aliquam mollis et ex quis sollicitudin. Nunc
              quis dictum velit. Vestibulum quis dapibus metus, nec ullamcorper
              eros. Phasellus vel nisi vel nibh pretium feugiat quis sit amet
              neque. Nunc metus ligula, viverra a bibendum tristique, facilisis
              vel leo. Fusce justo massa, congue nec facilisis vel, dapibus et
              augue. Ut iaculis pulvinar posuere.
            </Text>
          </ScrollView>
        );
    }
  };

  return (
    <View className="flex-1 bg-teagreen">
      <View className="p-10">
        <HStack space="xl" className="items-center">
          <Avatar className="bg-resedagreen">
            <AvatarFallbackText className="">{name}</AvatarFallbackText>
          </Avatar>
          <Text className=" text-jet text-3xl">{name}</Text>
        </HStack>

        <View className="flex-row mt-10 pt-">
          {isEditing ? (
            <Input variant="outline" isDisabled={false} className=" text-jet">
              <InputField placeholder="Enter your bio" className="" />
            </Input>
          ) : (
            <Input variant="outline" isDisabled={true} className=" text-jet">
              <InputField placeholder="Enter your bio" />
            </Input>
          )}

          <Button variant="solid" className="bg-jet ml-3" onPress={toggleEdit}>
            <ButtonText className="">
              {isEditing ? "Save bio" : "Edit bio"}
            </ButtonText>
          </Button>
        </View>
      </View>

      <View className="flex-row mt-4 ml-10">
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

      <View className="flex-1 ml-10 mr-10 mb-10 outline outline-1 items-center">
        {renderContent()}
      </View>
    </View>
  );
}
