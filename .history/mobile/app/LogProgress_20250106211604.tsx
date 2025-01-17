import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Text } from "../components/ui/CustomText";

export const options = {
  headerShown: false,
};

export default function LogProgress() {
  const { category } = useLocalSearchParams();
  const router = useRouter();
  const [value, setValue] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const dismissKeyboard = () => Keyboard.dismiss();

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard} accessible={false}>
      <ScrollView
        className="flex-1 p-5 bg-[#CFE1B9]"
        keyboardShouldPersistTaps="handled"
      >
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
            console.log("Blurred");
            dismissKeyboard();
          }}
        />
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <Text className="text-center text-lg text-[#718355] mb-2 bg-white py-1 px-4 rounded-full w-72 h-10 border border-[#718355]">
            {date.toLocaleDateString()}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(event, selectedDate) =>
              selectedDate && setDate(selectedDate)
            }
          />
        )}
        <TouchableOpacity
          className="bg-[#718355] py-2 px-4 rounded-full items-center w-58"
          onPress={() => router.push("/Progress")}
        >
          <Text className="text-white text-lg font-bold">Submit Progress</Text>
        </TouchableOpacity>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
