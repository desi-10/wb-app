import { Link } from "expo-router";
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const ForgottenPasswordPage = () => {
  return (
    <View style={styles.container}>
      <Link asChild href="/">
        <TouchableOpacity style={styles.backButton}>
          {/* You can use an icon library like react-native-vector-icons for the back arrow */}
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
      </Link>

      <Text style={styles.title}>Forgotten Password</Text>
      <Text style={styles.subtitle}>
        Please enter your email address to reset your password
      </Text>

      <TextInput
        placeholder="Email address"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.resetButton}>
        <Text style={styles.resetButtonText}>Reset Password</Text>
      </TouchableOpacity>
      <Link asChild href="/">
        <TouchableOpacity style={styles.signInLink}>
          <Text style={styles.signInText}>
            Remember your password?{" "}
            <Text style={styles.signInLinkText}>Sign In</Text>
          </Text>
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
  subtitle: {
    fontSize: 14,
    color: "#777",
    marginBottom: 24,
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
  resetButton: {
    height: 50,
    backgroundColor: "#007BFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 24,
  },
  resetButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  signInLink: {
    justifyContent: "center",
    alignItems: "center",
  },
  signInText: {
    fontSize: 14,
    color: "#777",
  },
  signInLinkText: {
    color: "#007BFF",
    fontWeight: "bold",
  },
});

export default ForgottenPasswordPage;
