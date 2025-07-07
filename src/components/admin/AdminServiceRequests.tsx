import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, doc, updateDoc, deleteDoc, query, orderBy, limit, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { ServiceRequest } from "@/types/admin";
import SearchFilter from "./filters/SearchFilter";
import DateFilter from "./filters/DateFilter";
import ServiceRequestsTable from "./service-requests/ServiceRequestsTable";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const AdminServiceRequests = () => {
  const [search, setSearch] = useState("");
  const [date, setDate] = useState<Date>();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;
  const { toast } = useToast();

  const { data: requests, refetch } = useQuery({
    queryKey: ["serviceRequests", currentPage, itemsPerPage],
    queryFn: async () => {
      const q = query(
        collection(db, "serviceRequests"),
        orderBy("tanggal", "desc"),
        limit(itemsPerPage)
      );
      const querySnapshot = await getDocs(q);
      
      // Get service requests with user data
      const requestsWithUserData = await Promise.all(
        querySnapshot.docs.map(async (docSnapshot) => {
          const requestData = {
            id: docSnapshot.id,
            ...docSnapshot.data()
          } as ServiceRequest;

          // If nomorHp is missing and we have userId, try to get it from user data
          if (!requestData.nomorHp && requestData.userId) {
            try {
              const userDoc = await getDoc(doc(db, "users", requestData.userId));
              if (userDoc.exists()) {
                const userData = userDoc.data();
                requestData.nomorHp = userData.whatsapp || "";
              }
            } catch (error) {
              console.log("Could not fetch user data for:", requestData.userId);
            }
          }

          return requestData;
        })
      );

      return requestsWithUserData;
    },
    keepPreviousData: true,
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

  const totalPages = Math.ceil((filteredRequests?.length || 0) / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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

export default AdminServiceRequests;