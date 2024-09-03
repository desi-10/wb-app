import { useQuestion } from "@/components/QuestionContext";
import { Link } from "expo-router";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const EyeHealthPage = () => {
  const { question, setQuestion } = useQuestion();

  return (
    <View style={styles.container}>
      <Link asChild href="/generalQuestion">
        <TouchableOpacity style={styles.backButton}>
          {/* You can use an icon library like react-native-vector-icons for the back arrow */}
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
      </Link>

      <Text style={styles.title}>Eye Health</Text>

      <Text style={styles.question}>
        Do you experience eye strain, blurred vision, or dry eyes after using
        screens?
      </Text>
      <View style={styles.optionContainer}>
        <TouchableOpacity
          style={[
            styles.optionButton,
            question.eyeStrain === "Yes" && styles.optionButtonSelected,
          ]}
          onPress={() => setQuestion({ ...question, eyeStrain: "Yes" })}
        >
          <Text
            style={[
              styles.optionText,
              question.eyeStrain === "Yes" && styles.optionTextSelected,
            ]}
          >
            Yes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.optionButton,
            question.eyeStrain === "No" && styles.optionButtonSelected,
          ]}
          onPress={() => setQuestion({ ...question, eyeStrain: "No" })}
        >
          <Text
            style={[
              styles.optionText,
              question.eyeStrain === "No" && styles.optionTextSelected,
            ]}
          >
            No
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.question}>
        Have you been diagnosed with any vision problems?
      </Text>
      <View style={styles.optionContainer}>
        <TouchableOpacity
          style={[
            styles.optionButton,
            question.visionProblems === "Yes" && styles.optionButtonSelected,
          ]}
          onPress={() => setQuestion({ ...question, visionProblems: "Yes" })}
        >
          <Text
            style={[
              styles.optionText,
              question.visionProblems === "Yes" && styles.optionTextSelected,
            ]}
          >
            Yes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.optionButton,
            question.visionProblems === "No" && styles.optionButtonSelected,
          ]}
          onPress={() => setQuestion({ ...question, visionProblems: "No" })}
        >
          <Text
            style={[
              styles.optionText,
              question.visionProblems === "No" && styles.optionTextSelected,
            ]}
          >
            No
          </Text>
        </TouchableOpacity>
      </View>

      <Link asChild href="/screenTime">
        <TouchableOpacity style={styles.nextButton}>
          <Text style={styles.nextButtonText}>Next →</Text>
        </TouchableOpacity>
      </Link>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 24,
  },
  question: {
    fontSize: 16,
    color: "#333",
    marginBottom: 16,
  },
  optionContainer: {
    flexDirection: "row",
    marginBottom: 24,
  },
  optionButton: {
    flex: 1,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ccc",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  optionButtonSelected: {
    backgroundColor: "#007BFF",
  },
  optionText: {
    color: "#333",
    fontSize: 16,
  },
  optionTextSelected: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  nextButton: {
    height: 50,
    backgroundColor: "#007BFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  nextButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EyeHealthPage;
