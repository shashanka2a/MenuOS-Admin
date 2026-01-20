"use client";

import { useRouter } from "next/navigation";
import { ThemeProvider } from "../../src/context/ThemeContext";
import { Auth } from "../../src/components/Auth";

export default function LoginPage() {
  const router = useRouter();

  return (
    <ThemeProvider>
      <Auth
        initialMode="signin"
        lockMode
        onSignup={() => router.push("/signup")}
        onLogin={() => router.push("/dashboard")}
      />
    </ThemeProvider>
  );
}

