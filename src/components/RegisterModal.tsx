import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegisterModal = ({ isOpen, onClose }: RegisterModalProps) => {
  const [instansi, setInstansi] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    address: "",
    password: "",
    confirmPassword: "",
    instansiName: "",
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Password tidak cocok",
      });
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const userData = {
        name: formData.name,
        email: formData.email,
        whatsapp: formData.whatsapp,
        address: formData.address,
        instansi: instansi,
        instansiName: formData.instansiName,
        role: "user",
        createdAt: new Date().toISOString(),
      };

      await setDoc(doc(db, "users", userCredential.user.uid), userData);

      toast({
        title: "Sukses",
        description: "Akun berhasil dibuat",
      });
      
      onClose();
      navigate("/profile");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]" aria-labelledby="register-title">
        <DialogHeader>
          <DialogTitle id="register-title">Buat Akun Baru</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nama Lengkap</Label>
            <Input 
              id="name" 
              value={formData.name}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="whatsapp">Nomor WhatsApp</Label>
            <Input 
              id="whatsapp" 
              type="tel" 
              value={formData.whatsapp}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="address">Alamat Lengkap</Label>
            <Textarea 
              id="address" 
              value={formData.address}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password Baru</Label>
            <Input 
              id="password" 
              type="password" 
              value={formData.password}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Ulangi Password</Label>
            <Input 
              id="confirmPassword" 
              type="password" 
              value={formData.confirmPassword}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="instansiType">Instansi</Label>
            <Select onValueChange={setInstansi}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih Instansi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PEMERINTAH">PEMERINTAH</SelectItem>
                <SelectItem value="ORMAS">ORMAS</SelectItem>
                <SelectItem value="UMUM">UMUM</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {instansi && (
            <div className="grid gap-2">
              <Label htmlFor="instansiName">Nama Instansi</Label>
              <Input 
                id="instansiName"
                value={formData.instansiName}
                onChange={handleChange}
              />
              <p className="text-sm text-muted-foreground">
                *Kosongkan jika tidak ada Lembaga yang di inputkan
              </p>
            </div>
          )}
          <Button type="submit" className="w-full">
            Daftar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterModal;
