import { Text } from "@/components/ui/CustomText";
import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";

const api = ""; // backend

function Login({ disabled }: { disabled: boolean }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          if (!disabled)
            window.location.href = `${api}/oauth2/authorization/google`;
        }}
        style={[
          styles.button,
          styles.googleButton,
          !disabled && styles.activeButton,
        ]}
        disabled={disabled}
      >
        <View style={styles.buttonContent}>
          <Image
            source={require("../images/google-logo.png")}
            style={styles.logo}
          />
          <Text style={styles.buttonText}>Sign up with Google</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          if (!disabled)
            window.location.href = `${api}/oauth2/authorization/github`;
        }}
        style={[
          styles.button,
          styles.githubButton,
          !disabled && styles.activeButton,
        ]}
        disabled={disabled}
      >
        <View style={styles.buttonContent}>
          <Image
            source={require("../images/github-logo.png")}
            style={styles.logo}
          />
          <Text style={styles.buttonText}>Sign up with GitHub</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>or</Text>
        <View style={styles.line} />
      </View>

      <TouchableOpacity
        onPress={() => {
          if (!disabled) window.location.href = "/sign-up";
        }}
        style={[
          styles.button,
          styles.createAccountButton,
          !disabled && styles.activeButton,
        ]}
        disabled={disabled}
      >
        <Text style={styles.buttonText}>Create an account</Text>
      </TouchableOpacity>

      <Text style={styles.alreadyAccountText}>Already have an account?</Text>

      <TouchableOpacity
        onPress={() => {
          if (!disabled) window.location.href = "/sign-in";
        }}
        style={[
          styles.button,
          styles.signInButton,
          !disabled && styles.activeButton,
        ]}
        disabled={disabled}
      >
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginVertical: 10,
    opacity: 0.7, // For disabled state
  },
  activeButton: {
    opacity: 1,
  },
  googleButton: {
    backgroundColor: "#8DB596",
    borderWidth: 2,
    borderColor: "#B5D6A7",
  },
  githubButton: {
    backgroundColor: "#8DB596",
    borderWidth: 2,
    borderColor: "#B5D6A7",
  },
  createAccountButton: {
    backgroundColor: "#5D5A4E",
  },
  signInButton: {
    backgroundColor: "#5D5A4E",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#000",
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  alreadyAccountText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#B5D6A7",
  },
});

export default Login;
