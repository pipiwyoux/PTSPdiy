import { Link } from "react-router-dom";
import { Menu, FileText, User, LogOut } from "lucide-react";
import { MenuItems } from "./MenuItems";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";

interface MobileMenuProps {
  isOpen: boolean;
  toggleMenu: () => void;
  handleLoginClick: (type: "pemohon" | "petugas") => void;
  setIsRegisterOpen: (value: boolean) => void;
}

const MobileMenu = ({
  isOpen,
  toggleMenu,
  handleLoginClick,
  setIsRegisterOpen,
}: MobileMenuProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
      if (user?.email) {
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
      setIsSheetOpen(false);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleMenuItemClick = () => {
    setIsSheetOpen(false);
  };
  return (
    <div className="md:hidden">
      <Sheet>
  const handleRegisterClickWithClose = () => {
    setIsRegisterOpen(true);
    setIsSheetOpen(false);
  };
        <SheetTrigger asChild>
          <Button
            variant="ghost"
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          >
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
                  onClick={toggleMenu}
                >
                  {item.name}
                </Link>
                  onClick={handleMenuItemClick}
              {isLoggedIn && (
                <>
                  {isAdmin ? (
                    <Link
                      to="/admin"
                      className="flex items-center text-secondary hover:text-secondary/80 text-base font-medium"
                      onClick={toggleMenu}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Dashboard
                      onClick={handleMenuItemClick}
                  ) : (
                    <Link
                      to="/permohonan"
                      className="flex items-center text-secondary hover:text-secondary/80 text-base font-medium"
                      onClick={toggleMenu}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Permohonan Anda
                      onClick={handleMenuItemClick}
                  )}
                </>
              )}
            </div>
            <Separator className="my-4" />
            <div className="flex flex-col space-y-2">
              {isLoggedIn ? (
                <>
                  <Button
                    variant="ghost"
                    className="justify-start px-2"
                    onClick={toggleMenu}
                    asChild
                  >
                    <Link to="/profile" className="flex items-center">
                    onClick={handleMenuItemClick}
                      Profil
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start px-2"
                    onClick={toggleMenu}
                    asChild
                  >
                    <Link to="/skm" className="flex items-center">
                    onClick={handleMenuItemClick}
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
                    onClick={() => {
                      setIsRegisterOpen(true);
                      toggleMenu();
                    }}
                  >
                      handleRegisterClickWithClose();
                  <Button
                    variant="ghost"
                    className="justify-start px-2"
                    onClick={() => {
                      handleLoginClick("pemohon");
                      toggleMenu();
                    }}
                  >
                      handleLoginClickWithClose("pemohon");
                  <Button
                    variant="ghost"
                    className="justify-start px-2"
                    onClick={() => {
                      handleLoginClick("petugas");
                      toggleMenu();
                    }}
                  >
                      handleLoginClickWithClose("petugas");
                </>
              )}
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

  const handleLoginClickWithClose = (type: "pemohon" | "petugas") => {
    handleLoginClick(type);
    setIsSheetOpen(false);
  };
export default MobileMenu;