import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import SearchFilter from "./filters/SearchFilter";
import DateFilter from "./filters/DateFilter";
import OutgoingMailTable from "./mail/OutgoingMailTable";
import OutgoingMailForm from "./mail/OutgoingMailForm";
import EditOutgoingMailForm from "./mail/EditOutgoingMailForm";
import { OutgoingMail } from "@/types/admin";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import PrintReportModal from "./mail/PrintReportModal";

const AdminOutgoingMail = () => {
  const [search, setSearch] = useState("");
  const [date, setDate] = useState<Date>();
  const [showForm, setShowForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState<OutgoingMail | null>(null);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const { toast } = useToast();

  const { data: entries, refetch } = useQuery({
    queryKey: ["outgoingMail"],
    queryFn: async () => {
      const querySnapshot = await getDocs(collection(db, "outgoingMail"));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as OutgoingMail[];
    }
  });

  const handleDelete = async (entryId: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus surat keluar ini?")) {
      try {
        await deleteDoc(doc(db, "outgoingMail", entryId));
        toast({
          title: "Surat keluar berhasil dihapus",
          description: "Data surat keluar telah dihapus dari sistem",
        });
        refetch();
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Gagal menghapus surat keluar",
        });
      }
    }
  };

  const handleEdit = (entry: OutgoingMail) => {
    setEditingEntry(entry);
  };

  const handlePrint = () => {
    setShowPrintModal(true);
  };

  const filteredEntries = entries?.filter(entry => {
    const matchesSearch = 
      entry.kodeSurat?.toLowerCase().includes(search.toLowerCase()) ||
      entry.alamatPenerima?.toLowerCase().includes(search.toLowerCase()) ||
      entry.perihal?.toLowerCase().includes(search.toLowerCase()) ||
      entry.nomorSurat?.toLowerCase().includes(search.toLowerCase()) ||
      entry.requestBy?.toLowerCase().includes(search.toLowerCase());
    
    const matchesDate = !date || format(new Date(entry.tanggal), "yyyy-MM-dd") === format(date, "yyyy-MM-dd");
    
    return matchesSearch && matchesDate;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Surat Keluar</h2>
        <div className="flex gap-2">
          <Button onClick={handlePrint}>
            Cetak Laporan
          </Button>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="mr-2 h-4 w-4" />
            {showForm ? "Tutup Form" : "Tambah Surat Keluar"}
          </Button>
        </div>
      </div>

      {showForm && (
        <div className="border rounded-lg p-4 bg-white">
          <OutgoingMailForm onSuccess={() => {
            setShowForm(false);
            refetch();
          }} />
        </div>
      )}

      {editingEntry && (
        <div className="border rounded-lg p-4 bg-white">
          <EditOutgoingMailForm
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
          placeholder="Cari berdasarkan kode surat, alamat penerima, atau perihal..."
          value={search}
          onChange={setSearch}
        />
        <DateFilter date={date} onSelect={setDate} />
      </div>

      <OutgoingMailTable
        entries={filteredEntries || []}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      <PrintReportModal
        isOpen={showPrintModal}
        onClose={() => setShowPrintModal(false)}
        entries={entries || []}
      />
    </div>
  );
};

export default AdminOutgoingMail;
