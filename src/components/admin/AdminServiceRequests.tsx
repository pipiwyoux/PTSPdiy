import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { ServiceRequest } from "@/types/admin";
import SearchFilter from "./filters/SearchFilter";
import DateFilter from "./filters/DateFilter";
import ServiceRequestsTable from "./service-requests/ServiceRequestsTable";

const AdminServiceRequests = () => {
  const [search, setSearch] = useState("");
  const [date, setDate] = useState<Date>();
  const { toast } = useToast();

  const { data: requests, refetch } = useQuery({
    queryKey: ["serviceRequests"],
    queryFn: async () => {
      const querySnapshot = await getDocs(collection(db, "serviceRequests"));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ServiceRequest[];
    }
  });

  const updateStatus = async (requestId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, "serviceRequests", requestId), {
        status: newStatus
      });
      toast({
        title: "Status berhasil diperbarui",
        description: `Status permohonan telah diubah menjadi ${newStatus}`,
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

  const updatePIC = async (requestId: string, newPIC: string) => {
    try {
      await updateDoc(doc(db, "serviceRequests", requestId), {
        pic: newPIC
      });
      toast({
        title: "PIC berhasil diperbarui",
        description: `PIC telah diubah menjadi ${newPIC}`,
      });
      refetch();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Gagal memperbarui PIC",
      });
    }
  };

  const handleDelete = async (requestId: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus permohonan ini?")) {
      try {
        await deleteDoc(doc(db, "serviceRequests", requestId));
        toast({
          title: "Permohonan berhasil dihapus",
          description: "Data permohonan telah dihapus dari sistem",
        });
        refetch();
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Gagal menghapus permohonan",
        });
      }
    }
  };

  const handleEdit = (request: ServiceRequest) => {
    // TODO: Implement edit functionality
    console.log("Edit request:", request);
  };

  const filteredRequests = requests?.filter(request => {
    const matchesSearch = 
      request.noRegistrasi?.toLowerCase().includes(search.toLowerCase()) ||
      request.layanan?.toLowerCase().includes(search.toLowerCase()) ||
      request.seksi?.toLowerCase().includes(search.toLowerCase()) ||
      request.namaLengkap?.toLowerCase().includes(search.toLowerCase()) ||
      request.email?.toLowerCase().includes(search.toLowerCase());
    
    const matchesDate = !date || format(new Date(request.tanggal), "yyyy-MM-dd") === format(date, "yyyy-MM-dd");
    
    return matchesSearch && matchesDate;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <SearchFilter
          placeholder="Cari berdasarkan no registrasi, layanan, atau seksi..."
          value={search}
          onChange={setSearch}
        />
        <DateFilter date={date} onSelect={setDate} />
      </div>

      <ServiceRequestsTable
        requests={filteredRequests || []}
        onUpdateStatus={updateStatus}
        onUpdatePIC={updatePIC}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default AdminServiceRequests;
