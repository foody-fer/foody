import React, { useState } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Text } from "../../components/ui/CustomText";
import { useRouter } from "expo-router";

type Category = "weight" | "waist" | "thighs" | "hips" | "arms" | "neck";

const ProgressScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>("arms");
  const router = useRouter();
  const categories: Category[] = [
    "weight",
    "waist",
    "thighs",
    "hips",
    "arms",
    "neck",
  ];

  return (
    <ScrollView className="flex-1 bg-teal-200 p-4">
      {/* Categories */}
      <View className="flex-row flex-wrap justify-center mt-4 gap-2">
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            onPress={() => setSelectedCategory(category)}
            className={`py-2 px-6 rounded-full ${
              selectedCategory === category ? "bg-gray-700" : "bg-olive-600"
            }`}
          >
            <Text
              className={`text-white text-base ${
                selectedCategory === category ? "font-bold" : "font-normal"
              }`}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Graph */}
      <View className="mt-6 items-center">
        <View className="bg-white p-4 rounded-lg shadow-lg">
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
              backgroundColor: "#FFFFFF",
              backgroundGradientFrom: "#FFFFFF",
              backgroundGradientTo: "#FFFFFF",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(113, 131, 85, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(55, 55, 55, ${opacity})`,
            }}
            style={{ borderRadius: 16 }}
          />
        </View>
      </View>

      {/* Timeline */}
      <View className="mt-4 bg-white w-32 self-center py-4 rounded-lg items-center">
        {[
          { value: "24 cm", date: "15.3.2025" },
          { value: "30 cm", date: "20.5.2025" },
          { value: "31 cm", date: "21.7.2025" },
        ].map((entry, index) => (
          <View key={index} className="flex-row items-center mb-2">
            <View className="w-2.5 h-2.5 bg-olive-600 rounded-full mr-2" />
            <View>
              <Text className="text-lg font-bold text-gray-800">
                {entry.value}
              </Text>
              <Text className="text-xs text-gray-600">{entry.date}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Log Progress Button */}
      <TouchableOpacity
        className="mt-6 self-center py-3 px-14 rounded-full bg-olive-600"
        onPress={() =>
          router.push({
            pathname: "/LogProgress",
            params: { category: "arms" },
          })
        }
      >
        <Text className="text-white text-base font-bold">Log Progress</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProgressScreen;
