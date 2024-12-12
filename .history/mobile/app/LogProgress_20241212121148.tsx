import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log Progress for {category}</Text>
      {/* Center Container */}
      <View style={styles.centerContainer}>
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
          <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.buttonText}>Change Date</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Submit Button */}
      <View style={styles.submitContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit Progress</Text>
        </TouchableOpacity>
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
    marginBottom: 15, // Smanjeno razmicanje
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#718355",
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 10,
    width: 280, // Smanjena širina
    marginBottom: 15, // Smanjeno razmicanje
    backgroundColor: "#FFFFFF",
  },
  pickerContainer: {
    width: 280, // Smanjena širina
    borderWidth: 1,
    borderColor: "#718355",
    borderRadius: 50,
    height: 80, // Smanjena visina
    overflow: "hidden",
    marginBottom: 15, // Smanjeno razmicanje
    backgroundColor: "#FFFFFF",
    justifyContent: "center", // Centriranje Picker-a po visini
  },
  picker: {
    width: "100%",
    height: "100%", // Ispravljen prikaz unutar smanjenog containera
  },
  dateContainer: {
    alignItems: "center",
    marginBottom: 15, // Smanjeno razmicanje
    width: "90%",
  },
  dateText: {
    fontSize: 15,
    color: "#718355",
    marginBottom: 10,
    backgroundColor: "white",
    paddingVertical: 5, // Manji padding
    paddingHorizontal: 15,
    borderRadius: 50,
  },
  dateButton: {
    backgroundColor: "#718355",
    paddingVertical: 8, // Smanjen padding
    paddingHorizontal: 20,
    borderRadius: 50,
    alignItems: "center",
  },
  submitContainer: {
    marginTop: 15, // Smanjeno razmicanje
    width: "70%",
  },
  submitButton: {
    backgroundColor: "#718355",
    paddingVertical: 10, // Smanjen padding
    paddingHorizontal: 15,
    borderRadius: 50,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
