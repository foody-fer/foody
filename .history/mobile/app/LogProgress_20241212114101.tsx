import React, { useState } from "react";
import { View, StyleSheet, TextInput, Button, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Text } from "@/components/ui/CustomText";
import { useLocalSearchParams, useRouter } from "expo-router";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

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
    <View style={styles.container}>
      <Text style={styles.title}>Log Progress for {category}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter value"
        keyboardType="numeric"
        value={value}
        onChangeText={setValue}
      />
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={unit}
          style={styles.picker}
          onValueChange={(itemValue) => setUnit(itemValue)}
        >
          <Picker.Item label="cm" value="cm" />
          <Picker.Item label="kg" value="kg" />
          <Picker.Item label="m" value="m" />
          <Picker.Item label="mm" value="mm" />
          <Picker.Item label="lbs" value="lbs" />
        </Picker>
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>Date: {date.toLocaleDateString()}</Text>
        <Button
          title="Change Date"
          onPress={() => setShowDatePicker(true)}
          style={styles.dateButton}
        />
      </View>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === "ios" ? "inline" : "default"}
          onChange={handleDateChange}
        />
      )}
      <View style={styles.submitContainer}>
        <Button
          title="Submit Progress"
          onPress={handleSubmit}
          style={styles.submitButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#CFE1B9",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    color: "#4CAF50",
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#A5D6A7",
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 10,
    width: "90%",
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
  },
  pickerContainer: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#A5D6A7",
    borderRadius: 50,
    overflow: "hidden",
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
  },
  picker: {
    height: 50,
    width: "100%",
  },
  dateButton: {
    backgroundColor: "#718355",
  },
  dateContainer: {
    alignItems: "center",
    marginBottom: 20,
    width: "90%",
  },
  dateText: {
    fontSize: 16,
    color: "#388E3C",
    marginBottom: 10,
  },
  submitContainer: {
    marginTop: 20,
    width: "90%",
  },
  submitButton: {
    backgroundColor: "#718355",
  },
});
