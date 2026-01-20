"use client";

import { ThemeProvider } from "../../src/context/ThemeContext";
import { Onboarding } from "../../src/components/Onboarding";

export default function OnboardingPage() {
  return (
    <ThemeProvider>
      <Onboarding />
    </ThemeProvider>
  );
}

