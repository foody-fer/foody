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
    <ScrollView contentContainerStyle={styles.container}>
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
        <View style={styles.graphBackground}>
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
              backgroundColor: "#FFFFFF", // White background
              backgroundGradientFrom: "#FFFFFF", // White background
              backgroundGradientTo: "#FFFFFF", // White background
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(55, 55, 55, ${opacity})`, // Jet for chart lines
              labelColor: (opacity = 1) => `rgba(55, 55, 55, ${opacity})`, // Jet for labels
            }}
            style={styles.chart}
          />
        </View>
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
    flexGrow: 1,
    backgroundColor: "#CFE1B9", // Tea Green
    padding: 16,
    justifyContent: "space-between",
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
    color: "#FFFFFF", // White text for buttons
    fontSize: 14,
  },
  categoryTextSelected: {
    color: "#FFFFFF", // White text for selected buttons
  },
  graphContainer: {
    marginTop: 24,
    alignItems: "center",
  },
  graphBackground: {
    backgroundColor: "#FFFFFF", // White background for the graph
    padding: 16,
    borderRadius: 16, // Rounded edges for the graph container
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    elevation: 2,
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
    backgroundColor: "#718355", // Ebony for the button
  },
  logButtonText: {
    color: "#FFFFFF", // White for button text
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProgressScreen;
