import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { GuestBookEntry } from "@/types/admin";
import { MessageSquare, Edit, Trash } from "lucide-react";
import ServiceRequestPICSelect from "../service-requests/ServiceRequestPICSelect";
import ServiceRequestStatusSelect from "../service-requests/ServiceRequestStatusSelect";

interface GuestBookTableProps {
  entries: GuestBookEntry[];
  onDelete: (entryId: string) => void;
  onUpdatePIC: (entryId: string, pic: string) => void;
  onUpdateStatus: (entryId: string, status: string) => void;
}

const GuestBookTable = ({ entries, onDelete, onUpdatePIC, onUpdateStatus }: GuestBookTableProps) => {
  const handleWhatsAppClick = (phoneNumber: string) => {
    const url = `https://wa.me/${phoneNumber.replace(/\D/g, '')}`;
    window.open(url, '_blank');
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Tanggal</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>Alamat</TableHead>
            <TableHead>Tujuan</TableHead>
            <TableHead>Detail Layanan</TableHead>
            <TableHead>Nomor HP</TableHead>
            <TableHead>PIC</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((entry, index) => (
            <TableRow key={entry.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{format(new Date(entry.tanggal), "dd/MM/yyyy")}</TableCell>
              <TableCell>{entry.nama}</TableCell>
              <TableCell>{entry.alamat}</TableCell>
              <TableCell>{entry.tujuan}</TableCell>
              <TableCell>{entry.detailLayanan}</TableCell>
              <TableCell>{entry.nomorHp}</TableCell>
              <TableCell>
                <ServiceRequestPICSelect
                  pic={entry.pic || ""}
                  onValueChange={(value) => onUpdatePIC(entry.id, value)}
                />
              </TableCell>
              <TableCell>
                <ServiceRequestStatusSelect
                  status={entry.status || "pending"}
                  onValueChange={(value) => onUpdateStatus(entry.id, value)}
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleWhatsAppClick(entry.nomorHp)}
                  >
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(entry.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default GuestBookTable;
