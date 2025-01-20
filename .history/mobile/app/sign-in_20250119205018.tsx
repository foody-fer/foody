import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { apiCall, queryClient } from "@/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignIn = () => {
  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleInputChange = (text) => {
    setInput(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleSubmit = async () => {
    try {
      const res = await apiCall("/auth", {
        method: "POST",
        body: JSON.stringify({
          user: {
            email: input,
            password: password,
          },
        }),
      });

      await AsyncStorage.setItem("token", res.token);
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      router.push("/");
    } catch (error) {
      setErrorMessage("Invalid email or password");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../images/logo.png")}
          style={{ width: 150, height: 150 }}
          resizeMode="contain"
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.header}>Welcome Back</Text>
        <Text style={styles.subtitle}>
          We've missed you! Log in to continue.
        </Text>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="E-mail / Username"
            value={input}
            onChangeText={handleInputChange}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={handlePasswordChange}
            secureTextEntry
          />
        </View>

        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkContainer}
          onPress={() => router.push("/sign-up")}
        >
          <Text style={styles.footerText}>
            Don’t have an account? <Text style={styles.linkText}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#CFE1B9",
    alignItems: "center", // Center the children horizontally
    justifyContent: "flex-start", // Align children towards the top
    padding: 16,
  },
  logoContainer: {
    marginBottom: 16,
    alignItems: "center", // Center the logo horizontally
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    elevation: 3,
    width: "90%",
    maxWidth: 400,
    alignSelf: "center", // Center the card horizontally
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#373737",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#575A4B",
    marginBottom: 16,
    textAlign: "center",
  },
  inputWrapper: {
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#AEB5A1",
    borderRadius: 50,
    padding: 12,
    fontSize: 14,
    backgroundColor: "#F8FBEF",
  },
  errorText: {
    fontSize: 12,
    color: "red",
    marginBottom: 8,
    textAlign: "center",
  },
  submitButton: {
    backgroundColor: "#575A4B",
    padding: 12,
    borderRadius: 50,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerText: {
    fontSize: 14,
    color: "#373737",
    textAlign: "center",
    marginTop: 16,
  },
  linkText: {
    color: "#718355",
    textDecorationLine: "underline",
  },
  linkContainer: {
    marginTop: 16,
    alignItems: "center",
  },
});
