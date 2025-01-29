import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  FlatList,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { Text } from "@/components/ui/CustomText";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { useRouter } from "expo-router";
import Post from "../Post";

const queryClient = new QueryClient();

export const apiCall = async (url: string, options: RequestInit = {}) => {
  const token = await AsyncStorage.getItem("token");
  const res = await fetch(`https://foody-backend.zeko.run/api/v1${url}`, {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) {
    await AsyncStorage.removeItem("token");
  }

  if (res.ok) {
    return res.json();
  }

  const error = await res.text();
  console.error(error, res.status);

  throw error;
};

export default function Index() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [ideaModalVisible, setIdeaModalVisible] = useState(false);
  const [ideaContent, setIdeaContent] = useState("");
  const [postContent, setPostContent] = useState("");

  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => apiCall("/posts"),
    retry: false,
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setSelectedImage(result.assets[0].uri);
      setModalVisible(true);
    }
  };

  const handlePost = () => {
    handlePostMethod(postContent, selectedImage).then(() => {
      setPostContent("");
      setSelectedImage(null);
      setModalVisible(false);
    });
  };

  const handleIdeaPost = () => {
    handlePostMethod(ideaContent, null).then(() => {
      setIdeaContent("");
      setIdeaModalVisible(false);
    });
  };

  const handlePostMethod = async (text: string, image: string | null) => {
    if (!text) {
      alert("Please add content and an image.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("post[title]", "mobile post");
      formData.append("post[content]", text);

      if (image) {
        // const response = await fetch(image);
        // const blob = await response.blob();
        // @ts-ignore
        formData.append("post[images][]", {
          uri: image,
          type: "image/jpeg",
          name: "photo.jpg",
        });
      }

      await apiCall("/posts", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      postsQuery.refetch();
    } catch (err) {
      console.error(err);
    }
  };

  if (postsQuery.error) {
    return (
      <View>
        <Text>Error</Text>
        <Button
          onPress={() => {
            apiCall("/auth", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                user: { email: "fran.zekan123@fer.hr", password: "asd" },
              }),
            })
              .then((res) => {
                console.log(res);
                AsyncStorage.setItem("token", res.token);
                postsQuery.refetch();
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          <Text style={{ color: "white" }}>Login</Text>
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <TouchableOpacity onPress={pickImage} style={styles.cameraButton}>
          <Ionicons name="camera" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.topViewWhite}>
          <TouchableOpacity onPress={() => setIdeaModalVisible(true)}>
            <Text>Post your meal! </Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={postsQuery.data || []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Post
            user={item.user}
            content={item.content}
            images={item.images}
            likes={item.likes_count}
            likedByCurrentUser={item.liked_by_current_user}
            savedByCurrentUser={item.saved_by_current_user}
            likePost={() => {
              apiCall(`/posts/${item.id}/likes`, {
                method: item.liked_by_current_user ? "DELETE" : "POST",
              }).then(() => postsQuery.refetch());
            }}
            id={item.id}
            comments_count={item.comments_count}
            refetchPosts={postsQuery.refetch}
          />
        )}
        ListEmptyComponent={<Text>Loading posts or no posts available...</Text>}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedImage ? (
              <Image
                source={{ uri: selectedImage }}
                style={styles.modalImage}
              />
            ) : (
              <Text style={styles.modalText}>
                Choose a new image from your gallery!
              </Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Write your post..."
              value={postContent}
              onChangeText={setPostContent}
            />

            <View style={styles.modalButtonContainer}>
              <Button onPress={handlePost}>
                <Text>Post</Text>
              </Button>
              <Button onPress={() => setModalVisible(false)}>
                <Text>Dismiss</Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={ideaModalVisible}
        onRequestClose={() => setIdeaModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Post your idea</Text>
            <TextInput
              style={styles.input}
              placeholder="Write your idea here..."
              value={ideaContent}
              onChangeText={setIdeaContent}
            />
            <View style={styles.modalButtonContainer}>
              <Button onPress={handleIdeaPost}>
                <Text>Post</Text>
              </Button>
              <Button onPress={() => setIdeaModalVisible(false)}>
                <Text>Dismiss</Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CFE1B9",
  },
  input: {
    backgroundColor: "#b0ca91",
  },
  topView: {
    backgroundColor: "#b0ca91",
    borderRadius: 15,
    padding: 16,
    borderWidth: 0.2,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: "90%",
    margin: "5%",
    borderColor: "#b0ca91",
  },
  topViewWhite: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    paddingHorizontal: 70,
    color: "lightgrey",
  },
  cameraButton: {
    position: "absolute",
    top: "18%",
    right: "3%",
    marginTop: 1,
    backgroundColor: "#575A4B",
    borderRadius: 20,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#CFE1B9",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginLeft: 10,
    textAlign: "center",
  },
  modalImage: {
    width: 200,
    height: 200,
    marginBottom: 15,
    borderRadius: 10,
  },
  modalButtonContainer: {
    borderRadius: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
