import React, { useState } from "react";
import { View, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
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
    <SafeAreaView className="flex-1 bg-[#CFE1B9]">
      <View className="flex-1 flex-col">
        {/* Spacer for Header */}
        <View className="h-[5%]" />

        {/* Categories Section */}
        <View className="flex items-center">
          <ScrollView
            contentContainerStyle={{
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 10,
            }}
            showsVerticalScrollIndicator={false}
          >
            <View className="flex-row flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  onPress={() => handleCategoryChange(category)}
                  className={`py-2 px-6 mx-0.5 my-0.5 rounded-full ${
                    selectedCategory === category
                      ? "bg-[#575A4B]"
                      : "bg-[#718355]"
                  }`}
                >
                  <Text
                    className={`text-white text-[16px] ${
                      selectedCategory === category
                        ? "font-bold"
                        : "font-normal"
                    }`}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Spacer between Categories and Graph */}
        <View className="h-[2%]" />

        {/* Graph Section */}
        <View className="h-[40%] items-center justify-center">
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

        {/* Logs Section */}
        <View className="h-[30%] items-center justify-center">
          <ScrollView
            contentContainerStyle={{
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 10,
            }}
            showsVerticalScrollIndicator={false}
          >
            <View className="bg-white w-[130px] py-4 rounded-lg items-center">
              {[
                { value: "24 cm", date: "15.3.2025" },
                { value: "30 cm", date: "20.5.2025" },
              ].map((entry, index) => (
                <View key={index} className="flex-row items-center mb-2">
                  <View className="w-[10px] h-[10px] bg-[#718355] rounded-full mr-2" />
                  <View>
                    <Text className="text-[18px] font-bold text-[#373737]">
                      {entry.value}
                    </Text>
                    <Text className="text-[12px] text-[#575A4B]">
                      {entry.date}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>

      {/* Fixed Log Progress Button */}
      <View className="absolute bottom-5 left-0 right-0 items-center">
        <TouchableOpacity
          className="py-3 px-14 rounded-full bg-[#718355]"
          onPress={() =>
            router.push({
              pathname: "/LogProgress",
              params: { category: "arms" },
            })
          }
        >
          <Text className="text-white text-[16px] font-bold">Log Progress</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProgressScreen;
