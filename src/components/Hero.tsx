import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { LogIn, UserPlus, User, Search, FileText, ExternalLink } from "lucide-react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { serviceCategories } from "./layanan/ServiceData";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ServiceRequest } from "@/types/admin";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const Hero = () => {
  const [loginType, setLoginType] = useState<"pemohon" | "petugas" | null>(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [trackingCode, setTrackingCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [serviceRequest, setServiceRequest] = useState<ServiceRequest | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setUserEmail(user?.email || null);
    });

    return () => unsubscribe();
  }, []);

  const handleLoginClick = (type: "pemohon" | "petugas") => {
    setLoginType(type);
    setIsLoginDropdownOpen(false);
  };

  const handleTrackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setServiceRequest(null);

    try {
      const serviceRequestsRef = collection(db, "serviceRequests");
      const q = query(
        serviceRequestsRef,
        where("noRegistrasi", "==", trackingCode)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        toast({
          variant: "destructive",
          title: "Tidak ditemukan",
          description: "Nomor registrasi tidak ditemukan",
        });
        return;
      }

      const doc = querySnapshot.docs[0];
      setServiceRequest({ id: doc.id, ...doc.data() } as ServiceRequest);
    } catch (error) {
      console.error("Error fetching service request:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Terjadi kesalahan saat mencari data",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadgeColor = (status: ServiceRequest["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: ServiceRequest["status"]) => {
    switch (status) {
      case "pending":
        return "Menunggu";
      case "processing":
        return "Diproses";
      case "completed":
        return "Selesai";
      case "rejected":
        return "Ditolak";
      default:
        return status;
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-primary overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-6 sm:mt-10 mx-auto max-w-7xl px-4 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center lg:text-left"
              >
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight font-extrabold text-white leading-tight">
                  <span className="block">Selamat Datang di</span>
                  <span className="block text-secondary">PTSP ONLINE</span>
                </h1>
                <p className="mt-3 text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-md sm:max-w-xl md:max-w-2xl mx-auto lg:mx-0">
                  Pelayanan Terpadu Satu Pintu (PTSP) Online Kantor Kementerian Agama Kota Gorontalo
                </p>
                <p className="mt-2 text-xs sm:text-sm md:text-base text-gray-300">
                  Layanan Perizinan, Non Perizinan, Informasi, Konsultasi, Pengaduan dan Legalisir
                </p>
                
                {/* Show login buttons only when user is not logged in */}
                {!isLoggedIn && (
                  <div className="mt-5 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                    <div className="relative w-full sm:w-auto">
                      <button
                        onClick={() => setIsLoginDropdownOpen(!isLoginDropdownOpen)}
                        onBlur={() => setTimeout(() => setIsLoginDropdownOpen(false), 200)}
                        className="w-full sm:w-auto flex items-center justify-center px-6 sm:px-8 py-3 md:py-4 border border-transparent text-sm sm:text-base md:text-lg font-medium rounded-md text-primary bg-secondary hover:bg-opacity-90 transition-colors"
                      >
                        <LogIn className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                        Login
                      </button>
                      {isLoginDropdownOpen && (
                        <div className="absolute left-0 right-0 sm:left-0 sm:right-auto mt-2 w-full sm:w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                          <div className="py-1">
                            <button
                              onClick={() => handleLoginClick("pemohon")}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Login Pemohon
                            </button>
                            <button
                              onClick={() => handleLoginClick("petugas")}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Login Petugas
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="w-full sm:w-auto">
                      <button
                        onClick={() => setIsRegisterOpen(true)}
                        className="w-full sm:w-auto flex items-center justify-center px-6 sm:px-8 py-3 md:py-4 border border-transparent text-sm sm:text-base md:text-lg font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors"
                      >
                        <UserPlus className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                        Buat Akun
                      </button>
                    </div>
                  </div>
                )}

                {/* Show welcome message when user is logged in */}
                {isLoggedIn && (
                  <div className="mt-5 sm:mt-8">
                    <div className="flex items-center justify-center lg:justify-start">
                      <div className="flex items-center px-4 sm:px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 max-w-full">
                        <User className="h-4 w-4 sm:h-5 sm:w-5 text-secondary mr-3 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-white text-xs sm:text-sm">Selamat datang kembali,</p>
                          <p className="text-secondary font-medium text-sm sm:text-base truncate">{userEmail}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="/fotokantor.webp"
            alt="Kantor Kementerian Agama Kota Gorontalo"
          />
        </div>
      </div>

      {/* Track Layanan Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-center flex items-center justify-center gap-2">
                  <Search className="h-6 w-6" />
                  Track Layanan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleTrackSubmit} className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Masukkan Nomor Registrasi"
                      value={trackingCode}
                      onChange={(e) => setTrackingCode(e.target.value)}
                      required
                      className="flex-1"
                    />
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Mencari...
                        </>
                      ) : (
                        "Lacak"
                      )}
                    </Button>
                  </div>
                </form>

                {serviceRequest && (
                  <div className="mt-6 p-4 border rounded-lg bg-white">
                    <h3 className="font-semibold mb-4">Detail Layanan</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Nomor Registrasi</p>
                        <p className="font-medium">{serviceRequest.noRegistrasi}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Tanggal</p>
                        <p className="font-medium">{new Date(serviceRequest.tanggal).toLocaleDateString('id-ID')}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Nama Pemohon</p>
                        <p className="font-medium">{serviceRequest.namaLengkap}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Seksi</p>
                        <p className="font-medium">{serviceRequest.seksi}</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-gray-500">Layanan</p>
                        <p className="font-medium">{serviceRequest.layanan}</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-gray-500">Status</p>
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm ${getStatusBadgeColor(
                            serviceRequest.status
                          )}`}
                        >
                          {getStatusText(serviceRequest.status)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Jenis Layanan Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-primary flex items-center justify-center gap-2">
                <FileText className="h-8 w-8" />
                Jenis Layanan
              </h2>
              <p className="mt-2 text-gray-600">
                Berbagai layanan yang tersedia di Kantor Kementerian Agama Kota Gorontalo
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceCategories.slice(0, 6).map((category) => (
                <Card key={category.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      {category.services.length} layanan tersedia
                    </p>
                    <div className="space-y-2">
                      {category.services.slice(0, 3).map((service, index) => (
                        <div key={index} className="text-sm text-gray-700 truncate">
                          • {service.name}
                        </div>
                      ))}
                      {category.services.length > 3 && (
                        <div className="text-sm text-gray-500">
                          +{category.services.length - 3} layanan lainnya
                        </div>
                      )}
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full mt-4"
                      onClick={() => window.location.href = '/layanan'}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Lihat Semua
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button 
                size="lg"
                onClick={() => window.location.href = '/layanan'}
              >
                Lihat Semua Jenis Layanan
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modals */}
      {loginType && (
        <LoginModal
          isOpen={!!loginType}
          onClose={() => setLoginType(null)}
          type={loginType}
        />
      )}
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </div>
  );
};

export default Hero;