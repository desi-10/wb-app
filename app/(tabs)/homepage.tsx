import React, { useState, useEffect, useRef } from "react";
import { AppState, AppStateStatus, Text, View, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const App = () => {
  const [screenTime, setScreenTime] = useState(0); // Time in seconds
  const [appState, setAppState] = useState(AppState.currentState);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const appStateSubscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    // Load saved screen time when the component mounts
    loadScreenTime();

    if (appState === "active") {
      startScreenTimeCounter();
    }

    return () => {
      appStateSubscription.remove();
      stopScreenTimeCounter();
      saveScreenTime();
    };
  }, []);

  console.log(appState, "appState");

  const handleAppStateChange = async (nextAppState: AppStateStatus) => {
    if (appState !== "active" && nextAppState === "active") {
      // App is coming to the foreground
      await loadScreenTime();
      startScreenTimeCounter();
    }

    setAppState(nextAppState);
  };

  console.log(screenTime, "screenTime");

  const startScreenTimeCounter = () => {
    startTimeRef.current = Date.now() - screenTime * 1000;
    intervalRef.current = setInterval(() => {
      const elapsedSeconds = Math.floor(
        (Date.now() - startTimeRef.current!) / 1000
      );
      setScreenTime(elapsedSeconds);
    }, 1000); // Increment every second

    console.log("foreground");
  };

  const stopScreenTimeCounter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const formatTime = () => {
    const hours = Math.floor(screenTime / 3600);
    const minutes = Math.floor((screenTime % 3600) / 60);
    const seconds = screenTime % 60;

    return `${hours} hour${hours !== 1 ? "s" : ""} ${minutes} minute${
      minutes !== 1 ? "s" : ""
    } ${seconds} second${seconds !== 1 ? "s" : ""}`;
  };

  const loadScreenTime = async () => {
    try {
      const savedTime = await AsyncStorage.getItem("screenTime");
      if (savedTime !== null) {
        setScreenTime(parseInt(savedTime, 10));
      }
    } catch (error) {
      console.error("Failed to load screen time:", error);
    }
  };

  const saveScreenTime = async () => {
    try {
      await AsyncStorage.setItem("screenTime", screenTime.toString());
    } catch (error) {
      console.error("Failed to save screen time:", error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Total Screen Time: {formatTime()}</Text>
      <Text>App State: {appState}</Text>
    </View>
  );
};

export default App;
