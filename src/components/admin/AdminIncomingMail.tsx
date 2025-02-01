import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import SearchFilter from "./filters/SearchFilter";
import DateFilter from "./filters/DateFilter";
import IncomingMailTable from "./mail/IncomingMailTable";
import IncomingMailForm from "./mail/IncomingMailForm";
import EditIncomingMailForm from "./mail/EditIncomingMailForm";
import { IncomingMail } from "@/types/admin";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const AdminIncomingMail = () => {
  const [search, setSearch] = useState("");
  const [date, setDate] = useState<Date>();
  const [showForm, setShowForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState<IncomingMail | null>(null);
  const { toast } = useToast();

  const { data: entries, refetch } = useQuery({
    queryKey: ["incomingMail"],
    queryFn: async () => {
      const querySnapshot = await getDocs(collection(db, "incomingMail"));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as IncomingMail[];
    }
  });

  const handleDelete = async (entryId: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus surat masuk ini?")) {
      try {
        await deleteDoc(doc(db, "incomingMail", entryId));
        toast({
          title: "Surat masuk berhasil dihapus",
          description: "Data surat masuk telah dihapus dari sistem",
        });
        refetch();
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Gagal menghapus surat masuk",
        });
      }
    }
  };

  const handleEdit = (entry: IncomingMail) => {
    setEditingEntry(entry);
  };

  const handlePrint = (entry: IncomingMail) => {
    // TODO: Implement print functionality
    console.log("Print entry:", entry);
  };

  const handleUpdatePIC = async (entryId: string, pic: string) => {
    try {
      await updateDoc(doc(db, "incomingMail", entryId), { pic });
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

  const filteredEntries = entries?.filter(entry => {
    const matchesSearch = 
      entry.alamatPengirim?.toLowerCase().includes(search.toLowerCase()) ||
      entry.perihal?.toLowerCase().includes(search.toLowerCase()) ||
      entry.nomorSurat?.toLowerCase().includes(search.toLowerCase()) ||
      entry.nomorAgenda?.toLowerCase().includes(search.toLowerCase());
    
    const matchesDate = !date || format(new Date(entry.tanggalTerima), "yyyy-MM-dd") === format(date, "yyyy-MM-dd");
    
    return matchesSearch && matchesDate;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Surat Masuk</h2>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="mr-2 h-4 w-4" />
          {showForm ? "Tutup Form" : "Tambah Surat Masuk"}
        </Button>
      </div>

      {showForm && (
        <div className="border rounded-lg p-4 bg-white">
          <IncomingMailForm onSuccess={() => {
            setShowForm(false);
            refetch();
          }} />
        </div>
      )}

      {editingEntry && (
        <div className="border rounded-lg p-4 bg-white">
          <EditIncomingMailForm
            entry={editingEntry}
            onSuccess={() => {
              setEditingEntry(null);
              refetch();
            }}
            onCancel={() => setEditingEntry(null)}
          />
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4">
        <SearchFilter
          placeholder="Cari berdasarkan alamat pengirim, perihal, atau nomor surat..."
          value={search}
          onChange={setSearch}
        />
        <DateFilter date={date} onSelect={setDate} />
      </div>

      <IncomingMailTable
        entries={filteredEntries || []}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onPrint={handlePrint}
        onUpdatePIC={handleUpdatePIC}
      />
    </div>
  );
};

export default AdminIncomingMail;
