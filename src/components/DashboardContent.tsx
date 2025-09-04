"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Calendar, Mail, Phone, MapPin, Globe, User } from "lucide-react";

interface UserData {
  name: string;
  email: string;
  picture: string;
  gender: string;
  phone: string;
  cell: string;
  dob: string;
  age: number;
  location: {
    street: string;
    city: string;
    state: string;
    country: string;
    postcode: string;
  };
  nationality: string;
}

export default function DashboardContent() {
  const [user, setUser] = useState<UserData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/");
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [router]);

  if (!user) return null; // Redirect handles loading state

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-lg shadow-lg border border-border/50">
        <CardHeader className="text-center space-y-4">
          <Avatar className="mx-auto h-28 w-28 transition-transform hover:scale-105">
            <AvatarImage src={user.picture} alt={user.name} />
            <AvatarFallback className="bg-primary/10 text-primary text-2xl">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-3xl font-bold tracking-tight">
              Welcome, {user.name}!
            </CardTitle>
            <Badge variant="secondary" className="mt-2">
              {user.nationality}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <User className="h-5 w-5 text-muted-foreground" />
              Profile Details
            </h3>
            <Separator />
            <dl className="grid grid-cols-1 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <dt className="font-medium text-muted-foreground">Email</dt>
                  <dd>{user.email}</dd>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <dt className="font-medium text-muted-foreground">Gender</dt>
                  <dd>{user.gender}</dd>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <dt className="font-medium text-muted-foreground">Phone</dt>
                  <dd>{user.phone}</dd>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <dt className="font-medium text-muted-foreground">Cell</dt>
                  <dd>{user.cell}</dd>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <dt className="font-medium text-muted-foreground">
                    Date of Birth
                  </dt>
                  <dd>{new Date(user.dob).toLocaleDateString()}</dd>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <dt className="font-medium text-muted-foreground">Age</dt>
                  <dd>
                    <Badge variant="outline">{user.age}</Badge>
                  </dd>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <dt className="font-medium text-muted-foreground">
                    Location
                  </dt>
                  <dd>
                    {user.location.street}, {user.location.city},{" "}
                    {user.location.state}, {user.location.country},{" "}
                    {user.location.postcode}
                  </dd>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <div>
                  <dt className="font-medium text-muted-foreground">
                    Nationality
                  </dt>
                  <dd>{user.nationality}</dd>
                </div>
              </div>
            </dl>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={handleLogout}
                  variant="destructive"
                  className="w-full transition-all hover:shadow-md"
                  aria-label="Log out"
                >
                  Logout
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Sign out of your account</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardContent>
      </Card>
    </div>
  );
}
