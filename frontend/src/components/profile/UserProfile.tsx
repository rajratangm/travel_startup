
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plane, Hotel, MapPin, Calendar, User, Settings, Globe, Camera } from "lucide-react";

// Mock user data
const userData = {
  id: "user1",
  name: "Jamie Wilson",
  email: "jamie@example.com",
  avatar: "/placeholder.svg",
  location: "San Francisco, CA",
  bio: "Adventure seeker and photography enthusiast. Love exploring new cultures and meeting fellow travelers.",
  interests: ["Hiking", "Photography", "Food", "Culture", "History"],
  travelStyle: ["Adventure", "Budget", "Solo", "Group"],
  upcomingTrips: [
    { id: "trip1", destination: "Tokyo, Japan", dates: "May 15-25, 2025" },
    { id: "trip2", destination: "Barcelona, Spain", dates: "August 5-15, 2025" }
  ],
  pastTrips: [
    { id: "past1", destination: "Bali, Indonesia", dates: "January 2025" },
    { id: "past2", destination: "Paris, France", dates: "October 2024" },
    { id: "past3", destination: "New York City, USA", dates: "July 2024" }
  ]
};

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({ ...userData });

  const handleSaveProfile = () => {
    console.log("Saving profile:", profileData);
    setIsEditing(false);
    // In a real app, this would make an API call to update the profile
  };

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column - User Info */}
        <div className="md:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-background">
                    <img 
                      src={profileData.avatar} 
                      alt={profileData.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {isEditing && (
                    <button className="absolute bottom-4 right-0 h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                      <Camera className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <h2 className="text-2xl font-bold">{profileData.name}</h2>
                <div className="flex items-center gap-1 text-muted-foreground mt-1">
                  <MapPin className="h-4 w-4" />
                  <span>{profileData.location}</span>
                </div>
                
                {isEditing ? (
                  <div className="mt-4 w-full">
                    <Label htmlFor="bio">Bio</Label>
                    <Input
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                ) : (
                  <p className="text-muted-foreground mt-4">{profileData.bio}</p>
                )}
                
                <div className="mt-6 w-full">
                  <h3 className="text-sm font-semibold mb-2">Travel Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {profileData.interests.map((interest) => (
                      <Badge key={interest} variant="outline">{interest}</Badge>
                    ))}
                    {isEditing && (
                      <Badge variant="outline" className="cursor-pointer">+ Add</Badge>
                    )}
                  </div>
                </div>
                
                <div className="mt-4 w-full">
                  <h3 className="text-sm font-semibold mb-2">Travel Style</h3>
                  <div className="flex flex-wrap gap-2">
                    {profileData.travelStyle.map((style) => (
                      <Badge key={style} variant="secondary">{style}</Badge>
                    ))}
                    {isEditing && (
                      <Badge variant="secondary" className="cursor-pointer">+ Add</Badge>
                    )}
                  </div>
                </div>
                
                {isEditing ? (
                  <div className="mt-6 space-y-2 w-full">
                    <Button 
                      onClick={handleSaveProfile} 
                      className="gradient-bg w-full"
                    >
                      Save Profile
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setIsEditing(false);
                        setProfileData({...userData});
                      }}
                      className="w-full"
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button 
                    onClick={() => setIsEditing(true)} 
                    variant="outline" 
                    className="mt-6"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Right Column - Tabs */}
        <div className="md:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="trips">My Trips</TabsTrigger>
              <TabsTrigger value="settings">Account</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your profile information and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input 
                      id="fullName" 
                      value={profileData.name} 
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      value={profileData.email} 
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input 
                      id="location" 
                      value={profileData.location} 
                      onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="pt-4">
                    <h3 className="font-medium mb-4">Connected Social Accounts</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Globe className="h-5 w-5 text-muted-foreground" />
                          <span>Facebook</span>
                        </div>
                        <Button variant="outline" size="sm">Connect</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Globe className="h-5 w-5 text-muted-foreground" />
                          <span>Instagram</span>
                        </div>
                        <Button variant="outline" size="sm">Connect</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="trips" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Trips</CardTitle>
                  <CardDescription>Your planned adventures</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {profileData.upcomingTrips.map((trip) => (
                      <div key={trip.id} className="flex items-center gap-4 p-3 hover:bg-muted rounded-lg transition-colors">
                        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                          <Plane className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div>
                          <h4 className="font-medium">{trip.destination}</h4>
                          <div className="flex items-center gap-1 text-muted-foreground text-sm">
                            <Calendar className="h-3 w-3" />
                            <span>{trip.dates}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Past Trips</CardTitle>
                  <CardDescription>Your travel history</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {profileData.pastTrips.map((trip) => (
                      <div key={trip.id} className="flex items-center gap-4 p-3 hover:bg-muted rounded-lg transition-colors">
                        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                          <Hotel className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div>
                          <h4 className="font-medium">{trip.destination}</h4>
                          <div className="flex items-center gap-1 text-muted-foreground text-sm">
                            <Calendar className="h-3 w-3" />
                            <span>{trip.dates}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account settings and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Current Password</Label>
                    <Input id="password" type="password" placeholder="••••••••" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" placeholder="••••••••" />
                  </div>
                  
                  <div className="pt-2">
                    <Button>Update Password</Button>
                  </div>
                  
                  <div className="pt-6 space-y-2">
                    <h3 className="font-medium">Notifications</h3>
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive trip updates and offers</p>
                      </div>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <p className="font-medium">Push Notifications</p>
                        <p className="text-sm text-muted-foreground">For mobile devices</p>
                      </div>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
