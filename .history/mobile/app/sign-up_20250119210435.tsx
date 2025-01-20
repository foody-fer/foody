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
    gender: "male",
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
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../images/logo.png")}
          style={{ width: 150, height: 150 }}
          resizeMode="contain"
          alt="Logo"
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.header}>Create an account</Text>

        <View style={styles.genderContainer}>
          <TouchableOpacity
            style={[
              styles.genderOption,
              styles.genderLeft,
              formData.gender === "male" && styles.genderSelected,
            ]}
            onPress={() => handleChange("gender", "male")}
          >
            <Text
              style={[
                styles.genderText,
                formData.gender === "male" && styles.genderSelectedText,
              ]}
            >
              Male
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.genderOption,
              styles.genderRight,
              formData.gender === "female" && styles.genderSelected,
            ]}
            onPress={() => handleChange("gender", "female")}
          >
            <Text
              style={[
                styles.genderText,
                formData.gender === "female" && styles.genderSelectedText,
              ]}
            >
              Female
            </Text>
          </TouchableOpacity>
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
    </View>
  );
};

export default SignUpPage;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#CFE1B9",
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: { marginBottom: 16, marginTop: 8, alignItems: "center" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    elevation: 3,
    width: "90%",
    maxWidth: 400,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#373737",
    textAlign: "center", // Center the title
  },
  genderContainer: {
    flexDirection: "row",
    marginBottom: 16,
    borderWidth: 1,
    borderRadius: 50,
    overflow: "hidden",
    borderColor: "#575A4B",
  },
  genderOption: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  genderLeft: { borderRightWidth: 1, borderColor: "#575A4B" },
  genderRight: {},
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
