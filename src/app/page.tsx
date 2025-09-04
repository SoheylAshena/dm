"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import LoginForm from "@/components/LoginForm";

export default function Home() {
  const router = useRouter();

  // Checks to see if a user data is available
  // If available, It will navigate to dashboard
  useEffect(() => {
    const exsitingUser = localStorage.getItem("user");
    if (exsitingUser) {
      router.push("/dashboard");
    }
  }, []);

  return (
    <main className="flex bg-background items-center justify-center h-screen">
      <LoginForm />
    </main>
  );
}
