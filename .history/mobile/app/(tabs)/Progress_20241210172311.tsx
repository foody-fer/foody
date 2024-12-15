import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { LineChart } from "react-native-chart-kit";

type Category = "weight" | "waist" | "thighs" | "hips" | "arms" | "neck";

const ProgressScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>("arms");

  const categories: Category[] = [
    "weight",
    "waist",
    "thighs",
    "hips",
    "arms",
    "neck",
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Categories */}
      <View style={styles.categoriesContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            onPress={() => setSelectedCategory(category)}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonSelected,
            ]}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.categoryTextSelected,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Graph */}
      <View style={styles.graphContainer}>
        <LineChart
          data={{
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [
              {
                data: [20, 45, 28, 80, 99, 43],
              },
            ],
          }}
          width={300}
          height={200}
          chartConfig={{
            backgroundColor: "#CFE1B9", // Tea Green
            backgroundGradientFrom: "#CFE1B9",
            backgroundGradientTo: "#CFE1B9",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(55, 55, 55, ${opacity})`, // Jet for chart lines
            labelColor: (opacity = 1) => `rgba(55, 55, 55, ${opacity})`, // Jet for labels
          }}
          style={styles.chart}
        />
      </View>

      {/* Logged Progress */}
      <View style={styles.loggedProgressContainer}>
        <Text style={styles.loggedText}>24 cm - 15.3.2025</Text>
        <Text style={styles.loggedText}>30 cm - 20.5.2025</Text>
        <Text style={styles.loggedText}>31 cm - 21.7.2025</Text>
      </View>

      {/* Log Progress Button */}
      <TouchableOpacity style={styles.logButton}>
        <Text style={styles.logButtonText}>Log Progress</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CFE1B9", // Tea Green
  },
  categoriesContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: "#718355", // Reseda Green (Unpressed)
  },
  categoryButtonSelected: {
    backgroundColor: "#575A4B", // Ebony (Pressed/Hovered)
  },
  categoryText: {
    color: "#373737", // Jet for text
    fontSize: 14,
  },
  categoryTextSelected: {
    color: "#CFE1B9", // Tea Green for selected text
  },
  graphContainer: {
    marginTop: 32,
    alignItems: "center",
  },
  chart: {
    borderRadius: 16,
  },
  loggedProgressContainer: {
    marginTop: 16,
    paddingHorizontal: 24,
  },
  loggedText: {
    color: "#373737", // Jet for text
    fontSize: 16,
    marginBottom: 4,
  },
  logButton: {
    marginTop: 24,
    alignSelf: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    backgroundColor: "#575A4B", // Ebony for the button
  },
  logButtonText: {
    color: "#CFE1B9", // Tea Green for button text
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProgressScreen;
