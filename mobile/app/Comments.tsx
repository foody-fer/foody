/*import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Comments = () => {
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  const handleDeleteComment = (index) => {
    const updatedComments = comments.filter((_, i) => i !== index);
    setComments(updatedComments);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comments</Text>

      {/* Input for new comment */
    /*}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Write a comment..."
          value={newComment}
          onChangeText={setNewComment}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddComment}>
          <Ionicons name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* List of comments */
    /*}
      {comments.map((comment, index) => (
        <View key={index} style={styles.commentContainer}>
          <View style={styles.commentTextContainer}>
            <Ionicons name="person-circle" size={30} color="#575A4B" />
            <Text style={styles.commentText}>{comment}</Text>
          </View>
          <TouchableOpacity onPress={() => handleDeleteComment(index)}>
            <Ionicons name="trash" size={20} color="red" />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 18,
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
    borderRadius: 8,
    padding: 8,
    backgroundColor: "#fff",
  },
  addButton: {
    backgroundColor: "#718355",
    padding: 10,
    borderRadius: 8,
    marginLeft: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  commentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  commentTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  commentText: {
    marginLeft: 8,
    fontSize: 14,
  },
});

export default Comments;*/