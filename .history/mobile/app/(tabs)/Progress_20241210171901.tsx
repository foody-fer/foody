import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
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
    <ScrollView className="flex-1 bg-green-100">
      <View className="flex-row justify-center mt-6">
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            onPress={() => setSelectedCategory(category)}
            className={`px-4 py-2 mx-1 rounded-full ${
              selectedCategory === category
                ? "bg-green-600 text-white"
                : "bg-green-200"
            }`}
          >
            <Text
              className={`${
                selectedCategory === category ? "text-white" : "text-green-800"
              }`}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Graph */}
      <View className="mt-8 items-center">
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
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          style={{
            borderRadius: 16,
          }}
        />
      </View>

      <View className="mt-4 px-6">
        <Text className="text-green-800">24 cm - 15.3.2025</Text>
        <Text className="text-green-800">30 cm - 20.5.2025</Text>
        <Text className="text-green-800">31 cm - 21.7.2025</Text>
      </View>

      <TouchableOpacity className="mt-6 mx-auto bg-green-600 px-6 py-3 rounded-full">
        <Text className="text-white">Log Progress</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProgressScreen;
