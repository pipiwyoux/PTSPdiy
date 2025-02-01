import { useState, useRef, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, deleteDoc, doc, query, orderBy, limit } from "firebase/firestore";
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
import PrintReportPreview from "./mail/PrintReportPreview";
import IframePrintContent from "./mail/IframePrintContent";
import * as React from "react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useNavigate } from "react-router-dom";

const AdminOutgoingMail = () => {
  const [search, setSearch] = useState("");
  const [date, setDate] = useState<Date>();
  const [showForm, setShowForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState<OutgoingMail | null>(null);
  const [printContent, setPrintContent] = useState<string>("");
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [hasPrinted, setHasPrinted] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [printIframeLoaded, setPrintIframeLoaded] = useState(false);

  const { data: entries, refetch } = useQuery({
    queryKey: ["outgoingMail", currentPage, itemsPerPage],
    queryFn: async () => {
      const q = query(
        collection(db, "outgoingMail"),
        orderBy("tanggal", "desc"),
        limit(itemsPerPage)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as OutgoingMail[];
    },
    keepPreviousData: true,
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

  const handlePrint = useCallback(() => {
    if (hasPrinted || isPrinting) return;
    setIsPrinting(true);
    setHasPrinted(true);

    const printContent = document.querySelector('.print-container');
    if (printContent && iframeRef.current) {
      const iframe = iframeRef.current;
      const iframeDocument = iframe.contentDocument;
      if (iframeDocument) {
        iframeDocument.body.innerHTML = printContent.outerHTML;
        
        // Use a promise to ensure the iframe content is loaded before printing
        new Promise<void>((resolve) => {
          iframe.onload = () => {
            iframe.contentWindow?.print();
            resolve();
          };
          iframe.contentWindow?.print();
        }).then(() => {
          // Reset the iframe content after printing
          if (iframeDocument) {
            iframeDocument.body.innerHTML = '';
          }
          navigate("/");
        });
      }
    }
  }, [hasPrinted, navigate, isPrinting]);

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

  const totalPages = Math.ceil((filteredEntries?.length || 0) / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Surat Keluar</h2>
        <div className="flex gap-2">
          <Button onClick={() => {
              const printContent = document.querySelector('.print-container');
              if (printContent) {
                setPrintContent(printContent.outerHTML);
              }
              handlePrint();
            }} disabled={isPrinting}>
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
      <iframe
        ref={iframeRef}
        style={{ display: 'none' }}
        title="Print Preview"
      />
      {printContent && (
        <div style={{ display: 'none' }}>
          <PrintReportPreview entries={filteredEntries || []} />
        </div>
      )}
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

export default AdminOutgoingMail;
