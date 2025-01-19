import { useRouter } from "expo-router";
import React, { useState } from "react";
import { z } from "zod";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";

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
      Alert.alert("Success", "Form submitted successfully!");
      router.push("/");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.errors.reduce((acc: any, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {});
        setErrors(formattedErrors);
      } else {
        Alert.alert("Error", "Error submitting form");
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require("../images/logo.png")} style={styles.logo} />
      <View style={styles.formContainer}>
        <Text style={styles.title}>Create an Account</Text>
        <View style={styles.genderContainer}>
          {["male", "female"].map((gender) => (
            <TouchableOpacity
              key={gender}
              style={[
                styles.genderButton,
                formData.gender === gender && styles.selectedGenderButton,
              ]}
              onPress={() => handleChange("gender", gender)}
            >
              <Text
                style={[
                  styles.genderText,
                  formData.gender === gender && styles.selectedGenderText,
                ]}
              >
                {gender.charAt(0).toUpperCase() + gender.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {[
          { name: "name", placeholder: "Name" },
          { name: "surname", placeholder: "Surname" },
          { name: "username", placeholder: "Username" },
          { name: "num", placeholder: "Phone (e.g., +123 4567890)" },
          { name: "email", placeholder: "Email" },
          { name: "password", placeholder: "Password", secureTextEntry: true },
        ].map(({ name, placeholder, secureTextEntry }) => (
          <View key={name} style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={placeholder}
              value={formData[name]}
              onChangeText={(value) => handleChange(name, value)}
              secureTextEntry={secureTextEntry}
            />
            {errors[name] && (
              <Text style={styles.errorText}>{errors[name]}</Text>
            )}
          </View>
        ))}
        <Text style={styles.termsText}>
          By signing up, you agree to our <Text style={styles.link}>Terms</Text>{" "}
          and <Text style={styles.link}>Privacy Policy</Text>.
        </Text>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Sign Up</Text>
        </TouchableOpacity>
        <Text style={styles.footerText}>
          Already have an account?{" "}
          <Text style={styles.link} onPress={() => router.push("/sign-in")}>
            Sign in
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#e0f2f1",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 20,
  },
  formContainer: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  genderButton: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    alignItems: "center",
    marginHorizontal: 5,
  },
  selectedGenderButton: {
    backgroundColor: "#00695c",
  },
  genderText: {
    color: "#555",
  },
  selectedGenderText: {
    color: "white",
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  termsText: {
    textAlign: "center",
    fontSize: 12,
    color: "#555",
    marginBottom: 20,
  },
  link: {
    color: "#00796b",
    textDecorationLine: "underline",
  },
  submitButton: {
    backgroundColor: "#00695c",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  footerText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 12,
    color: "#555",
  },
});

export default SignUpPage;
