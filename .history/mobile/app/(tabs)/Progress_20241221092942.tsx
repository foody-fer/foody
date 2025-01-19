import React, { useState, useEffect } from "react";
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

  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category);
  };

  return (
    <ScrollView
      className="flex-grow bg-[#CFE1B9] p-4"
      contentContainerStyle={{
        justifyContent: "space-between", // Moved layout styles here
      }}
    >
      {/* Categories */}
      <View className="flex-row flex-wrap justify-center mt-4 gap-2">
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            onPress={() => handleCategoryChange(category)}
            className={`py-2 px-[25px] mx-0.5 my-0.5 rounded-full ${
              selectedCategory === category ? "bg-[#575A4B]" : "bg-[#718355]"
            }`}
          >
            <Text
              className={`text-white text-[16px] ${
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
        <View className="bg-white p-4 rounded-xl shadow-lg">
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
      <View className="mt-4 bg-white w-[130px] self-center py-4 rounded-lg items-center">
        {[
          { value: "24 cm", date: "15.3.2025" },
          { value: "30 cm", date: "20.5.2025" },
          { value: "31 cm", date: "21.7.2025" },
          { value: "24 cm", date: "15.3.2025" },
          { value: "30 cm", date: "20.5.2025" },
          { value: "31 cm", date: "21.7.2025" },
          { value: "24 cm", date: "15.3.2025" },
          { value: "30 cm", date: "20.5.2025" },
          { value: "31 cm", date: "21.7.2025" },
        ].map((entry, index) => (
          <View key={index} className="flex-row items-center mb-2">
            <View className="w-[10px] h-[10px] bg-[#718355] rounded-full mr-2" />
            <View>
              <Text className="text-[18px] font-bold text-[#373737]">
                {entry.value}
              </Text>
              <Text className="text-[12px] text-[#575A4B]">{entry.date}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Log Progress Button */}
      <TouchableOpacity
        className="mt-6 self-center py-3 px-14 rounded-full bg-[#718355]"
        onPress={() =>
          router.push({
            pathname: "/LogProgress",
            params: { category: "arms" },
          })
        }
      >
        <Text className="text-white text-[16px] font-bold">Log Progress</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProgressScreen;
