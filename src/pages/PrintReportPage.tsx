import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import SearchFilter from "@/components/admin/filters/SearchFilter";
import DateFilter from "@/components/admin/filters/DateFilter";
import PrintReportPreview from "@/components/admin/mail/PrintReportPreview";
import { OutgoingMail, IncomingMail, GuestBookEntry, Appointment, ServiceRequest } from "@/types/admin";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PrintAllReportsPreview from "@/components/admin/mail/PrintAllReportsPreview";

type ReportType = "outgoingMail" | "incomingMail" | "guestBook" | "appointments" | "serviceRequests";

const PrintReportPage = () => {
  const [search, setSearch] = useState("");
  const [date, setDate] = useState<Date>();
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [reportType, setReportType] = useState<ReportType | null>(null);
  const { toast } = useToast();

  const { data: outgoingMailEntries } = useQuery({
    queryKey: ["outgoingMail"],
    queryFn: async () => {
      const querySnapshot = await getDocs(collection(db, "outgoingMail"));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as OutgoingMail[];
    },
    enabled: reportType === "outgoingMail"
  });

  const { data: incomingMailEntries } = useQuery({
    queryKey: ["incomingMail"],
    queryFn: async () => {
      const querySnapshot = await getDocs(collection(db, "incomingMail"));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as IncomingMail[];
    },
    enabled: reportType === "incomingMail"
  });

  const { data: guestBookEntries } = useQuery({
    queryKey: ["guestBook"],
    queryFn: async () => {
      const querySnapshot = await getDocs(collection(db, "guestBook"));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as GuestBookEntry[];
    },
    enabled: reportType === "guestBook"
  });

  const { data: appointmentEntries } = useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      const querySnapshot = await getDocs(collection(db, "appointments"));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Appointment[];
    },
    enabled: reportType === "appointments"
  });

  const { data: serviceRequests } = useQuery({
    queryKey: ["serviceRequests"],
    queryFn: async () => {
      const querySnapshot = await getDocs(collection(db, "serviceRequests"));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ServiceRequest[];
    },
    enabled: reportType === "serviceRequests"
  });

  const handlePrint = () => {
    const printContent = document.querySelector('.print-container');
    const originalContent = document.body.innerHTML;
    
    if (printContent) {
      document.body.innerHTML = printContent.outerHTML;
      window.print();
      document.body.innerHTML = originalContent;
      window.location.reload(); // Reload to restore React functionality
    }
  };

  const handleSortOrderChange = (value: "asc" | "desc") => {
    setSortOrder(value);
  };

  const handleReportTypeChange = (value: ReportType) => {
    setReportType(value);
  };

  const filterAndSortEntries = () => {
    let entries: any[] = [];
    if (reportType === "outgoingMail") {
      entries = outgoingMailEntries || [];
    } else if (reportType === "incomingMail") {
      entries = incomingMailEntries || [];
    } else if (reportType === "guestBook") {
      entries = guestBookEntries || [];
    } else if (reportType === "appointments") {
      entries = appointmentEntries || [];
    } else if (reportType === "serviceRequests") {
      entries = serviceRequests || [];
    }

    return entries.filter(entry => {
      const matchesSearch = 
        (entry.kodeSurat && entry.kodeSurat?.toLowerCase().includes(search.toLowerCase())) ||
        (entry.alamatPenerima && entry.alamatPenerima?.toLowerCase().includes(search.toLowerCase())) ||
        (entry.perihal && entry.perihal?.toLowerCase().includes(search.toLowerCase())) ||
        (entry.nomorSurat && entry.nomorSurat?.toLowerCase().includes(search.toLowerCase())) ||
        (entry.requestBy && entry.requestBy?.toLowerCase().includes(search.toLowerCase())) ||
        (entry.nama && entry.nama?.toLowerCase().includes(search.toLowerCase())) ||
        (entry.alamat && entry.alamat?.toLowerCase().includes(search.toLowerCase())) ||
        (entry.tujuan && entry.tujuan?.toLowerCase().includes(search.toLowerCase())) ||
        (entry.nomorHp && entry.nomorHp?.toLowerCase().includes(search.toLowerCase())) ||
        (entry.detailLayanan && entry.detailLayanan?.toLowerCase().includes(search.toLowerCase())) ||
        (entry.noRegistrasi && entry.noRegistrasi?.toLowerCase().includes(search.toLowerCase())) ||
        (entry.layanan && entry.layanan?.toLowerCase().includes(search.toLowerCase())) ||
        (entry.seksi && entry.seksi?.toLowerCase().includes(search.toLowerCase())) ||
        (entry.namaLengkap && entry.namaLengkap?.toLowerCase().includes(search.toLowerCase())) ||
        (entry.email && entry.email?.toLowerCase().includes(search.toLowerCase()));
      
      const matchesDate = !date || (entry.tanggal && format(new Date(entry.tanggal), "yyyy-MM-dd") === format(date, "yyyy-MM-dd")) || (entry.tanggalTerima && format(new Date(entry.tanggalTerima), "yyyy-MM-dd") === format(date, "yyyy-MM-dd")) || (entry.date && format(new Date(entry.date), "yyyy-MM-dd") === format(date, "yyyy-MM-dd"));
      
      return matchesSearch && matchesDate;
    }).sort((a, b) => {
      const dateA = new Date(a.tanggal || a.tanggalTerima || a.date);
      const dateB = new Date(b.tanggal || b.tanggalTerima || b.date);
      return sortOrder === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Cetak Laporan</h2>
      <div className="flex justify-between items-center gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <SearchFilter
            placeholder="Cari berdasarkan kode surat, alamat penerima, atau perihal..."
            value={search}
            onChange={setSearch}
          />
          <DateFilter date={date} onSelect={setDate} />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-muted-foreground">Urutkan</label>
          <Select onValueChange={handleSortOrderChange} defaultValue={sortOrder}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Pilih Urutan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Terlama</SelectItem>
              <SelectItem value="desc">Terbaru</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        <Button onClick={() => handleReportTypeChange("outgoingMail")} variant={reportType === "outgoingMail" ? "default" : "outline"}>Surat Keluar</Button>
        <Button onClick={() => handleReportTypeChange("incomingMail")} variant={reportType === "incomingMail" ? "default" : "outline"}>Surat Masuk</Button>
        <Button onClick={() => handleReportTypeChange("guestBook")} variant={reportType === "guestBook" ? "default" : "outline"}>Buku Tamu</Button>
        <Button onClick={() => handleReportTypeChange("appointments")} variant={reportType === "appointments" ? "default" : "outline"}>Janji Temu</Button>
        <Button onClick={() => handleReportTypeChange("serviceRequests")} variant={reportType === "serviceRequests" ? "default" : "outline"}>Permohonan Layanan</Button>
      </div>
      <div className="flex justify-end">
        <Button onClick={handlePrint} disabled={!reportType}>
          Cetak Laporan
        </Button>
      </div>
      <div className="flex justify-center items-center bg-gray-100 p-4">
        {reportType && <PrintAllReportsPreview entries={filterAndSortEntries()} reportType={reportType} />}
      </div>
    </div>
  );
};

export default PrintReportPage;
