import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
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

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View className="flex-1 justify-center items-center p-5 bg-[#CFE1B9]">
        <Text className="text-2xl mb-4 font-bold text-[#575a4b] text-center">
          {category}
        </Text>
        <TextInput
          className="h-10 border border-[#718355] rounded-full px-4 w-72 mb-4 bg-white"
          placeholder="Enter value"
          keyboardType="numeric"
          value={value}
          onChangeText={setValue}
          onBlur={() => {
            Keyboard.dismiss();
            console.log("Blur triggered");
          }} // Ensures keyboard dismisses on blur
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

        <View className="mt-4">
          <TouchableOpacity
            className="bg-[#718355] py-2 px-4 rounded-full items-center w-58"
            onPress={handleSubmit}
          >
            <Text className="text-white text-lg font-bold">
              Submit Progress
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
