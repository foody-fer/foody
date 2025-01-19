import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Text } from "../components/ui/CustomText";

export const options = {
  headerShown: false, // This removes the header and back arrow
};

export default function LogProgress() {
  const { category } = useLocalSearchParams(); // Retrieve the category from URL parameters
  const router = useRouter();
  const [value, setValue] = useState("");
  const [unit, setUnit] = useState("cm");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleSubmit = () => {
    router.push("/Progress");
  };

  return (
    <View className="flex-1 justify-center items-center p-5 bg-[#CFE1B9]">
      <Text className="text-2xl mb-4 font-bold text-white text-center">
        Log Progress for {category}
      </Text>
      <TextInput
        className="h-10 border border-[#718355] rounded-full px-4 w-72 mb-4 bg-white"
        placeholder="Enter value"
        keyboardType="numeric"
        value={value}
        onChangeText={setValue}
      />
      <View className="w-72 border border-[#718355] rounded-full h-20 overflow-hidden mb-4 bg-white justify-center">
        <Picker
          selectedValue={unit}
          style={{ width: "100%", height: "100%" }}
          onValueChange={(itemValue) => setUnit(itemValue)}
        >
          <Picker.Item label="cm" value="cm" />
          <Picker.Item label="mm" value="mm" />
          <Picker.Item label="m" value="m" />
          <Picker.Item label="kg" value="kg" />
          <Picker.Item label="lbs" value="lbs" />
        </Picker>
      </View>
      <View className="items-center mb-4 w-[90%]">
        <Text className="text-sm text-[#718355] mb-2 bg-white py-1 px-4 rounded-full">
          {date.toLocaleDateString()}
        </Text>
        <TouchableOpacity
          className="bg-[#718355] py-2 px-5 rounded-full"
          onPress={() => setShowDatePicker(true)}
        >
          <Text className="text-white font-bold">Change Date</Text>
        </TouchableOpacity>
      </View>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === "ios" ? "inline" : "default"}
          onChange={handleDateChange}
        />
      )}
      <View className="mt-4 w-[70%]">
        <TouchableOpacity
          className="bg-[#718355] py-2 px-4 rounded-full items-center"
          onPress={handleSubmit}
        >
          <Text className="text-white text-lg font-bold">Submit Progress</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
