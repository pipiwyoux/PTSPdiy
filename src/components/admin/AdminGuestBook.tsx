import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import SearchFilter from "./filters/SearchFilter";
import DateFilter from "./filters/DateFilter";
import GuestBookTable from "./guest-book/GuestBookTable";
import { GuestBookEntry } from "@/types/admin";

const AdminGuestBook = () => {
  const [search, setSearch] = useState("");
  const [date, setDate] = useState<Date>();
  const { toast } = useToast();

  const { data: entries, refetch } = useQuery({
    queryKey: ["guestBook"],
    queryFn: async () => {
      const querySnapshot = await getDocs(collection(db, "guestBook"));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as GuestBookEntry[];
    }
  });

  const handleDelete = async (entryId: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data tamu ini?")) {
      try {
        await deleteDoc(doc(db, "guestBook", entryId));
        toast({
          title: "Data tamu berhasil dihapus",
          description: "Data tamu telah dihapus dari sistem",
        });
        refetch();
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Gagal menghapus data tamu",
        });
      }
    }
  };

  const handleUpdatePIC = async (entryId: string, pic: string) => {
    try {
      await updateDoc(doc(db, "guestBook", entryId), { pic });
      toast({
        title: "PIC berhasil diperbarui",
        description: "PIC telah diperbarui dalam sistem",
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

  const handleUpdateStatus = async (entryId: string, status: string) => {
    try {
      await updateDoc(doc(db, "guestBook", entryId), { status });
      toast({
        title: "Status berhasil diperbarui",
        description: "Status telah diperbarui dalam sistem",
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

  const filteredEntries = entries?.filter(entry => {
    const matchesSearch = 
      entry.nama?.toLowerCase().includes(search.toLowerCase()) ||
      entry.alamat?.toLowerCase().includes(search.toLowerCase()) ||
      entry.tujuan?.toLowerCase().includes(search.toLowerCase()) ||
      entry.nomorHp?.toLowerCase().includes(search.toLowerCase()) ||
      entry.detailLayanan?.toLowerCase().includes(search.toLowerCase());
    
    const matchesDate = !date || format(new Date(entry.tanggal), "yyyy-MM-dd") === format(date, "yyyy-MM-dd");
    
    return matchesSearch && matchesDate;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <SearchFilter
          placeholder="Cari berdasarkan nama, alamat, atau tujuan..."
          value={search}
          onChange={setSearch}
        />
        <DateFilter date={date} onSelect={setDate} />
      </div>

      <GuestBookTable
        entries={filteredEntries || []}
        onDelete={handleDelete}
        onUpdatePIC={handleUpdatePIC}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
};

export default AdminGuestBook;
