import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import { z } from "zod";
import { useRouter } from "expo-router";
import { apiCall, queryClient } from "@/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "@/components/ui/CustomText";

const signUpSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .regex(/^[A-ZČĆŠĐŽ][a-zA-ZČĆŠĐŽčćšđž]*$/, "Incorrect name format"),
  surname: z
    .string()
    .min(2, "Surname must be at least 2 characters")
    .regex(/^[A-ZŠČĆĐŽ][a-zA-ZČĆŠĐŽčćšđž]*$/, "Incorrect surname format"),
  username: z
    .string()
    .min(4, "Username must be at least 4 characters")
    .regex(/^[a-zA-Z][a-zA-Z0-9._]*$/, "Incorrect username format"),
  num: z
    .string()
    .regex(
      /^\+\d{1,4} \d{6,}$/,
      "Phone number must follow the format +(country_code) phone_number"
    ),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  gender: z.enum(["male", "female"]),
});

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    username: "",
    num: "",
    email: "",
    password: "",
    gender: "",
  });

  const [errors, setErrors] = useState<any>({});
  const router = useRouter();

  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const data = signUpSchema.parse(formData);
      setErrors({});
      const res = await apiCall("/registrations", {
        method: "POST",
        body: JSON.stringify({
          user: {
            ...data,
            first_name: data.name,
            last_name: data.surname,
            phone: data.num,
          },
        }),
      });

      await AsyncStorage.setItem("token", res.token);
      queryClient.invalidateQueries({ queryKey: ["auth"] });

      Alert.alert("Success", "Account created successfully!");
      router.push("/");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.errors.reduce((acc: any, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {});
        return setErrors(formattedErrors);
      }

      Alert.alert("Error", "Error creating account");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <View className="items-center">
          <Image
            source={require("../images/logo.png")}
            style={{ width: 150, height: 150 }}
            resizeMode="contain"
            alt="Logo"
          />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.header}>Create an account</Text>

        {/* Gender Selection */}
        <View style={styles.genderContainer}>
          {["male", "female"].map((gender) => (
            <TouchableOpacity
              key={gender}
              style={[
                styles.genderOption,
                formData.gender === gender && styles.genderSelected,
              ]}
              onPress={() => handleChange("gender", gender)}
            >
              <Text
                style={[
                  styles.genderText,
                  formData.gender === gender && styles.genderSelectedText,
                ]}
              >
                {gender.charAt(0).toUpperCase() + gender.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Form Fields */}
        {[
          { name: "name", placeholder: "Name" },
          { name: "surname", placeholder: "Surname" },
          { name: "username", placeholder: "Username" },
          { name: "num", placeholder: "Phone (e.g., +123 4567890)" },
          { name: "email", placeholder: "Email" },
          { name: "password", placeholder: "Password", secureTextEntry: true },
        ].map(({ name, placeholder, secureTextEntry }) => (
          <View key={name} style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder={placeholder}
              secureTextEntry={secureTextEntry}
              value={formData[name]}
              onChangeText={(text) => handleChange(name, text)}
            />
            {errors[name] && (
              <Text style={styles.errorText}>{errors[name]}</Text>
            )}
          </View>
        ))}

        {/* Terms and Submit */}
        <Text style={styles.termsText}>
          By signing up, you agree to our{" "}
          <Text style={styles.linkText}>Terms</Text> and{" "}
          <Text style={styles.linkText}>Privacy Policy</Text>.
        </Text>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => router.push("/sign-in")}>
        <Text style={styles.footerText}>
          Already have an account? <Text style={styles.linkText}>Sign in</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SignUpPage;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#CFE1B9",
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
  },
  logoContainer: { marginBottom: 16, alignItems: "center" },
  logoText: { fontSize: 28, fontWeight: "bold", color: "#4F5B46" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    elevation: 3,
    width: "90%", // Ensures the card is not too narrow
    maxWidth: 400, // Optional: Limit max width for larger screens
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#373737",
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  genderOption: {
    borderWidth: 1,
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: "#575A4B",
  },
  genderSelected: { backgroundColor: "#575A4B" },
  genderText: { fontSize: 14, color: "#575A4B" },
  genderSelectedText: { color: "#fff" },
  inputWrapper: { marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#AEB5A1",
    borderRadius: 50,
    padding: 12,
    fontSize: 14,
    backgroundColor: "#F8FBEF",
  },
  errorText: { fontSize: 12, color: "red", marginTop: 4 },
  termsText: { fontSize: 12, color: "#373737", marginBottom: 16 },
  linkText: { color: "#718355", textDecorationLine: "underline" },
  submitButton: {
    backgroundColor: "#575A4B",
    padding: 12,
    borderRadius: 50,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  footerText: {
    marginTop: 16,
    fontSize: 14,
    textAlign: "center",
    color: "#373737",
  },
});
