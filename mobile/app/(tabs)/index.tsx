import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";
import { useRouter } from "expo-router";
import { Text } from "@/components/ui/CustomText";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "@/components/ui/button";

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
}: {
  user: { username: string; avatar: string | null };
  content: string;
  images: { id: number; url: string }[];
  likes: number;
  likedByCurrentUser: boolean;
  likePost: () => void;
}) => {
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
        {images.map((image) => (
          <Image
            key={image.id}
            source={{ uri: image.url }}
            style={styles.image}
          />
        ))}
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
  //modal koristimo za otvaranje novog prozora
  const [heartColor, setHeartColor] = useState("#575A4B");
  const [commentColor, setCommentColor] = useState("#575A4B");
  //potrebno za promjenu boje srca i komentara pri kliku

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
      <View style={styles.topView}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.cameraButton}
        >
          <Ionicons name="camera" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text>Post your meal! </Text>
      </View>

      <Button
        onPress={() => {
          AsyncStorage.removeItem("token");
          postsQuery.refetch();
        }}
      >
        <Text style={{ color: "white" }}>Logout</Text>
      </Button>

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
            <Text style={styles.modalText}>
              Choose a new image from your gallery!
            </Text>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton} //zatvaranje prozora
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CFE1B9", // Tea Green pozadina
  },
  topView: {
    marginTop: "2%",
    backgroundColor: "#718355", // Reseda Green
    borderRadius: 15, // zaobljeni rubovi
    padding: 16, // dodatni padding
    alignItems: "center", // Center the content inside the view
  },
  postView: {
    marginTop: "2%",
    padding: "5%",
    margin: "5%",
    width: "90%",
    borderRadius: 10,
    //borderColor: '#718355', bilo je za pomoc sve zakomentirano
    //borderWidth: 1,
    //backgroundColor: '#ffff',
    alignItems: "center",
    borderBlockColor: "#575A4B",
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    paddingBottom: 10,
    borderColor: "#718355",
    borderWidth: 1,
    paddingTop: "1%",
  },
  iconLeft: {
    marginLeft: 10,
  },
  middleSection: {
    width: "100%",
    alignItems: "center",
    marginVertical: 10,
    borderColor: "#718355",
    borderWidth: 1,
  },
  image: {
    width: 150,
    height: 150,
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
    marginHorizontal: 20,
  },
  cameraButton: {
    position: "absolute",
    top: "15%",
    right: "3%",
    backgroundColor: "#575A4B", // ista boja
    borderRadius: 20,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // polu-prozirna pozadina
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
  closeButton: {
    backgroundColor: "#575A4B", // Ebony boja za botun
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
});
