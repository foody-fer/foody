import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import MealData from "../MealData";

interface MealCardProps {
  meal: any;
}

export default function MealCard({ meal }: MealCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TouchableOpacity style={styles.card} onPress={() => setOpen(true)}>
        <View>
          <Text style={styles.cardTime}>Breakfast 9-11AM</Text>
          <Text style={styles.cardTitle}>Burger - GRMILICA</Text>
        </View>
        <Image
          source={{
            uri: "https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=800",
          }}
          style={styles.cardImage}
        />
      </TouchableOpacity>
      {/* Modal */}
      <Modal visible={open} transparent={true} animationType="fade">
        <View style={styles.modalBackground}>
          <MealData meal={meal} remove={setOpen} />
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    backgroundColor: "#fff",
  },
  cardTime: {
    fontSize: 14,
    color: "#888",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 4,
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});
