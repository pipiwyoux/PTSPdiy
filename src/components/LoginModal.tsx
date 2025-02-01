import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword, AuthError } from "firebase/auth";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "pemohon" | "petugas";
}

const LoginModal = ({ isOpen, onClose, type }: LoginModalProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Login attempt successful:", userCredential.user.email);
      
      if (type === "petugas" && email === "admin@tolopani.net") {
        toast({
          title: "Login Admin Berhasil",
          description: "Selamat datang, Admin!",
        });
        onClose();
        navigate("/admin");
      } else if (type === "pemohon") {
        toast({
          title: "Login Berhasil",
          description: "Selamat datang kembali!",
        });
        onClose();
        navigate("/profile");
      } else {
        // If petugas tries to login with non-admin email
        await auth.signOut();
        toast({
          variant: "destructive",
          title: "Error",
          description: "Anda tidak memiliki akses sebagai petugas",
        });
      }
    } catch (error: any) {
      console.error("Login error:", error);
      const firebaseError = error as AuthError;
      let errorMessage = "Terjadi kesalahan saat login";

      switch (firebaseError.code) {
        case 'auth/invalid-email':
          errorMessage = "Format email tidak valid";
          break;
        case 'auth/user-disabled':
          errorMessage = "Akun ini telah dinonaktifkan";
          break;
        case 'auth/user-not-found':
          errorMessage = "Email tidak terdaftar";
          break;
        case 'auth/wrong-password':
        case 'auth/invalid-login-credentials':
          errorMessage = "Email atau password salah";
          break;
        case 'auth/too-many-requests':
          errorMessage = "Terlalu banyak percobaan login. Silakan coba lagi nanti";
          break;
        default:
          errorMessage = `Terjadi kesalahan saat login: ${firebaseError.message}`;
      }

      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Login {type === "pemohon" ? "Pemohon" : "Petugas"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Loading..." : "Login"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
