import { motion } from "framer-motion";
import { useState } from "react";
import { LogIn, UserPlus } from "lucide-react";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

const Hero = () => {
  const [loginType, setLoginType] = useState<"pemohon" | "petugas" | null>(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);

  const handleLoginClick = (type: "pemohon" | "petugas") => {
    setLoginType(type);
    setIsLoginDropdownOpen(false);
  };

  return (
    <div className="relative bg-primary overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="sm:text-center lg:text-left"
            >
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                <span className="block">Selamat Datang di</span>
                <span className="block text-secondary">PTSP ONLINE</span>
              </h1>
              <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Pelayanan Terpadu Satu Pintu (PTSP) Online Kantor Kementerian Agama Kota Gorontalo
              </p>
              <p className="mt-2 text-sm text-gray-300 sm:text-base">
                Layanan Perizinan, Non Perizinan, Informasi, Konsultasi, Pengaduan dan Legalisir
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="relative">
                  <button
                    onClick={() => setIsLoginDropdownOpen(!isLoginDropdownOpen)}
                    onBlur={() => setTimeout(() => setIsLoginDropdownOpen(false), 200)}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-secondary hover:bg-opacity-90 md:py-4 md:text-lg md:px-10"
                  >
                    <LogIn className="mr-2 h-5 w-5" />
                    Login
                  </button>
                  {isLoginDropdownOpen && (
                    <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
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
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <button
                    onClick={() => setIsRegisterOpen(true)}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10"
                  >
                    <UserPlus className="mr-2 h-5 w-5" />
                    Buat Akun
                  </button>
                </div>
              </div>
            </motion.div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="https://lh3.googleusercontent.com/p/AF1QipOdAAv0Lw1xxIFZlmD2U90DY2rzHAoLoJvzycgw=s680-w680-h510"
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
