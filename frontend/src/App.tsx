
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

import Index from "./pages/Index";
import Flights from "./pages/Flights";
import Hotels from "./pages/Hotels";
import Messages from "./pages/Messages";
import Explore from "./pages/Explore";
import Social from "./pages/Social";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Nearby from "./pages/Nearby";
import Booking from "./pages/Booking";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/social" element={<Social />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/nearby" element={<Nearby />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      <Toaster />
    </BrowserRouter>
  );
};

export default App;
