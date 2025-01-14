import React, { useState } from "react";
import { View, StyleSheet, TextInput, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Text } from "@/components/ui/CustomText";
import { useLocalSearchParams, useRouter } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";

export default function LogProgress() {
  const { category } = useLocalSearchParams(); // Dohvaća parametar iz URL-a
  const router = useRouter();
  const [value, setValue] = useState("");
  const [unit, setUnit] = useState("cm");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleSubmit = () => {
    // Navigacija nazad na Progress screen
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
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>Date: {date.toLocaleDateString()}</Text>
        <Button title="Change Date" onPress={() => setShowDatePicker(true)} />
      </View>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <Button title="Submit Progress" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E6F4E6", // Boja iz Progress screena
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    color: "#4CAF50", // Zelena boja za tekst
  },
  input: {
    height: 40,
    borderColor: "#A5D6A7",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    width: "80%",
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: "80%",
    marginBottom: 20,
  },
  dateContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  dateText: {
    fontSize: 16,
    color: "#388E3C",
    marginBottom: 10,
  },
});
