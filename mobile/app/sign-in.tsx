import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { apiCall, queryClient } from "@/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignIn = () => {
  const [input, setInput] = useState("");
  const [errorMessage, setEmailError] = useState("");
  const [bool1, setBool1] = useState(true);

  const [password, setPassword] = useState("");
  const [errorMessage2, setEmailError2] = useState("");
  const [bool2, setBool2] = useState(true);

  const [serverErrorMessage, setServerErrorMessage] = useState("");
  const router = useRouter();

  const inputOnChange = (text: string) => {
    setInput(text);
  };

  const passwordOnChange = (text: string) => {
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
      Alert.alert("Error", "Invalid email or password");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back 👋</Text>
      <Text style={styles.subtitle}>We've been missing you!</Text>
      <Text style={styles.subtitle}>Find out what's new.</Text>

      <View>
        <TextInput
          style={[styles.input, !bool1 && styles.inputError]}
          placeholder="E-mail / username"
          onChangeText={inputOnChange}
          maxLength={50}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        {!bool1 && <Text style={styles.errorMessage}>{errorMessage}</Text>}

        <TextInput
          style={[styles.input, !bool2 && styles.inputError]}
          placeholder="Password"
          onChangeText={passwordOnChange}
          maxLength={20}
          secureTextEntry
        />
        {!bool2 && <Text style={styles.errorMessage}>{errorMessage2}</Text>}

        {serverErrorMessage && (
          <Text style={styles.errorMessage}>{serverErrorMessage}</Text>
        )}
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity onPress={handleSubmit} style={styles.signInButton}>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.closeButton}
          onPress={() =>
            router.push({
              pathname: "/Login",
            })
          }
        >
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text>Don't have an account?</Text>
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/sign-up",
            })
          }
        >
          <Text style={styles.signUpText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    width: "100%",
    height: 48,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  inputError: {
    borderColor: "red",
  },
  errorMessage: {
    color: "red",
    fontSize: 12,
    marginBottom: 8,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  signInButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginRight: 8,
  },
  closeButton: {
    backgroundColor: "#737380",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  signUpText: {
    color: "#4CAF50",
    fontWeight: "bold",
    marginLeft: 4,
  },
});
