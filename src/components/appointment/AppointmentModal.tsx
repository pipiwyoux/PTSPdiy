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
      <DialogContent className="sm:max-w-[525px]" aria-labelledby="appointment-title">
        <DialogHeader>
          <DialogTitle id="appointment-title" className="text-center text-lg font-bold">
            JANJI TEMU DENGAN KEPALA KANTOR, KASUBAG TU, DAN KEPALA SEKSI/ KASI
          </DialogTitle>
          <DialogDescription className="text-center text-sm">
            Silakan isi formulir di bawah ini untuk membuat janji temu.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="date">Tanggal Rencana</Label>
            <Input
              id="date"
              type="date"
              defaultValue={format(new Date(), "yyyy-MM-dd")}
              {...register("date")}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="time">Jam</Label>
            <Select onValueChange={(value) => setValue("time", value)} required>
              <SelectTrigger>
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
          <div className="grid gap-2">
            <Label htmlFor="name">Nama Tamu</Label>
            <Input id="name" {...register("name")} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email")} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="whatsapp">No WhatsApp</Label>
            <Input id="whatsapp" type="tel" {...register("whatsapp")} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="institution">Instansi</Label>
            <Select onValueChange={(value) => setValue("institution", value)} required>
              <SelectTrigger>
                <SelectValue placeholder="Pilih instansi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PEMERINTAH">PEMERINTAH</SelectItem>
                <SelectItem value="ORMAS">ORMAS</SelectItem>
                <SelectItem value="UMUM">UMUM</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="meetWith">Ingin Bertemu</Label>
            <Select onValueChange={(value) => setValue("meetWith", value)} required>
              <SelectTrigger>
                <SelectValue placeholder="Pilih pejabat" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="KEPALA KANTOR">KEPALA KANTOR</SelectItem>
                <SelectItem value="KASUBAG TU">KASUBAG TU</SelectItem>
                <SelectItem value="KEPALA SEKSI">KEPALA SEKSI</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="purpose">Keperluan</Label>
            <Textarea id="purpose" {...register("purpose")} required />
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Loading..." : "SIMPAN"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentModal;
