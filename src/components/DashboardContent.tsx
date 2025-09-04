import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Calendar, Mail, Phone, MapPin, Globe, User, LogOut } from "lucide-react";

interface UserData {
  name: string;
  email: string;
  picture: string;
  gender: string;
  phone: string;
  cell: string;
  dob: string;
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

  /* ╒═══════════════════════════════════════════════════════════════════════╕
        This will check if there is user data in localstorage
        if not, it will return to the '/' path
        if yes, it will parse the data and pass it to the user state   
     ╘═══════════════════════════════════════════════════════════════════════╛ */
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/");
      return;
    }
    setUser(JSON.parse(storedUser));
  }, []);

  /* ╒═══════════════════════════════════════════════════════════════════════╕
        This will render nothing when there is no user data
     ╘═══════════════════════════════════════════════════════════════════════╛ */
  if (!user) return null;

  /* ╒═══════════════════════════════════════════════════════════════════════╕
        ⚜  Logout handler  ⚜   
     ╘═══════════════════════════════════════════════════════════════════════╛ */
  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  return (
    <>
      <Card className="w-full max-w-2xl rounded-2xl border border-white/10  shadow-xl">
        {/* ╒═══════════════════════════════════════════════════════════════════════╕
               ⚜  Header  ⚜
            ╘═══════════════════════════════════════════════════════════════════════╛ */}
        <CardHeader className="flex flex-col items-center space-y-4">
          <Avatar className="h-28 w-28 border-4 border-white/20 shadow-md transition-transform hover:scale-105">
            <AvatarImage src={user.picture} alt={user.name} />
            <AvatarFallback className="bg-indigo-600/20 text-indigo-700 text-2xl">{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <CardTitle className="text-3xl font-bold ">{user.name}</CardTitle>
            <p className="text-sm ">Welcome back 👋</p>
            <Badge variant="outline" className="mt-3 text-indigo-700 border-indigo-500/30">
              {user.nationality}
            </Badge>
          </div>
        </CardHeader>

        {/* ╒═══════════════════════════════════════════════════════════════════════╕
              ⚜  Content  ⚜     
            ╘═══════════════════════════════════════════════════════════════════════╛ */}
        <CardContent className="space-y-8">
          {/* ╒═══════════════════════════════════════════════════════════════════════╕
                ⚜  Profile Detail  ⚜    
              ╘═══════════════════════════════════════════════════════════════════════╛ */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2 ">
              <User className="h-5 w-5 text-indigo-700" />
              Profile Details
            </h3>

            <Separator />

            <dl className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
              <DetailItem icon={<Mail className="h-4 w-4" />} label="Email" value={user.email} />
              <DetailItem icon={<User className="h-4 w-4" />} label="Gender" value={user.gender} />
              <DetailItem icon={<Phone className="h-4 w-4" />} label="Phone" value={user.phone} />
              <DetailItem icon={<Phone className="h-4 w-4" />} label="Cell" value={user.cell} />
              <DetailItem
                icon={<Calendar className="h-4 w-4" />}
                label="Date of Birth"
                value={new Date(user.dob).toLocaleDateString()}
              />
              <DetailItem
                icon={<MapPin className="h-4 w-4" />}
                label="Location"
                value={`${user.location.street}, ${user.location.city}, ${user.location.state}, ${user.location.country}, ${user.location.postcode}`}
              />
              <DetailItem icon={<Globe className="h-4 w-4" />} label="Nationality" value={user.nationality} />
            </dl>
          </div>

          {/* ╒═══════════════════════════════════════════════════════════════════════╕
                ⚜  Logout button  ⚜    
              ╘═══════════════════════════════════════════════════════════════════════╛ */}
          <Button
            onClick={handleLogout}
            variant="destructive"
            className="w-full h-12 rounded-lg flex items-center justify-center gap-2 font-medium hover:bg-red-600/90 transition-all"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </CardContent>
      </Card>
    </>
  );
}

/* ╒═══════════════════════════════════════════════════════════════════════╕
      ⚜  Reusable detail item component  ⚜
   ╘═══════════════════════════════════════════════════════════════════════╛ */
function DetailItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-indigo-700">{icon}</span>
      <div>
        <dt className="text-xs uppercase tracking-wide">{label}</dt>
        <dd className="text-sm  break-words">{value}</dd>
      </div>
    </div>
  );
}
