import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Modal, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const [modalVisible, setModalVisible] = useState(false);
  //modal koristimo za otvaranje novog prozora
  const [heartColor, setHeartColor] = useState("#575A4B");
  const [commentColor, setCommentColor] = useState("#575A4B");
  //potrebno za promjenu boje srca i komentara pri kliku

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

      <View style={styles.postView}>
        <View style={styles.topSection}>
          <Ionicons
            name="person-circle"
            size={30}
            color="#575A4B"
            style={styles.iconLeft}
          />
          <Text style={styles.modalText}> Ime i prezime </Text>
        </View>

        <View style={styles.middleSection}>
          <Image
            source={require("../../images/objava1.jpg")}
            style={styles.image}
          />
        </View>

        <View style={styles.bottomSection}>
          <TouchableOpacity
            onPress={() =>
              setHeartColor((prevColor) =>
                prevColor === "#575A4B" ? "#FF0000" : "#575A4B"
              )
            }
          >
            <Ionicons
              name="heart"
              size={24}
              color={heartColor}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              setCommentColor((prevColor) =>
                prevColor === "#575A4B" ? "#FF0000" : "#575A4B"
              )
            }
          >
            <Ionicons
              name="chatbubble"
              size={24}
              color={commentColor}
              style={styles.icon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            className="py-3 px-14 rounded-full bg-[#718355]"
            onPress={() =>
              router.push({
                pathname: "/LogProgress",
                params: { category: "arms" },
              })
            }
          >
            <Text className="text-white text-[16px] font-bold">
              Log Progress
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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
    height: "70%",
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
