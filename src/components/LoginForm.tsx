import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { isValidIranianMobile } from "@/lib/authUtils";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

export default function LoginForm() {
  const [telephone, setTelephone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const mobileInput = useRef<HTMLInputElement | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidIranianMobile(telephone)) {
      setError("Invalid number format");
      mobileInput.current?.focus();

      return;
    }
    setLoading(true);

    const response = await fetch("https://randomuser.me/api/?results=1&nat=us");
    if (!response.ok) throw new Error("API request failed");

    const data = await response.json();
    const user = data.results[0];
    const userData = {
      name: `${user.name.title} ${user.name.first} ${user.name.last}`,
      email: user.email,
      picture: user.picture.medium,
      gender: user.gender,
      phone: user.phone,
      cell: user.cell,
      dob: user.dob.date,
      age: user.dob.age,
      location: {
        street: `${user.location.street.number} ${user.location.street.name}`,
        city: user.location.city,
        state: user.location.state,
        country: user.location.country,
        postcode: user.location.postcode,
      },
      nationality: user.nat,
    };
    localStorage.setItem("user", JSON.stringify(userData));
    router.push("/dashboard");
  };

  return (
    <Card className="w-sm">
      <CardHeader>
        <CardTitle className="text-2xl mb-5">Login to your account</CardTitle>
        <CardDescription>Enter your phone number below to login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="gap-3 flex flex-col" aria-label="login form" onSubmit={onSubmit}>
          <Label htmlFor="phone">Phone number</Label>
          <Input
            ref={mobileInput}
            className={cn(error && "ring-red-600 ring-1")}
            id="phone"
            type="tel"
            placeholder="09*********"
            value={telephone}
            aria-invalid={!!error}
            aria-describedby="phone-error"
            onChange={(e) => {
              setTelephone(e.target.value);
              setError("");
            }}
            required
            autoFocus
          />

          <p
            role="alert"
            aria-live="polite"
            id="phone-error"
            className={cn(
              "text-xs opacity-0 transition-all h-5 -translate-y-1",
              error && "text-red-500 opacity-100 translate-y-0"
            )}
          >
            {error}
          </p>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
