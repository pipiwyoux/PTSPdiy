import { Link } from "react-router-dom";
import { Menu, FileText, User, LogOut, UserPlus, LogIn } from "lucide-react";
import { MenuItems } from "./MenuItems";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { auth } from "@/lib/firebase";
import { useState } from "react";

interface MobileMenuProps {
  handleLoginClick: (type: "pemohon" | "petugas") => void;
  setIsRegisterOpen: (value: boolean) => void;
}

const MobileMenu = ({
  handleLoginClick,
  setIsRegisterOpen,
}: MobileMenuProps) => {
  const { user, isLoggedIn, isAdmin, loading } = useAuth();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Berhasil Logout",
        description: "Anda telah keluar dari sistem",
      });
      navigate("/");
      setIsSheetOpen(false);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleMenuItemClick = () => {
    setIsSheetOpen(false);
  };

  const handleRegisterClickWithClose = () => {
    setIsRegisterOpen(true);
    setIsSheetOpen(false);
  };

  const handleLoginClickWithClose = (type: "pemohon" | "petugas") => {
    handleLoginClick(type);
    setIsSheetOpen(false);
  };

  return (
    <div className="md:hidden">
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[400px] pr-0">
          <nav className="flex flex-col gap-4">
            <div className="flex flex-col space-y-3">
              {MenuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-base font-medium transition-colors hover:text-primary"
                  onClick={handleMenuItemClick}
                >
                  {item.name}
                </Link>
              ))}
              {isLoggedIn && (
                <>
                  {isAdmin ? (
                    <Link
                      to="/admin"
                      className="flex items-center text-secondary hover:text-secondary/80 text-base font-medium"
                      onClick={handleMenuItemClick}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Dashboard
                    </Link>
                  ) : (
                    <Link
                      to="/permohonan"
                      className="flex items-center text-secondary hover:text-secondary/80 text-base font-medium"
                      onClick={handleMenuItemClick}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Permohonan Anda
                    </Link>
                  )}
                </>
              )}
            </div>
            <Separator className="my-4" />
            <div className="flex flex-col space-y-2">
              {isLoggedIn ? (
                <>
                  <div className="px-2 py-2">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      Signed in as
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {user?.email}
                    </p>
                  </div>
                  <Separator />
                  <Button
                    variant="ghost"
                    className="justify-start px-2"
                    onClick={handleMenuItemClick}
                    asChild
                  >
                    <Link to="/profile" className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      Profil
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start px-2"
                    onClick={handleMenuItemClick}
                    asChild
                  >
                    <Link to="/skm" className="flex items-center">
                      <FileText className="w-4 h-4 mr-2" />
                      Isi Survey
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start px-2 text-red-600"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    className="justify-start px-2"
                    onClick={handleRegisterClickWithClose}
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Daftar
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start px-2"
                    onClick={() => handleLoginClickWithClose("pemohon")}
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Login Pemohon
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start px-2"
                    onClick={() => handleLoginClickWithClose("petugas")}
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Login Petugas
                  </Button>
                </>
              )}
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;