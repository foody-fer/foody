// post.tsx
import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "@/components/ui/CustomText";
import Comments from "@/components/ui/Comments";

const Post = ({
  user,
  content,
  images,
  likes,
  likedByCurrentUser,
  likePost,
  id,
  comments_count,
  savedByCurrentUser,
  refetchPosts,
}: {
  user: { username: string; avatar: string | null };
  content: string;
  images: { id: number; url: string }[];
  likes: number;
  likedByCurrentUser: boolean;
  likePost: () => void;
  id: string;
  comments_count: string;
  savedByCurrentUser: boolean;
  refetchPosts: () => void;
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

  const handleSaves = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        alert("Molimo prijavite se kako biste spremili objavu.");
        return;
      }

      const method = savedByCurrentUser ? "DELETE" : "POST";
      const response = await fetch(
        `https://foody-backend.zeko.run/api/v1/posts/${id}/saves`,
        {
          method,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        alert(
          `Objava ${
            savedByCurrentUser ? "je uklonjena iz spremljenih" : "je spremljena"
          }.`
        );
        refetchPosts(); // Ponovno učitaj podatke
      } else {
        const errorText = await response.text();
        console.error(errorText);
        alert("Dogodila se pogreška prilikom spremanja objave.");
      }
    } catch (error) {
      console.error("Greška prilikom spremanja objave:", error);
      alert("Dogodila se pogreška. Pokušajte ponovno.");
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
          <TouchableOpacity onPress={handleSaves}>
            <Ionicons
              name={savedByCurrentUser ? "download" : "download-outline"}
              size={24}
              color={"#718355"}
              style={styles.icon}
            />
          </TouchableOpacity>
          <Text>{savedByCurrentUser ? "Saved" : "Save"}</Text>
        </View>
      </View>

      {toggleComments === true && <Comments postInfo={id} />}
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
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
  modalText: {
    fontSize: 18,
    marginLeft: 10,
    textAlign: "center",
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
