import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useMutation } from "react-query";
import axios from "axios";

const API_URL = "https://besafe.pythonanywhere.com/auth/register/";

const registerUser = async (userData: {
  fullName: string;
  email: string;
  password: string;
}) => {
  console.log(userData);

  const response = await axios.post(API_URL, {
    username: userData.fullName,
    email: userData.email,
    password: userData.password,
  });
  return response.data;
};

const RegisterPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      console.log("Registration successful:", data);
      Alert.alert("Success", "Registration successful!");
      // Here you might want to navigate to another screen or log the user in
      router.push("/");
    },
    onError: (error) => {
      console.error("Registration failed:", error);
      Alert.alert("Error", "Registration failed. Please try again.");
      console.log(error);
    },
  });

  const handleRegister = () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    mutateAsync({ fullName, email, password });
  };

  return (
    <View style={styles.container}>
      <Link asChild href="/">
        <TouchableOpacity style={styles.backButton}>
          {/* You can use an icon library like react-native-vector-icons for the back arrow */}

          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
      </Link>

      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>
        Please provide your details to continue
      </Text>

      <TextInput
        placeholder="Full Name"
        style={styles.input}
        value={fullName}
        onChangeText={setFullName}
      />

      <TextInput
        placeholder="Email address"
        style={styles.input}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        placeholder="Confirm password"
        style={styles.input}
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity
        style={styles.registerButton}
        onPress={handleRegister}
        disabled={isLoading}
      >
        <Text style={styles.registerButtonText}>
          {isLoading ? "Registering..." : "Register →"}
        </Text>
      </TouchableOpacity>

      <Link asChild href="/">
        <TouchableOpacity style={styles.signIn}>
          <Text style={styles.signInText}>
            Already have an account? <Text style={styles.link}>Sign In</Text>
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
    marginBottom: 8,
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
    marginBottom: 12,
    paddingLeft: 10,
    backgroundColor: "#F7F7F7",
  },
  registerButton: {
    height: 50,
    backgroundColor: "#007BFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 24,
  },
  registerButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  signIn: {
    alignItems: "center",
  },
  signInText: {
    fontSize: 14,
    color: "#777",
  },
  link: {
    color: "#007BFF",
  },
});

export default RegisterPage;
