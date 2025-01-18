import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { z } from "zod";
import { useRouter } from "expo-router";

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
      signUpSchema.parse(formData);
      setErrors({});
      Alert.alert("Success", "Account created successfully!");
      router.push("/Login");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.errors.reduce((acc: any, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {});
        setErrors(formattedErrors);
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Foody</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.header}>Create an account</Text>
        <Text style={styles.subHeader}>
          Sign up today and see the change tomorrow!
        </Text>

        <View style={styles.formContainer}>
          {/* Gender Selection */}
          <View style={styles.genderContainer}>
            <TouchableOpacity
              style={[
                styles.genderOption,
                formData.gender === "Male" && styles.genderSelected,
              ]}
              onPress={() => handleChange("gender", "Male")}
            >
              <Text style={styles.genderText}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.genderOption,
                formData.gender === "Female" && styles.genderSelected,
              ]}
              onPress={() => handleChange("gender", "Female")}
            >
              <Text style={styles.genderText}>Female</Text>
            </TouchableOpacity>
          </View>

          {/* Form Fields */}
          {[
            { name: "name", placeholder: "Name", value: formData.name },
            {
              name: "surname",
              placeholder: "Surname",
              value: formData.surname,
            },
            {
              name: "username",
              placeholder: "Username",
              value: formData.username,
            },
            {
              name: "num",
              placeholder: "Contact (mobile/telephone number)",
              value: formData.num,
            },
            { name: "email", placeholder: "E-mail", value: formData.email },
            {
              name: "password",
              placeholder: "Password",
              value: formData.password,
              secureTextEntry: true,
            },
          ].map((field, index) => (
            <View key={index} style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder={field.placeholder}
                value={field.value}
                secureTextEntry={field.secureTextEntry || false}
                onChangeText={(text) => handleChange(field.name, text)}
              />
              {errors[field.name] && (
                <Text style={styles.errorText}>{errors[field.name]}</Text>
              )}
            </View>
          ))}

          {/* Terms and Conditions */}
          <View style={styles.termsContainer}>
            <Text>
              I agree to Foody's{" "}
              <Text style={styles.linkText}>Terms of Service</Text> and{" "}
              <Text style={styles.linkText}>Privacy Policy</Text>
            </Text>
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => router.push("/Login")}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Already Have Account */}
      <View style={styles.footer}>
        <Text>Already have an account?</Text>
        <TouchableOpacity onPress={() => router.push("/sign-in")}>
          <Text style={styles.signInText}> Sign in</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignUpPage;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#CFE1B9", padding: 16 },
  logoContainer: { alignItems: "center", marginVertical: 32 },
  logoText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#4F5B46",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginVertical: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#4F5B46",
  },
  subHeader: {
    fontSize: 14,
    color: "#6B6F5E",
    marginBottom: 20,
    textAlign: "center",
  },
  formContainer: { marginBottom: 20 },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  genderOption: {
    borderWidth: 1,
    borderColor: "#575A4B",
    borderRadius: 50,
    padding: 10,
    width: "45%",
    alignItems: "center",
  },
  genderSelected: {
    backgroundColor: "#575A4B",
    borderColor: "#575A4B",
    color: "#ffffff",
  },
  genderText: {
    color: "#575A4B",
    fontWeight: "600",
  },
  inputWrapper: { marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#AEB5A1",
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#F8FBEF",
    fontSize: 14,
    color: "#4F5B46",
  },
  errorText: { color: "red", fontSize: 12, marginTop: 4 },
  termsContainer: { marginVertical: 16, alignItems: "center" },
  linkText: {
    color: "#4CAF50",
    textDecorationLine: "underline",
    fontWeight: "600",
  },
  buttonContainer: {
    marginTop: 24,
    flexDirection: "column",
    alignItems: "center",
  },
  submitButton: {
    backgroundColor: "#575A4B",
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 40,
    alignItems: "center",
    marginBottom: 12,
    width: "80%",
  },
  closeButton: {
    backgroundColor: "#AEB5A1",
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 40,
    alignItems: "center",
    width: "80%",
  },
  buttonText: { color: "#FFFFFF", fontWeight: "600", fontSize: 16 },
  footer: { alignItems: "center", marginTop: 24 },
  signInText: {
    color: "#4CAF50",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
