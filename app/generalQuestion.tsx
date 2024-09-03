import { useQuestion } from "@/components/QuestionContext";
import { Link } from "expo-router";
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const GeneralInfoPage = () => {
  const { question, setQuestion } = useQuestion();
  return (
    <View style={styles.container}>
      <Link asChild href="/">
        <TouchableOpacity style={styles.backButton}>
          {/* You can use an icon library like react-native-vector-icons for the back arrow */}
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
      </Link>

      <Text style={styles.title}>General Information</Text>

      <Text style={styles.question}>What is your age?</Text>
      <TextInput
        placeholder="e.g. 20"
        style={styles.input}
        keyboardType="numeric"
        onChangeText={(text) => setQuestion({ ...question, age: text })}
      />

      <Text style={styles.question}>What is your occupation?</Text>
      <TextInput placeholder="e.g. Software Developer" style={styles.input} />

      <Text style={styles.question}>
        On average, how many hours a day do you spend on screens (including
        phone, computer, tablet, TV)?
      </Text>
      <TextInput
        placeholder="e.g. 5 hours"
        style={styles.input}
        keyboardType="numeric"
        onChangeText={(text) =>
          setQuestion({ ...question, avg_screen_time: text })
        }
      />

      <Link asChild href="/eyeHealth">
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
    fontSize: 14,
    color: "#777",
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 24,
    paddingLeft: 10,
    backgroundColor: "#F7F7F7",
  },
  nextButton: {
    height: 50,
    backgroundColor: "#007BFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 24,
  },
  nextButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default GeneralInfoPage;
