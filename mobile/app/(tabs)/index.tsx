import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Image,
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
import { apiCall, queryClient } from "@/api/index";

const Post = ({
  user,
  content,
  images,
  likes,
  likedByCurrentUser,
  likePost,
}: {
  user: { username: string; avatar: string | null };
  content: string;
  images: { id: number; url: string }[];
  likes: number;
  likedByCurrentUser: boolean;
  likePost: () => void;
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handlePreviousImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return (
    <View style={styles.postView}>
      <View style={styles.topSection}>
        {user.avatar ? (
          <Image
            source={{ uri: user.avatar }}
            style={{ width: 30, height: 30, borderRadius: 15 }}
          />
        ) : (
          <Ionicons
            name="person-circle"
            size={30}
            color="#575A4B"
            style={styles.iconLeft}
          />
        )}
        <Text style={styles.modalText}>{user.username}</Text>
      </View>

      <Text>{content}</Text>

      <View style={styles.middleSection}>
        {images.length > 0 && (
          <>
            <Image
              source={{ uri: images[currentImageIndex].url }}
              style={styles.image}
            />
            {images.length > 1 && (
              <View style={styles.imageNavigation}>
                <TouchableOpacity
                  onPress={handlePreviousImage}
                  disabled={currentImageIndex === 0}
                >
                  <Ionicons
                    name="chevron-back"
                    size={24}
                    color={currentImageIndex === 0 ? "#575A4B" : "#CFE1B9"}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleNextImage}
                  disabled={currentImageIndex === images.length - 1}
                >
                  <Ionicons
                    name="chevron-forward"
                    size={24}
                    color={
                      currentImageIndex === images.length - 1
                        ? "#575A4B"
                        : "#CFE1B9"
                    }
                  />
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      </View>

      <View style={styles.bottomSection}>
        <Text>{likes}</Text>
        <TouchableOpacity onPress={likePost}>
          <Ionicons
            name="heart"
            size={24}
            color={likedByCurrentUser ? "red" : "#575A4B"}
            style={styles.icon}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons
            name="chatbubble"
            size={24}
            color="#575A4B"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function Index() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [heartColor, setHeartColor] = useState("#575A4B");
  const [commentColor, setCommentColor] = useState("#575A4B");

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

  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => apiCall("/posts"),
    retry: false,
  });

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
      {/* <Button
        onPress={() => {
          AsyncStorage.removeItem("token");
          router.push("/Login");
        }}
        style={styles.logoutButton}
      >
        <Text style={{ color: "white" }}>Logout</Text>
      </Button> */}

      <View style={styles.topView}>
        <TouchableOpacity onPress={pickImage} style={styles.cameraButton}>
          <Ionicons name="camera" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text>Post your meal! </Text>
      </View>

      <ScrollView>
        {postsQuery.isLoading && <Spinner />}
        {postsQuery.data &&
          postsQuery.data.map((post) => (
            <Post
              key={post.id}
              user={post.user}
              content={post.content}
              images={post.images}
              likes={post.likes_count}
              likedByCurrentUser={post.liked_by_current_user}
              likePost={() => {
                apiCall(`/posts/${post.id}/likes`, {
                  method: post.liked_by_current_user ? "DELETE" : "POST",
                }).then(() => {
                  postsQuery.refetch();
                });
              }}
            />
          ))}
      </ScrollView>

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

            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Choose</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Dismiss</Text>
              </TouchableOpacity>
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
  topView: {
    backgroundColor: "#718355",
    borderRadius: 15,
    padding: 16,
    borderWidth: 0.2,
    marginBottom: 10,
    alignItems: "center",
  },
  postView: {
    marginTop: 10,
    padding: "5%",
    margin: "5%",
    width: "90%",
    borderRadius: 10,
    borderColor: "#575A4B",
    borderWidth: 0.2,
    alignItems: "center",
    backgroundColor: "#718355",
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    paddingBottom: 2,
    paddingTop: "1%",
  },
  iconLeft: {
    marginLeft: 10,
  },
  middleSection: {
    width: "100%",
    paddingTop: 20,
    alignItems: "center",
    marginVertical: 10,
    borderColor: "#718355",
    // backgroundColor: "#718355",
    borderRadius: 10,
    //  borderWidth: 1,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    borderColor: "#718355",
    borderWidth: 1,
  },
  bottomSection: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 10,
  },
  icon: {
    marginHorizontal: 5,
  },
  cameraButton: {
    position: "absolute",
    top: "18%",
    right: "3%",
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
    backgroundColor: "#FFF",
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
    marginBottom: 15,
    textAlign: "center",
  },
  modalImage: {
    width: 200,
    height: 200,
    marginBottom: 15,
    borderRadius: 10,
  },
  imageNavigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  closeButton: {
    backgroundColor: "#575A4B",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    marginTop: 10,
  },
  closeButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    alignSelf: "flex-start",
    margin: 5,
    backgroundColor: "#575A4B",
    padding: 8,
    borderRadius: 10,
  },
});
