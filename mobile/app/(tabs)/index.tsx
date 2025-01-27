import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
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
import Comments from "@/components/ui/Comments";
import { setStatusBarBackgroundColor } from "expo-status-bar";

const queryClient = new QueryClient();


export const apiCall = async (url: string, options: RequestInit = {}) => {
  const token = await AsyncStorage.getItem("token");
  const res = await fetch(`https://foody-backend.zeko.run/api/v1${url}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) {
    await AsyncStorage.removeItem("token");
  }

  if (res.ok) {
    return res.json();
  }

  throw await res.text();
};

const Post = ({
  user,
  content,
  images,
  likes,
  likedByCurrentUser,
  likePost,
  id,
  comments_count,
}: {
  user: { username: string; avatar: string | null };
  content: string;
  images: { id: number; url: string }[];
  likes: number;
  likedByCurrentUser: boolean;
  likePost: () => void;
  id: string;
  comments_count: string;
}) => {
  const [toggleComments, setToggleComments] = useState(false);
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
        <View style={styles.userSection}>
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

        <TouchableOpacity>
          <Ionicons
            name="ellipsis-horizontal"
            size={30}
            color="#575A4B"
          ></Ionicons>
        </TouchableOpacity>
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
                    color={currentImageIndex === 0 ? "grey" : "white"}
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
                      currentImageIndex === images.length - 1 ? "grey" : "white"
                    }
                  />
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      </View>

      <View style={styles.bottomSection}>
        <View style={styles.likesContainer}>
          <TouchableOpacity onPress={likePost}>
            <Ionicons
              name="heart"
              size={24}
              color={likedByCurrentUser ? "#f51d5a" : "#718355"}
              style={styles.icon}
            />
          </TouchableOpacity>
          <Text>{likes}</Text>
        </View>

        <View style={styles.commentsContainer}>
          <TouchableOpacity>
            <Ionicons
              name="chatbox-outline"
              size={24}
              color="#718355"
              style={styles.icon}
              onPress={() => setToggleComments(!toggleComments)}
            />
          </TouchableOpacity>
          <Text>{comments_count}</Text>
        </View>

        <View style={styles.saveContainer}>
          <TouchableOpacity>
            <Ionicons
              name="download-outline"
              size={24}
              color="#718355"
              style={styles.icon}
            ></Ionicons>
          </TouchableOpacity>
          <Text>saves</Text>
        </View>
      </View>

      {toggleComments === true && <Comments postInfo={id} />}
    </View>
  );
};

export default function Index() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [ideaModalVisible, setIdeaModalVisible] = useState(false);
  const [ideaContent, setIdeaContent] = useState("");
  const [heartColor, setHeartColor] = useState("#575A4B");
  const [postContent, setPostContent] = useState("");
  const [commentColor, setCommentColor] = useState("#575A4B");

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

  const openIdeaModal = async () => {
    setIdeaModalVisible(true);
};

  
  const handlePost = async () => {
    if (!selectedImage || !postContent) {
      alert("Please add content and an image.");
      return;
    }

    try {
      // Convert the selected image (URI) to a Blob
      const response = await fetch(selectedImage);
      const blob = await response.blob();
  
      const formData = new FormData();
      formData.append("post[content]", postContent);
    formData.append("post[images][]", blob, "upload.jpg");

      const result = await apiCall("/posts", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setModalVisible(false);
      setPostContent("");
      setSelectedImage(null);
      postsQuery.refetch(); // Refresh the list of posts
    } catch (err) {
      console.error(err);
      
    }
  };


  //if (postsQuery.isLoading) return <Spinner />;
  // return <Text>Error loading posts</Text>;


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
    <QueryClientProvider client={queryClient}>
        <View style={styles.container}>
            <View style={styles.topView}>
              <TouchableOpacity onPress={openIdeaModal} style={styles.noteButton}>
                <Ionicons name="document-text-outline" size={24} color="#FFFFFF" />
              </TouchableOpacity>        
              
              <TouchableOpacity onPress={pickImage} style={styles.cameraButton}>
                <Ionicons name="camera" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <Text>Post your meal! </Text>
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
                likePost={() => {
                  apiCall(`/posts/${item.id}/likes`, {
                    method: item.liked_by_current_user ? "DELETE" : "POST",
                  }).then(() => postsQuery.refetch());
                }}
                id={item.id}
                comments_count={item.comments_count}
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
              onRequestClose={() => setIdeaModalVisible(false)}>

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
                              <Button onPress={() => {
                                  // Handle the submission of the idea
                                  console.log("Idea submitted:", ideaContent);
                                  setIdeaModalVisible(false);
                                  setIdeaContent("");
                              }}>
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
    </QueryClientProvider>
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
    borderColor: "#f3f4f6",
    borderWidth: 0.2,
    alignItems: "center",
    backgroundColor: "#f3f4f6",
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingBottom: 2,
    paddingTop: "1%",
    marginBottom: 10,
  },
  userSection: {
    flexDirection: "row",
    alignItems: "center",
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
    borderRadius: 10,
    position: "relative",
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
  },
  bottomSection: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 10,
  },
  icon: {
    marginRight: 5,
  },
  noteButton: {
    position: "absolute", // Ensures the button is positioned absolutely relative to its closest positioned ancestor
    top: "8%", // Vertical position (adjust as needed)
    left: "3%", // Positions the button to the very left
    backgroundColor: "#575A4B", // Button background color
    borderRadius: 20, // Rounded corners
    marginTop: 2,
    padding: 8, // Padding inside the button
    alignItems: "center", // Center align items horizontally
    justifyContent: "center", // Center align items vertically
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
  imageNavigation: {
    position: "absolute", // Added for overlay
    top: "50%", // Center vertically
    width: "100%", // Stretch navigation container
    flexDirection: "row",
    justifyContent: "space-between", // Space arrows at edges
    alignItems: "center",
    paddingHorizontal: 10,
  },
  modalButtonContainer: {
    borderRadius: 25,
    //backgroundColor: "#718355",
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
  input: {
    width: "100%",
    borderColor: "#575A4B",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  likesContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 50,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  commentsContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 50,
    paddingHorizontal: 8,
    paddingVertical: 5,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  saveContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 50,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
});
