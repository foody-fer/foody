import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";

interface Macros {
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
}

interface Meal {
  date: string;
  meal_time: string;
  title: string;
  macros: Macros;
  image: string;
  description: string;
}

interface MealDataProps {
  meal: Meal;
  remove: (status: boolean) => void;
}

export default function MealData({ meal, remove }: MealDataProps) {
  return (
    <View style={styles.container}>
      {/* Naslov obroka */}
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Meal Planner - {format(new Date(meal.date.split(" ")[0]), "EEEE")}{" "}
          {meal.meal_time}
        </Text>
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
      <Text style={styles.mealTitle}>{meal.title}</Text>
      {/* Informacije o makronutrijentima + slika */}
      <View style={styles.infoSection}>
        <View>
          <Text>
            <Text style={styles.boldText}>Calories:</Text>{" "}
            {meal.macros.calories} kcal
          </Text>
          <Text>
            <Text style={styles.boldText}>Carbohydrates:</Text>{" "}
            {meal.macros.carbs}g
          </Text>
          <Text>
            <Text style={styles.boldText}>Proteins:</Text> {meal.macros.protein}
            g
          </Text>
          <Text>
            <Text style={styles.boldText}>Fats:</Text> {meal.macros.fat}g
          </Text>
        </View>
        <Image
          source={{
            uri: meal.image,
          }}
          style={styles.image}
        />
      </View>
      {/* Opis */}
      <View style={styles.descriptionSection}>
        <Text style={styles.boldText}>Description:</Text>
        <Text style={styles.descriptionText}>{meal.description}</Text>
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
