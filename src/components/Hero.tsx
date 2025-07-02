import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { LogIn, UserPlus, User } from "lucide-react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

const Hero = () => {
  const [loginType, setLoginType] = useState<"pemohon" | "petugas" | null>(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

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

  return (
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