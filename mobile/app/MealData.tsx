import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface MealDataProps {
  meal: any;
  remove: (status: boolean) => void;
}

export default function MealData({ meal, remove }: MealDataProps) {
  return (
    <View style={styles.container}>
      {/* Naslov obroka */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Meal Planner - Monday breakfast</Text>
        <TouchableOpacity
          onPress={() => remove(false)}
          style={styles.iconGroup}
        >
          <Ionicons
            name="close-circle-outline"
            size={24}
            color="#000"
          ></Ionicons>
          <Ionicons
            name="close-circle"
            size={24}
            color="red"
            style={styles.hiddenIcon}
          ></Ionicons>
        </TouchableOpacity>
      </View>
      {/* Naziv hrane */}
      <Text style={styles.mealTitle}>Burger - GRMILICA</Text>
      {/* Informacije o makronutrijentima + slika */}
      <View style={styles.infoSection}>
        <View>
          <Text>
            <Text style={styles.boldText}>Calories:</Text> 1101 kcal
          </Text>
          <Text>
            <Text style={styles.boldText}>Carbohydrates:</Text> 268g
          </Text>
          <Text>
            <Text style={styles.boldText}>Proteins:</Text> 43g
          </Text>
          <Text>
            <Text style={styles.boldText}>Fats:</Text> 67g
          </Text>
        </View>
        <Image
          source={{
            uri: "https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=800",
          }}
          style={styles.image}
        />
      </View>
      {/* Opis */}
      <View style={styles.descriptionSection}>
        <Text style={styles.boldText}>Description:</Text>
        <Text style={styles.descriptionText}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi
          quia recusandae doloremque quod minus, repellat tempore, facere
          voluptas repudiandae quis minima maxime perspiciatis. Exercitationem
          neque, animi quia vero adipisci ratione.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f4ffe6",
    padding: 16,
    borderRadius: 12,
    width: "90%",
    alignSelf: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 14,
    color: "#000",
  },
  iconGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  hiddenIcon: {
    display: "none",
  },
  mealTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 8,
  },
  infoSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  boldText: {
    fontWeight: "bold",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  descriptionSection: {
    marginTop: 16,
  },
  descriptionText: {
    fontSize: 12,
    textAlign: "justify",
  },
});
