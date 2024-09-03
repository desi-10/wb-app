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
import axios from "axios";
import { useQuery, useMutation } from "react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { mutateAsync, isLoading } = useMutation(
    (credentials: { username: string; password: string }) =>
      axios.post("https://besafe.pythonanywhere.com/auth/token/", credentials),
    {
      onSuccess: (data) => {
        console.log("Login successful", data.data);
        if (data?.data?.health_response) {
          router.push("/(tabs)/dashboard");
        } else {
          router.push("/generalQuestion");
        }
        // save token to local storage
        AsyncStorage.setItem("user", JSON.stringify(data.data));
      },
      onError: (error) => {
        console.error("Login failed", error);
        Alert.alert("Login failed", "Invalid username or password");
      },
    }
  );

  const handleLogin = () => {
    mutateAsync({ username, password });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>Please sign in to continue</Text>

      <TextInput
        placeholder="Username"
        style={styles.input}
        keyboardType="default"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Link asChild href="/forgottenPassword">
        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotText}>
            Forgotten password? <Text style={styles.link}>Click here</Text>
          </Text>
        </TouchableOpacity>
      </Link>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>
          {isLoading ? "Logging in..." : "Login"}
        </Text>
      </TouchableOpacity>

      <Link asChild href="/signUp">
        <TouchableOpacity style={styles.signUp}>
          <Text style={styles.signUpText}>
            Don’t have an account? <Text style={styles.link}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </Link>

      <Link asChild href="/(tabs)/homepage" style={{ marginTop: 30 }}>
        <Text>Tabs</Text>
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
  forgotPassword: {
    alignItems: "flex-end",
    marginBottom: 24,
  },
  forgotText: {
    fontSize: 14,
    color: "#777",
  },
  link: {
    color: "#007BFF",
  },
  loginButton: {
    height: 50,
    backgroundColor: "#007BFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 24,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  signUp: {
    alignItems: "center",
  },
  signUpText: {
    fontSize: 14,
    color: "#777",
  },
});

export default LoginPage;
