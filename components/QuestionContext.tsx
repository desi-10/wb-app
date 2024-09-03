import React, { createContext, useState, useContext, ReactNode } from "react";

interface QuestionContextType {
  question: {
    age: string;
    occupation: string;
    avg_screen_time: string;
    eyeStrain: string;
    visionProblems: string;
    breakFrequency: string;
    screenTimeManagement: string;
  };
  setQuestion: (question: {
    age: string;
    occupation: string;
    avg_screen_time: string;
    eyeStrain: string;
    visionProblems: string;
    breakFrequency: string;
    screenTimeManagement: string;
  }) => void;
}

const QuestionContext = createContext<QuestionContextType | undefined>(
  undefined
);

export function QuestionProvider({ children }: { children: ReactNode }) {
  const [question, setQuestion] = useState({
    age: "",
    occupation: "",
    avg_screen_time: "",
    eyeStrain: "",
    visionProblems: "",
    breakFrequency: "",
    screenTimeManagement: "",
  });

  return (
    <QuestionContext.Provider value={{ question, setQuestion }}>
      {children}
    </QuestionContext.Provider>
  );
}

export function useQuestion() {
  const context = useContext(QuestionContext);
  if (context === undefined) {
    throw new Error("useQuestion must be used within a QuestionProvider");
  }
  return context;
}
