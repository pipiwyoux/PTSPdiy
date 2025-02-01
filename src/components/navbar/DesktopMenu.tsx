import { Link } from "react-router-dom";
import { ChevronDown, FileText, User, LogOut } from "lucide-react";
import { MenuItems } from "./MenuItems";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";

interface DesktopMenuProps {
  isLoginOpen: boolean;
  setIsLoginOpen: (value: boolean) => void;
  handleLoginClick: (type: "pemohon" | "petugas") => void;
  setIsRegisterOpen: (value: boolean) => void;
}

const DesktopMenu = ({
  isLoginOpen,
  setIsLoginOpen,
  handleLoginClick,
  setIsRegisterOpen,
}: DesktopMenuProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setIsLoggedIn(!!user);
      if (user?.email) {
        setUserName(user.email);
        setIsAdmin(user.email === "admin@tolopani.net");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Berhasil Logout",
        description: "Anda telah keluar dari sistem",
      });
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="hidden md:flex md:items-center md:space-x-4">
      {MenuItems.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
        >
          {item.name}
        </Link>
      ))}

      {isLoggedIn && (
        <>
          {isAdmin ? (
            <Link
              to="/admin"
              className="flex items-center text-secondary hover:text-secondary/80 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              <FileText className="w-4 h-4 mr-2" />
              Dashboard
            </Link>
          ) : (
            <Link
              to="/permohonan"
              className="flex items-center text-secondary hover:text-secondary/80 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              <FileText className="w-4 h-4 mr-2" />
              Permohonan Anda
            </Link>
          )}
        </>
      )}

      {isLoggedIn ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
            <User className="w-4 h-4 mr-2" />
            {userName}
            <ChevronDown className="ml-1 h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <Link to="/profile" className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                Profil
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/skm" className="flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                SKM Online
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="flex items-center text-red-600"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          <button
            onClick={() => setIsRegisterOpen(true)}
            className="bg-secondary text-primary px-4 py-2 rounded-md text-sm font-medium hover:bg-opacity-90 transition-colors"
          >
            Buat Akun
          </button>
          <div className="relative">
            <button
              onClick={() => setIsLoginOpen(!isLoginOpen)}
              className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-opacity-90 transition-colors flex items-center"
            >
              Login <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            {isLoginOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
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
        </>
      )}
    </div>
  );
};

export default DesktopMenu;
