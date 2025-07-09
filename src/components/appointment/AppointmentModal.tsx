import { useState } from "react";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormData = {
  date: string;
  time: string;
  name: string;
  email: string;
  whatsapp: string;
  institution: string;
  meetWith: string;
  purpose: string;
};

const WORK_HOURS = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "13:00",
  "14:00",
  "15:00",
];

const AppointmentModal = ({ isOpen, onClose }: AppointmentModalProps) => {
  const { toast } = useToast();
  const { register, handleSubmit, reset, setValue } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "appointments"), {
        ...data,
        status: "pending",
      });
      toast({
        title: "Janji temu berhasil dibuat",
        description: "Kami akan menghubungi Anda untuk konfirmasi.",
      });
      reset();
      onClose();
    } catch (error) {
      console.error("Error saving appointment data:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Gagal membuat janji temu",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="w-[95vw] max-w-[525px] max-h-[90vh] overflow-y-auto mx-4 p-4 sm:p-6" 
        aria-labelledby="appointment-title"
      >
        <DialogHeader>
          <DialogTitle id="appointment-title" className="text-center text-base sm:text-lg font-bold leading-tight">
            JANJI TEMU DENGAN KEPALA KANTOR, KASUBAG TU, DAN KEPALA SEKSI/ KASI
          </DialogTitle>
          <DialogDescription className="text-center text-xs sm:text-sm mt-2">
            Silakan isi formulir di bawah ini untuk membuat janji temu.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 sm:gap-4 py-2 sm:py-4">
          <div className="grid gap-1.5 sm:gap-2">
            <Label htmlFor="date" className="text-sm font-medium">Tanggal Rencana</Label>
            <Input
              id="date"
              type="date"
              className="h-10 sm:h-10 text-sm"
              defaultValue={format(new Date(), "yyyy-MM-dd")}
              {...register("date")}
              required
            />
          </div>
          <div className="grid gap-1.5 sm:gap-2">
            <Label htmlFor="time" className="text-sm font-medium">Jam</Label>
            <Select onValueChange={(value) => setValue("time", value)} required>
              <SelectTrigger className="h-10 sm:h-10 text-sm">
                <SelectValue placeholder="Pilih jam" />
              </SelectTrigger>
              <SelectContent>
                {WORK_HOURS.map((hour) => (
                  <SelectItem key={hour} value={hour}>
                    {hour}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-1.5 sm:gap-2">
            <Label htmlFor="name" className="text-sm font-medium">Nama Tamu</Label>
            <Input 
              id="name" 
              className="h-10 sm:h-10 text-sm" 
              placeholder="Masukkan nama lengkap"
              {...register("name")} 
              required 
            />
          </div>
          <div className="grid gap-1.5 sm:gap-2">
            <Label htmlFor="email" className="text-sm font-medium">Email</Label>
            <Input 
              id="email" 
              type="email" 
              className="h-10 sm:h-10 text-sm" 
              placeholder="contoh@email.com"
              {...register("email")} 
              required 
            />
          </div>
          <div className="grid gap-1.5 sm:gap-2">
            <Label htmlFor="whatsapp" className="text-sm font-medium">No WhatsApp</Label>
            <Input 
              id="whatsapp" 
              type="tel" 
              className="h-10 sm:h-10 text-sm" 
              placeholder="08xxxxxxxxxx"
              {...register("whatsapp")} 
              required 
            />
          </div>
          <div className="grid gap-1.5 sm:gap-2">
            <Label htmlFor="institution" className="text-sm font-medium">Instansi</Label>
            <Select onValueChange={(value) => setValue("institution", value)} required>
              <SelectTrigger className="h-10 sm:h-10 text-sm">
                <SelectValue placeholder="Pilih instansi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PEMERINTAH">PEMERINTAH</SelectItem>
                <SelectItem value="ORMAS">ORMAS</SelectItem>
                <SelectItem value="UMUM">UMUM</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-1.5 sm:gap-2">
            <Label htmlFor="meetWith" className="text-sm font-medium">Ingin Bertemu</Label>
            <Select onValueChange={(value) => setValue("meetWith", value)} required>
              <SelectTrigger className="h-10 sm:h-10 text-sm">
                <SelectValue placeholder="Pilih pejabat" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="KEPALA KANTOR">KEPALA KANTOR</SelectItem>
                <SelectItem value="KASUBAG TU">KASUBAG TU</SelectItem>
                <SelectItem value="KEPALA SEKSI">KEPALA SEKSI</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-1.5 sm:gap-2">
            <Label htmlFor="purpose" className="text-sm font-medium">Keperluan</Label>
            <Textarea 
              id="purpose" 
              className="min-h-[80px] text-sm resize-none" 
              placeholder="Jelaskan keperluan Anda..."
              {...register("purpose")} 
              required 
            />
          </div>
          <Button 
            type="submit" 
            className="w-full h-10 sm:h-10 text-sm font-medium mt-2" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Loading..." : "SIMPAN"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentModal;
