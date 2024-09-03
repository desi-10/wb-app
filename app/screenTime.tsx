import { useQuestion } from "@/components/QuestionContext";
import { useUser } from "@/components/userContext";
import axios, { AxiosError } from "axios";
import { router } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";

const ScreenTimeSurvey = () => {
  const { question, setQuestion } = useQuestion();
  const { user } = useUser();

  console.log(user);

  const handleSubmit = async () => {
    // Handle the submit action here

    try {
      const { data } = await axios.patch(
        `https://besafe.pythonanywhere.com/profiles/${user?.profile_id}/`,
        {
          age: question.age,
          occupation: question.occupation,
          avg_screen_time: question.avg_screen_time,
          health_response: {
            eye_strain: question.eyeStrain,
            vision_problems: question.visionProblems,
            break_frequency: question.breakFrequency,
            screen_time_management: question.screenTimeManagement,
          },
        }
      );
      console.log(data);
      router.push("/(tabs)/dashboard");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
      }
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        {/* You can use an icon for the back button here */}
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

      <Text style={styles.headerText}>Lifestyle and Habits</Text>

      <Text style={styles.questionText}>
        How often do you take breaks during long periods of screen use?
      </Text>

      <View style={styles.optionContainer}>
        {["Rarely", "Sometimes", "Often", "Always"].map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.optionButton,
              question.breakFrequency === option && styles.selectedOption,
            ]}
            onPress={() => setQuestion({ ...question, breakFrequency: option })}
          >
            <Text
              style={[
                styles.optionText,
                question.breakFrequency === option && styles.selectedOptionText,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.questionText}>
        Do you follow any screen time management practices?
      </Text>

      <View style={styles.optionContainer}>
        {["Yes", "No"].map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.optionButton,
              question.screenTimeManagement === option && styles.selectedOption,
            ]}
            onPress={() =>
              setQuestion({ ...question, screenTimeManagement: option })
            }
          >
            <Text
              style={[
                styles.optionText,
                question.screenTimeManagement === option &&
                  styles.selectedOptionText,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit →</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  questionText: {
    fontSize: 16,
    marginBottom: 10,
  },
  optionContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  optionButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
    marginRight: 10,
  },
  selectedOption: {
    backgroundColor: "#007bff",
  },
  optionText: {
    color: "#000",
  },
  selectedOptionText: {
    color: "#fff",
  },
  submitButton: {
    marginTop: 20,
    padding: 15,
    borderRadius: 5,
    backgroundColor: "#007bff",
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ScreenTimeSurvey;
