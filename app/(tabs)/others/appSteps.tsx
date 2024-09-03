import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { Pedometer } from "expo-sensors";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function StepTracker() {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState<
    boolean | "checking"
  >("checking");
  const [stepCount, setStepCount] = useState(0);

  useEffect(() => {
    let subscription: { remove: () => void } | null = null;

    const fetchSavedSteps = async () => {
      try {
        const savedSteps = await AsyncStorage.getItem("stepCount");
        if (savedSteps !== null) {
          setStepCount(parseInt(savedSteps, 10));
        }
      } catch (error) {
        console.error("Failed to fetch saved steps:", error);
      }
    };

    const saveSteps = async (steps: number) => {
      try {
        await AsyncStorage.setItem("stepCount", steps.toString());
      } catch (error) {
        console.error("Failed to save steps:", error);
      }
    };

    const subscribe = async () => {
      try {
        const isAvailable = await Pedometer.isAvailableAsync();
        setIsPedometerAvailable(isAvailable);

        if (isAvailable) {
          await fetchSavedSteps();

          subscription = Pedometer.watchStepCount((result) => {
            setStepCount((prevSteps) => {
              const updatedSteps = prevSteps + result.steps;
              saveSteps(updatedSteps);
              return updatedSteps;
            });
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
      <Text style={styles.title}>Step Tracker</Text>
      {isPedometerAvailable === "checking" ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Text style={styles.status}>
            Pedometer available: {isPedometerAvailable ? "Yes" : "No"}
          </Text>
          <Text style={styles.steps}>Steps: {stepCount}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  status: {
    fontSize: 18,
    marginBottom: 10,
  },
  steps: {
    fontSize: 36,
    fontWeight: "bold",
  },
});
