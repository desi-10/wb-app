import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import { Pedometer } from "expo-sensors";
import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const Dashboard = () => {
  const [steps, setSteps] = useState("0");
  const [isPedometerAvailable, setIsPedometerAvailable] = useState(false);
  const [stepCount, setStepCount] = useState(0);

  useEffect(() => {
    AsyncStorage.getItem("steps").then((value) => setSteps(value || "0"));
  }, []);

  useEffect(() => {
    let subscription: { remove: () => void } | null = null;

    const subscribe = async () => {
      try {
        const isAvailable = await Pedometer.isAvailableAsync();
        setIsPedometerAvailable(isAvailable);

        if (isAvailable) {
          const end = new Date();
          const start = new Date();
          start.setHours(0, 0, 0, 0);

          const pastStepCount = await Pedometer.getStepCountAsync(start, end);
          setStepCount(pastStepCount.steps);

          subscription = Pedometer.watchStepCount((result) => {
            setStepCount((prevSteps) => prevSteps + result.steps);
          });
        }
      } catch (error) {
        console.error("Error setting up pedometer:", error);
        setIsPedometerAvailable(false);
      }
    };

    subscribe();

    return () => {
      subscription?.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: "https://via.placeholder.com/50" }} // Replace with actual image URI
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.dateText}>29 December, 2026</Text>
          <Text style={styles.greetingText}>
            Good morning,
            {/* Good morning, <Text style={styles.nameText}>Trapcy</Text> */}
          </Text>
        </View>
        <TouchableOpacity style={styles.menuButton}>
          <View style={styles.menuIcon}></View>
        </TouchableOpacity>
      </View>

      <View style={styles.summary}>
        <View style={{ width: "100%" }}>
          <Link href="/others/steps">
            <View style={[styles.summaryBox, styles.stepsBox]}>
              <Text style={styles.summaryTitle}>STEPS</Text>
              <Text style={styles.summaryValue}>{stepCount}</Text>
            </View>
          </Link>
        </View>
        <View style={[styles.summaryBox, styles.sleepBox]}>
          <Text style={styles.summaryTitle}>SLEEP</Text>
          <Text style={styles.summaryValue}>7 h 30 min</Text>
        </View>
        <View style={[styles.summaryBox, styles.usageBox]}>
          <Text style={styles.summaryTitle}>Avg Usage</Text>
          <Text style={styles.summaryValue}>Moderate</Text>
        </View>
        <View style={styles.summaryBox}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: "#f4f4f4",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#007bff",
    height: 150,
    padding: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  dateText: {
    color: "#fff",
    fontSize: 12,
  },
  greetingText: {
    color: "#fff",
    fontSize: 16,
    marginTop: 5,
  },
  nameText: {
    fontWeight: "bold",
  },
  menuButton: {},
  menuIcon: {
    width: 20,
    height: 20,
    backgroundColor: "#fff",
    borderRadius: 3,
  },
  summary: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 20,
  },
  summaryBox: {
    width: "48%",
    height: 150,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  stepsBox: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sleepBox: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  usageBox: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  summaryTitle: {
    color: "#007bff", // Changed text color to match the theme
    fontSize: 20,
    marginBottom: 5,
  },
  summaryValue: {
    color: "#000", // Changed text color to be more visible
    fontSize: 25,
    fontWeight: "bold",
  },
  bottom: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  bottomIcon: {
    width: 50,
    height: 50,
    backgroundColor: "#007bff",
    borderRadius: 25,
  },
});

export default Dashboard;
