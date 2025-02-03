import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import Layanan from "./pages/Layanan";
import SKM from "./pages/SKM";
import Track from "./pages/Track";
import JanjiTemu from "./pages/JanjiTemu";
import BukuTamu from "./pages/BukuTamu";
import Kontak from "./pages/Kontak";
import Profile from "./pages/Profile";
import Permohonan from "./pages/Permohonan";
import AdminDashboard from "./pages/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/layanan" element={<Layanan />} />
              <Route path="/skm" element={<SKM />} />
              <Route path="/track" element={<Track />} />
              <Route path="/janji-temu" element={<JanjiTemu />} />
              <Route path="/buku-tamu" element={<BukuTamu />} />
              <Route path="/kontak" element={<Kontak />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/permohonan" element={<Permohonan />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
      <Toaster />
      <Sonner />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
