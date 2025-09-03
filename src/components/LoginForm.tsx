"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { isValidIranianMobile } from "@/lib/authUtils";

export default function LoginForm() {
  const [phone, setPhone] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedPhone = phone.trim();
    if (!isValidIranianMobile(trimmedPhone)) {
      setError("Invalid mobile number.");
      return;
    }

    // Cleans up error and loading state
    setError("");
    setLoading(true);

    // Tries to fetch the user data from the url
    // Saves it local storage of the browser
    try {
      const response = await fetch(
        "https://randomuser.me/api/?results=1&nat=us"
      );
      if (!response.ok) throw new Error("API request failed");
      const data = await response.json();

      const user = data.results[0];
      const userData = {
        name: `${user.name.first} ${user.name.last}`,
        email: user.email,
        picture: user.picture.medium,
      };

      // Sets the local storage with the data
      // Navigates to the Dashboard page
      localStorage.setItem("user", JSON.stringify(userData));
      router.push("/dashboard");
    } catch (err) {
      setError("Failed to fetch user data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-7 p-5">
      <h1 className="text-2xl font-bold text-center">Login</h1>
      <div className="space-y-1 relative">
        <Label htmlFor="phone">Mobile Number</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="09*********"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? "phone-error" : undefined}
          className={error ? "border-destructive" : ""}
        />
        {error && (
          <p
            id="phone-error"
            className="text-xs text-destructive absolute transition-colors"
          >
            {error}
          </p>
        )}
      </div>
      <Button
        type="submit"
        disabled={loading || !phone.trim()}
        className="w-full"
        aria-busy={loading ? "true" : "false"}
      >
        {loading ? "Loading..." : "Login"}
      </Button>
    </form>
  );
}
