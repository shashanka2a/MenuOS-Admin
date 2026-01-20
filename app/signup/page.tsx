"use client";

import { useRouter } from "next/navigation";
import { ThemeProvider } from "../../src/context/ThemeContext";
import { Auth } from "../../src/components/Auth";

export default function SignupPage() {
  const router = useRouter();

  return (
    <ThemeProvider>
      <Auth
        initialMode="signup"
        lockMode
        onSignup={() => router.push("/onboarding")}
        onLogin={() => router.push("/login")}
      />
    </ThemeProvider>
  );
}

