import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";

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
  Alert,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Text } from "../../components/ui/CustomText";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useQuery } from "@tanstack/react-query";
import { apiCall } from ".";
type Category = "weight" | "waist" | "thighs" | "hips" | "arms" | "neck";
import { useMemo } from "react";

interface Measurement {
  id: number;
  key: string;
  value: number;
  recorded_at: string;
}

const ProgressScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>("arms");
  const [modalVisible, setModalVisible] = useState(false); // For modal visibility
  const [value, setValue] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const router = useRouter();
  const [measurements, setMeasurements] = useState<Measurement[]>([]);

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
    setValue("");
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

  useEffect(() => {
    fetchLogs();
  }, [selectedCategory]); // Fetch logs when the selected category changes

  const fetchLogs = async () => {
    const queryParams = new URLSearchParams({
      key: selectedCategory,
    });

    try {
      const response = await apiCall(
        `/measurements.json?${queryParams.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response) {
        setMeasurements(response);

        console.log("Measurements fetched successfully:", response);
      }
    } catch (error) {
      console.error("Error fetching measurements:", error);
    }
  };

  const handleSubmit = async () => {
    const data = {
      measurement: {
        key: selectedCategory,
        value: value,
        recorded_at: date,
      },
    };

    try {
      const response = await apiCall(`/measurements`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setModalVisible(false);
      await fetchLogs();
    } catch (error) {
      Alert.alert("Error", "Invalid data");
    }
  };

  const handleDeleteMeasurement = async (measurementId: number) => {
    try {
      await apiCall(`/measurements/${measurementId}`, {
        method: "DELETE",
      });

      await fetchLogs();
    } catch (error) {
      console.error("Failed to delete measurement:", error);
    }
  };

  const formatDate = (recorded_at: string): string => {
    // Replace "UTC" with "Z" to make it compatible with the Date constructor
    const utcFormatted = recorded_at.replace(" UTC", "Z");
    const date = new Date(utcFormatted);

    // Extract date components
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    // Return formatted date
    return `${day}.${month}.${year}, ${hours}:${minutes}`;
  };

  const getChartData = (
    measurements: Measurement[],
    selectedCategory: Category
  ) => {
    const filteredData = measurements.filter(
      (entry) => entry.key === selectedCategory
    );
    console.log("Sorted data for chart:", filteredData); // Debugging

    const labels = filteredData.map((entry) => {
      const date = new Date(entry.recorded_at.replace(" UTC", "Z"));
      if (isNaN(date.getTime())) {
        console.warn(`Invalid date format: ${entry.recorded_at}`);
        return "Invalid Date";
      }
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      return `${day}.${month}`; // Format datuma: dd.mm
    });

    const data = filteredData.map((entry) => entry.value);

    return {
      labels: labels.reverse(),
      datasets: [{ data: data.reverse() }],
    };
  };

  const chartData = useMemo(
    () => getChartData(measurements, selectedCategory),
    [measurements, selectedCategory]
  );

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
            {chartData.datasets[0].data.length > 0 ? (
              <LineChart
                data={chartData}
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
                style={{
                  borderRadius: 18,
                  alignSelf: "center",
                  marginLeft: -10, // Korigira marginu (ako je potrebno)
                  marginRight: -10,
                }}
              />
            ) : (
              <Text className="text-[#575A4B] text-lg text-center">
                No data available for this category.
              </Text>
            )}
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
            <View className="bg-white w-[200px] py-4 rounded-lg items-center">
              {measurements
                .filter((entry) => entry.key === selectedCategory) // Filter entries based on the selected category
                .map((entry, index) => (
                  <View key={index} className="flex-row items-center mb-2 px-8">
                    <View className="w-[10px] h-[10px] bg-[#718355] rounded-full mr-2" />
                    <View>
                      <Text className="text-[18px] font-bold text-[#373737]">
                        {entry.value}
                        {selectedCategory === "weight" ? (
                          <Text> kg</Text>
                        ) : (
                          <Text> cm</Text>
                        )}
                      </Text>
                      <Text className="text-[12px] text-[#575A4B]">
                        {formatDate(entry.recorded_at)}{" "}
                      </Text>
                    </View>

                    <TouchableOpacity
                      onPress={() => handleDeleteMeasurement(entry.id)}
                    >
                      <Text>Delete</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              {measurements.filter((entry) => entry.key === selectedCategory)
                .length === 0 && (
                <Text className="text-[#575A4B] text-center text-[16px] px-4 py-2">
                  Log progress to see it displayed.
                </Text>
              )}
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
          <View className="flex-1 justify-center items-center p-5 bg-black/50 bg-opacity-50 text-center">
            <View className="bg-white rounded-3xl p-6 w-4/5 flex flex-col items-center gap-4">
              <Text className="text-2xl font-bold text-[#575a4b] text-center">
                {selectedCategory}
              </Text>
              <View className="flex-row items-center h-10 border border-[#718355] rounded-full px-4 bg-white">
                <TextInput
                  className="flex-1 h-full pr-2"
                  placeholder="Enter value"
                  keyboardType="numeric"
                  value={value}
                  onChangeText={setValue}
                />
                <Text className="text-[#718355] text-lg">
                  {selectedCategory === "weight" ? "kg" : "cm"}
                </Text>
              </View>
              {/* <View className="items-center mb-4 w-full h-10">
                <TouchableOpacity
                  onPress={() => setShowDatePicker(true)}
                  className="w-full"
                >
                  <Text className="text-center text-lg text-[#718355] mb-2 bg-white py-1 px-4 rounded-full h-10 border border-[#718355]">
                    {date.toLocaleDateString()}
                  </Text>
                </TouchableOpacity>
              </View> */}
              {/* {showDatePicker && ( */}
              <DateTimePicker
                key={Platform.OS === "android" ? date.toISOString() : undefined}
                value={date}
                mode="date"
                display="default" // Default display to show as a modal
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false); // Hide picker after selection
                  if (selectedDate) setDate(selectedDate); // Set the selected date
                }}
              />
              {/* )} */}

              <TouchableOpacity
                className="bg-[#718355] py-2 px-4 rounded-full items-center w-3/4 self-center"
                onPress={handleSubmit}
              >
                <Text className="text-white font-bold text-lg">
                  Submit Progress
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

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
