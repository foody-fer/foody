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
    <View className="flex-1 justify-start items-center p-6 bg-[#CFE1B9]">
      {/* Header */}
      <Text className="text-2xl font-bold text-[#373737] mb-8 text-center">
        Log Progress for {category}
      </Text>

      {/* Value Input */}
      <TextInput
        className="h-12 border border-[#718355] rounded-full px-4 w-[85%] mb-6 bg-white text-[#373737]"
        placeholder="Enter value"
        placeholderTextColor="#A9A9A9"
        keyboardType="numeric"
        value={value}
        onChangeText={setValue}
      />

      {/* Unit Picker */}
      <View className="w-[85%] border border-[#718355] rounded-full overflow-hidden bg-white mb-6">
        <Picker
          selectedValue={unit}
          style={{ width: "100%", height: 48 }}
          onValueChange={(itemValue) => setUnit(itemValue)}
        >
          <Picker.Item label="cm" value="cm" />
          <Picker.Item label="mm" value="mm" />
          <Picker.Item label="m" value="m" />
          <Picker.Item label="kg" value="kg" />
          <Picker.Item label="lbs" value="lbs" />
        </Picker>
      </View>

      {/* Date Picker */}
      <View className="items-center w-[85%] mb-6">
        <TouchableOpacity
          className="bg-white py-3 px-4 rounded-full mb-2 w-full"
          onPress={() => setShowDatePicker(true)}
        >
          <Text className="text-[#718355] font-bold text-center">
            {date.toLocaleDateString()}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === "ios" ? "inline" : "default"}
            onChange={handleDateChange}
          />
        )}
      </View>

      {/* Submit Button */}
      <View className="w-[85%]">
        <TouchableOpacity
          className="bg-[#718355] py-3 px-4 rounded-full items-center"
          onPress={handleSubmit}
        >
          <Text className="text-white text-lg font-bold">Submit Progress</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
