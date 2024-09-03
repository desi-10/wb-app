import React from "react";
import { Stack } from "expo-router";

export default function OthersLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="steps"
        options={{
          title: "Steps",
        }}
      />
    </Stack>
  );
}
