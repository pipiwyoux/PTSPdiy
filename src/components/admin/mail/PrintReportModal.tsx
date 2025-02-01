import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { OutgoingMail } from "@/types/admin";
import PrintReportPreview from "./PrintReportPreview";
import { useState } from "react";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PrintReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  entries: OutgoingMail[];
}

const PrintReportModal = ({ isOpen, onClose, entries }: PrintReportModalProps) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handlePrint = () => {
    const printContent = document.querySelector('.print-container');
    const originalContent = document.body.innerHTML;
    
    if (printContent) {
      document.body.innerHTML = printContent.outerHTML;
      window.print();
      document.body.innerHTML = originalContent;
      // window.location.reload(); // Removed reload to restore React functionality
    }
  };

  const handleSortOrderChange = (value: "asc" | "desc") => {
    setSortOrder(value);
  };

  const filteredEntries = entries.filter(entry => {
    if (!startDate || !endDate) return true;
    const entryDate = new Date(entry.tanggal);
    return entryDate >= startDate && entryDate <= endDate;
  }).sort((a, b) => {
    const dateA = new Date(a.tanggal);
    const dateB = new Date(b.tanggal);
    return sortOrder === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="space-y-4">
          <DialogHeader>
            <DialogTitle className="text-center text-lg font-bold">
              Cetak Laporan Surat Keluar
            </DialogTitle>
          </DialogHeader>
          <div className="flex justify-between items-center gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-muted-foreground">Dari Tanggal</label>
              <input
                type="date"
                className="rounded-md border p-2"
                onChange={(e) => setStartDate(e.target.value ? new Date(e.target.value) : null)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-muted-foreground">Sampai Tanggal</label>
              <input
                type="date"
                className="rounded-md border p-2"
                onChange={(e) => setEndDate(e.target.value ? new Date(e.target.value) : null)}
              />
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
          <div className="flex justify-end sticky top-0 bg-white z-10 py-2">
            <Button onClick={handlePrint}>
              Cetak Laporan
            </Button>
          </div>
          <div className="flex justify-center items-center bg-gray-100 p-4">
            <PrintReportPreview entries={filteredEntries} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PrintReportModal;
