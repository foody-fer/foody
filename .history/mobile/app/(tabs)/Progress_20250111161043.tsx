import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Modal,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Text } from "../../components/ui/CustomText";

type Category = "weight" | "waist" | "thighs" | "hips" | "arms" | "neck";

const ProgressScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>("arms");
  const [modalVisible, setModalVisible] = useState(false); // For modal visibility
  const [value, setValue] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

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

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleDateChange = (
      event: DateTimePickerEvent,
      selectedDate?: Date
    ) => {
      setShowDatePicker(false);
      if (selectedDate) {
        setDate(selectedDate);
      }
    };

  return (
    <SafeAreaView className="flex-1 bg-[#CFE1B9]">
      <View className="flex-1 flex-col">
        {/* Spacer for Header */}
        <View className="h-[3%]" />

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
        <View className="h-[1%]" />

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
              {[{ value: "24 cm", date: "15.3.2025" }].map((entry, index) => (
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

      {/* Modal for Log Progress */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <View className="flex-1 justify-center items-center p-5 bg-black bg-opacity-50">
            <View className="bg-white rounded-xl p-6 w-4/5">
              <Text className="text-2xl mb-4 font-bold text-[#575a4b] text-center">
                {selectedCategory}
              </Text>
              <TextInput
                className="h-10 border border-[#718355] rounded-full px-4 w-full mb-4 bg-white"
                placeholder="Enter value"
                keyboardType="numeric"
                value={value}
                onChangeText={setValue}
              />
              <View className="items-center mb-4 w-72 h-10">
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Text className="text-center text-lg text-[#718355] mb-2 bg-white py-1 px-4 rounded-full w-72 h-10 border border-[#718355]">
              {date.toLocaleDateString()}
            </Text>
          </TouchableOpacity>
        </View>
        {showDatePicker && (
          <DateTimePicker
            key={Platform.OS === "android" ? date.toISOString() : undefined}
            value={date}
            mode="date"
            display={Platform.OS === "ios" ? "inline" : "default"}
            onChange={handleDateChange}
          />
        )}
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-[#718355] py-2 px-4 rounded-full items-center w-full"
                onPress={() => setModalVisible(false)}
              >
                <Text className="text-white font-bold text-lg">
                  Submit Progress
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Fixed Log Progress Button */}
      <View className="absolute bottom-5 left-0 right-0 items-center">
        <TouchableOpacity
          className="py-3 px-14 rounded-full bg-[#718355]"
          onPress={() => setModalVisible(true)}
        >
          <Text className="text-white text-[16px] font-bold">Log Progress</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProgressScreen;
