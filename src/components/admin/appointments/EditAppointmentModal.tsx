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
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Appointment } from "@/types/admin";

interface EditAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: Appointment;
}

const WORK_HOURS = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "13:00",
  "14:00",
  "15:00",
];

const EditAppointmentModal = ({ isOpen, onClose, appointment }: EditAppointmentModalProps) => {
  const { toast } = useToast();
  const { register, handleSubmit, reset, setValue, formState: { isSubmitting } } = useForm<Appointment>({
    defaultValues: {
      ...appointment,
      date: format(new Date(appointment.date), "yyyy-MM-dd"),
    }
  });

  const onSubmit = async (data: Appointment) => {
    try {
      await updateDoc(doc(db, "appointments", appointment.id), data);
      toast({
        title: "Janji temu berhasil diperbarui",
        description: "Data janji temu telah diperbarui dalam sistem",
      });
      reset();
      onClose();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Gagal memperbarui janji temu",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-bold">
            Edit Janji Temu
          </DialogTitle>
          <DialogDescription className="text-center text-sm">
            Silakan perbarui formulir di bawah ini untuk mengubah janji temu.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="date">Tanggal Rencana</Label>
            <Input
              id="date"
              type="date"
              {...register("date")}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="time">Jam</Label>
            <Select onValueChange={(value) => setValue("time", value)} defaultValue={appointment.time} required>
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
            <Select onValueChange={(value) => setValue("institution", value)} defaultValue={appointment.institution} required>
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
            <Select onValueChange={(value) => setValue("meetWith", value)} defaultValue={appointment.meetWith} required>
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
            {isSubmitting ? "Loading..." : "Simpan"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditAppointmentModal;
