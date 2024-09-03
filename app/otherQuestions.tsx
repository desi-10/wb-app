import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const OtherQuestionsPage = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>

      <Text style={styles.mainText}>The other questions</Text>

      <TouchableOpacity style={styles.nextButton}>
        <Text style={styles.nextButtonText}>Next →</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  backArrow: {
    fontSize: 24,
    color: "#333",
  },
  mainText: {
    fontSize: 32,
    fontWeight: "400",
    fontStyle: "italic",
    color: "#007BFF",
    textAlign: "center",
    marginBottom: 50,
  },
  nextButton: {
    height: 50,
    backgroundColor: "#007BFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 100,
  },
  nextButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default OtherQuestionsPage;
