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
  container: { flex: 1, backgroundColor: "#E3F4D7", justifyContent: "center" },
  logoContainer: { alignItems: "center", marginBottom: 20 },
  logoText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4F5B46",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#4F5B46",
    textAlign: "center",
  },
  subHeader: {
    fontSize: 12,
    color: "#6B6F5E",
    marginBottom: 16,
    textAlign: "center",
  },
  formContainer: { marginBottom: 16 },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  genderOption: {
    borderWidth: 1,
    borderColor: "#AEB5A1",
    borderRadius: 50,
    paddingVertical: 8,
    width: "45%",
    alignItems: "center",
  },
  genderSelected: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
  genderText: {
    color: "#4F5B46",
    fontWeight: "600",
    fontSize: 12,
  },
  inputWrapper: { marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#AEB5A1",
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#F8FBEF",
    fontSize: 12,
    color: "#4F5B46",
  },
  errorText: { color: "red", fontSize: 10, marginTop: 4 },
  termsContainer: { marginVertical: 10, alignItems: "center" },
  linkText: {
    color: "#4CAF50",
    textDecorationLine: "underline",
    fontWeight: "600",
    fontSize: 12,
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: "column",
    alignItems: "center",
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 32,
    alignItems: "center",
    marginBottom: 10,
    width: "80%",
  },
  closeButton: {
    backgroundColor: "#AEB5A1",
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 32,
    alignItems: "center",
    width: "80%",
  },
  buttonText: { color: "#FFFFFF", fontWeight: "600", fontSize: 14 },
  footer: { alignItems: "center", marginTop: 10 },
  signInText: {
    color: "#4CAF50",
    fontWeight: "bold",
    textDecorationLine: "underline",
    fontSize: 12,
  },
});
