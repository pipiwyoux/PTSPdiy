import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, doc, updateDoc, query, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { Appointment } from "@/types/admin";
import SearchFilter from "./filters/SearchFilter";
import DateFilter from "./filters/DateFilter";
import AppointmentsTable from "./appointments/AppointmentsTable";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const AdminAppointments = () => {
  const [search, setSearch] = useState("");
  const [date, setDate] = useState<Date>();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;
  const { toast } = useToast();

  const { data: appointments, refetch, isFetching } = useQuery({
    queryKey: ["appointments", currentPage, itemsPerPage],
    queryFn: async () => {
      const q = query(
        collection(db, "appointments"),
        orderBy("date", "desc"),
        limit(itemsPerPage)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Appointment[];
    },
    keepPreviousData: true,
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

  const totalPages = Math.ceil((filteredAppointments?.length || 0) / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationPrevious
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            />
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={page === currentPage}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )
            )}
            <PaginationNext
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            />
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default AdminAppointments;
