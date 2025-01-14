import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";

const api = ""; // backend

const Logo = () => (
  <Image source={require("../assets/logo.png")} style={styles.logo} />
);

const Login = ({ disabled }: any) => {
  const handleNavigation = (url: any) => {
    if (!disabled) {
      // Implement navigation or deep linking logic here
    }
  };

  return (
    <View style={styles.loginContainer}>
      <TouchableOpacity
        onPress={() => handleNavigation(`${api}/oauth2/authorization/google`)}
        disabled={disabled}
        style={[styles.button, disabled && styles.disabledButton]}
      >
        <View style={styles.buttonContent}>
          <Image
            source={require("../assets/google-logo.png")}
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Sign up with Google</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleNavigation(`${api}/oauth2/authorization/github`)}
        disabled={disabled}
        style={[styles.button, disabled && styles.disabledButton]}
      >
        <View style={styles.buttonContent}>
          <Image
            source={require("../assets/github-logo.png")}
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Sign up with GitHub</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.separatorContainer}>
        <View style={styles.separator} />
        <Text style={styles.orText}>or</Text>
        <View style={styles.separator} />
      </View>

      <TouchableOpacity
        onPress={() => handleNavigation("/sign-up")}
        disabled={disabled}
        style={[styles.secondaryButton, disabled && styles.disabledButton]}
      >
        <Text style={styles.secondaryButtonText}>Create an account</Text>
      </TouchableOpacity>

      <Text style={styles.signInPrompt}>Already have an account?</Text>

      <TouchableOpacity
        onPress={() => handleNavigation("/sign-in")}
        disabled={disabled}
        style={[styles.secondaryButton, disabled && styles.disabledButton]}
      >
        <Text style={styles.secondaryButtonText}>Sign in</Text>
      </TouchableOpacity>
    </View>
  );
};

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignIn = () => {
    // Implement your sign-in logic here
  };

  return (
    <View style={styles.signInContainer}>
      <Text style={styles.title}>Welcome back 👋</Text>
      <Text style={styles.subtitle}>
        We've been missing you! Find out what's new.
      </Text>

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="E-mail / username"
        style={styles.input}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        style={styles.input}
      />

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      <TouchableOpacity onPress={handleSignIn} style={styles.signInButton}>
        <Text style={styles.signInButtonText}>Sign in</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo />
      </View>

      <Login disabled={false} />

      <SignIn />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5F4E3",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  loginContainer: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6BBF59",
    padding: 15,
    borderRadius: 25,
    marginVertical: 10,
    width: "80%",
  },
  disabledButton: {
    backgroundColor: "#D3D3D3",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  separator: {
    height: 1,
    backgroundColor: "#000",
    flex: 1,
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: "#000",
  },
  secondaryButton: {
    backgroundColor: "#4A4A4A",
    padding: 15,
    borderRadius: 25,
    marginVertical: 10,
    width: "80%",
  },
  secondaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  signInPrompt: {
    color: "#6BBF59",
    fontSize: 14,
    marginVertical: 5,
  },
  signInContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    padding: 15,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    borderRadius: 25,
    marginBottom: 15,
  },
  errorText: {
    color: "#FF0000",
    fontSize: 14,
    marginBottom: 10,
  },
  signInButton: {
    backgroundColor: "#6BBF59",
    padding: 15,
    borderRadius: 25,
    marginTop: 10,
    width: "80%",
  },
  signInButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
