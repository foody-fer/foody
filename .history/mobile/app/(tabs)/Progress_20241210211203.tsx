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
                  data: [30, 37, 40, 69, 70, 45, 90],
                },
              ],
            }}
            width={300}
            height={200}
            chartConfig={{
              backgroundColor: "#FFFFFF", // White background
              backgroundGradientFrom: "#FFFFFF", // White background
              backgroundGradientTo: "#FFFFFF", // White background
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(113, 131, 85, ${opacity})`, // Jet for chart lines
              labelColor: (opacity = 1) => `rgba(55, 55, 55, ${opacity})`, // Jet for labels
            }}
            style={styles.chart}
          />
        </View>
      </View>

      <View style={styles.timelineContainer}>
        {[
          { value: "24 cm", date: "15.3.2025" },
          { value: "30 cm", date: "20.5.2025" },
          { value: "31 cm", date: "21.7.2025" },
        ].map((entry, index) => (
          <View key={index} style={styles.timelineItem}>
            <View style={styles.timelineDot} />
            <View>
              <Text style={styles.timelineValue}>{entry.value}</Text>
              <Text style={styles.timelineDate}>{entry.date}</Text>
            </View>
          </View>
        ))}
      </View>

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
    flexWrap: "wrap", // Allow buttons to wrap to the next line
    justifyContent: "center", // Center buttons horizontally
    marginTop: 16,
    gap: 8, // Add spacing between buttons (React Native >= 0.71)
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 25,
    marginHorizontal: 2,
    marginVertical: 2, // Add vertical spacing between rows
    borderRadius: 20,
    backgroundColor: "#718355", // Reseda Green (Unpressed)
  },
  categoryButtonSelected: {
    backgroundColor: "#575A4B", // Ebony (Pressed/Hovered)
  },
  categoryText: {
    color: "#FFFFFF", // White text for buttons
    fontSize: 16,
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
  timelineContainer: {
    marginTop: 16,
    alignItems: "center",
  },
  timelineItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#718355",
    marginRight: 8,
  },
  timelineValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#373737",
  },
  timelineDate: {
    fontSize: 14,
    color: "#575A4B",
  },

  loggedText: {
    color: "#373737", // Jet for text
    fontSize: 16,
    marginBottom: 4,
    textAlign: "center",
  },
  logButton: {
    marginTop: 24,
    alignSelf: "center",
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 50,
    backgroundColor: "#718355", // Ebony for the button
  },
  logButtonText: {
    color: "#FFFFFF", // White for button text
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProgressScreen;
