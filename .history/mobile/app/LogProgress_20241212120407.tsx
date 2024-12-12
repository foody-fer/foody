const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#CFE1B9",
  },
  title: {
    fontSize: 24,
    marginBottom: 15, // Smanjeno razmicanje
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#718355",
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 10,
    width: 280, // Smanjena širina
    marginBottom: 15, // Smanjeno razmicanje
    backgroundColor: "#FFFFFF",
  },
  pickerContainer: {
    width: 280, // Smanjena širina
    borderWidth: 1,
    borderColor: "#718355",
    borderRadius: 50,
    height: 40, // Smanjena visina
    overflow: "hidden",
    marginBottom: 15, // Smanjeno razmicanje
    backgroundColor: "#FFFFFF",
    justifyContent: "center", // Centriranje Picker-a po visini
  },
  picker: {
    width: "100%",
    height: "100%", // Ispravljen prikaz unutar smanjenog containera
  },
  dateContainer: {
    alignItems: "center",
    marginBottom: 15, // Smanjeno razmicanje
    width: "90%",
  },
  dateText: {
    fontSize: 15,
    color: "#718355",
    marginBottom: 10,
    backgroundColor: "white",
    paddingVertical: 5, // Manji padding
    paddingHorizontal: 15,
    borderRadius: 50,
  },
  dateButton: {
    backgroundColor: "#718355",
    paddingVertical: 8, // Smanjen padding
    paddingHorizontal: 20,
    borderRadius: 50,
    alignItems: "center",
  },
  submitContainer: {
    marginTop: 15, // Smanjeno razmicanje
    width: "70%",
  },
  submitButton: {
    backgroundColor: "#718355",
    paddingVertical: 10, // Smanjen padding
    paddingHorizontal: 15,
    borderRadius: 50,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
