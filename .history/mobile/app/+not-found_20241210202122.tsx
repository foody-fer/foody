import { View, StyleSheet } from "react-native";
import { Link, Stack } from "expo-router";

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Oops! Not found!" }} />
      <Link href={"/"} style={styles.button}>
        Go back to the home screen
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CFE1B9",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
  },
  button: {
    fontSize: 35,
    textDecorationLine: "none",
    color: "#fff",
    backgroundColor: "#718355",
    padding: 20,
    borderCurve: "circular",
  },
});
