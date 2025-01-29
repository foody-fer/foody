import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { apiCall } from "@/app/(tabs)";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";

const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => apiCall("/auth"),
  });
};

const Comments = ({ postInfo, refetchPosts }: any) => {
  const { data: user, isLoading, error } = useUser();

  {
    isLoading && <Spinner />;
  }

  {
    error && <Text>Error</Text>;
  }
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const [open, setOpen] = useState<number | null>(null); // Tracks which comment is being edited
  const [triger, setTriger] = useState(false);

  const fetchComments = async () => {
    if (!postInfo) return;

    try {
      const response = await apiCall(`/posts/${postInfo}/comments`, {
        method: "GET",
      });
      setComments(response);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [triger]);

  const handleAddComment = async () => {
    if (newComment.trim() === "") return;

    try {
      const formData = new FormData();
      formData.append("comment[content]", newComment);

      await apiCall(`/posts/${postInfo}/comments`, {
        method: "POST",
        body: formData,
      });

      setTriger(!triger); // Trigger re-fetch
      setNewComment(""); // Clear input
      refetchPosts();
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  const handleEditComment = async (commentId: number, newContent: string) => {
    try {
      const formData = new FormData();
      formData.append("comment[content]", newContent);

      await apiCall(`/posts/${postInfo}/comments/${commentId}`, {
        method: "PATCH",
        body: formData,
      });

      setOpen(null); // Close edit mode
      setTriger(!triger); // Trigger re-fetch
    } catch (error) {
      console.error("Failed to edit comment:", error);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      await apiCall(`/posts/${postInfo}/comments/${commentId}`, {
        method: "DELETE",
      });

      setTriger(!triger); // Trigger re-fetch
      refetchPosts();
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  const renderComment = ({ item }: { item: any }) => (
    <View style={styles.commentContainer} key={item.id}>
      <View style={styles.commentContent}>
        {item.user.avatar ? (
          <Image
            source={{ uri: item.user.avatar }}
            style={styles.avatar}
            resizeMode="cover"
          />
        ) : (
          <Ionicons name="person-circle" size={30} color="#575A4B" />
        )}

        <View style={{ flex: 1, marginLeft: 8 }}>
          <Text style={styles.username}>{item.user.username}</Text>
          {open === item.id ? (
            <View style={styles.editContainer}>
              <TextInput
                style={styles.editInput}
                defaultValue={item.content}
                onChangeText={(text) => setNewComment(text)}
              />
              <TouchableOpacity
                onPress={() => handleEditComment(item.id, newComment)}
              >
                <Ionicons name="checkmark" size={20} color="green" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setOpen(null)}>
                <Ionicons name="close" size={20} color="red" />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text style={styles.commentText}>{item.content}</Text>
            </View>
          )}
        </View>
      </View>

      {item.user.username === user.username && (
        <>
          <TouchableOpacity onPress={() => setOpen(item.id)}>
            <Ionicons name="create" size={20} color="#718355" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleDeleteComment(item.id)}
            style={styles.deleteButton}
          >
            <Ionicons name="trash" size={20} color="red" />
          </TouchableOpacity>
        </>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comments</Text>

      {/* Input for new comment */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Write a comment..."
          value={newComment}
          onChangeText={setNewComment}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddComment}>
          <Ionicons name="send" size={14} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* List of comments */}
      <FlatList
        data={comments}
        renderItem={renderComment}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
    width: "100%",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 50,
    padding: 8,
    backgroundColor: "#fff",
  },
  addButton: {
    backgroundColor: "#718355",
    padding: 10,
    borderRadius: 8,
    marginLeft: 8,
  },
  commentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 8,
    elevation: 2,
  },
  commentContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  username: {
    fontWeight: "bold",
  },
  commentText: {
    fontSize: 14,
  },
  editContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  editInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 4,
    padding: 4,
  },
  deleteButton: {
    marginLeft: 8,
  },
});

export default Comments;
