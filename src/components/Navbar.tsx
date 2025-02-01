import { useState } from "react";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import DesktopMenu from "./navbar/DesktopMenu";
import MobileMenu from "./navbar/MobileMenu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loginType, setLoginType] = useState<"pemohon" | "petugas" | null>(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLoginClick = (type: "pemohon" | "petugas") => {
    setLoginType(type);
    setIsLoginOpen(false);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Kementerian_Agama_new_logo.png"
                alt="Logo"
                className="h-12 w-auto"
              />
            </Link>
          </div>

          <DesktopMenu
            isLoginOpen={isLoginOpen}
            setIsLoginOpen={setIsLoginOpen}
            handleLoginClick={handleLoginClick}
            setIsRegisterOpen={setIsRegisterOpen}
          />

          <MobileMenu
            isOpen={isOpen}
            toggleMenu={toggleMenu}
            handleLoginClick={handleLoginClick}
            setIsRegisterOpen={setIsRegisterOpen}
          />
        </div>
      </div>

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
    </nav>
  );
};

export default Navbar;
