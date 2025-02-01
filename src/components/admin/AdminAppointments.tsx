import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { Appointment } from "@/types/admin";
import SearchFilter from "./filters/SearchFilter";
import DateFilter from "./filters/DateFilter";
import AppointmentsTable from "./appointments/AppointmentsTable";

const AdminAppointments = () => {
  const [search, setSearch] = useState("");
  const [date, setDate] = useState<Date>();
  const { toast } = useToast();

  const { data: appointments, refetch } = useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      const querySnapshot = await getDocs(collection(db, "appointments"));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Appointment[];
    }
  });

  const updateStatus = async (appointmentId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, "appointments", appointmentId), {
        status: newStatus
      });
      toast({
        title: "Status berhasil diperbarui",
        description: `Status janji temu telah diubah menjadi ${newStatus}`,
      });
      refetch();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Gagal memperbarui status",
      });
    }
  };

  const filteredAppointments = appointments?.filter(appointment => {
    const matchesSearch = 
      appointment.name?.toLowerCase().includes(search.toLowerCase()) ||
      appointment.meetWith?.toLowerCase().includes(search.toLowerCase());
    
    const matchesDate = !date || format(new Date(appointment.date), "yyyy-MM-dd") === format(date, "yyyy-MM-dd");
    
    return matchesSearch && matchesDate;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <SearchFilter
          placeholder="Cari berdasarkan nama tamu atau pejabat..."
          value={search}
          onChange={setSearch}
        />
        <DateFilter date={date} onSelect={setDate} />
      </div>

      <AppointmentsTable
        appointments={filteredAppointments || []}
        onUpdateStatus={updateStatus}
      />
    </div>
  );
};

export default AdminAppointments;
