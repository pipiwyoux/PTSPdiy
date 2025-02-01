import { useState } from "react";
import { format } from "date-fns";
import { Edit, Trash, Printer } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { IncomingMail } from "@/types/admin";
import DispositionModal from "./DispositionModal";

interface IncomingMailTableProps {
  entries: IncomingMail[];
  onEdit: (entry: IncomingMail) => void;
  onDelete: (id: string) => void;
  onPrint: (entry: IncomingMail) => void;
  onUpdatePIC: (id: string, pic: string) => void;
}

const IncomingMailTable = ({
  entries,
  onEdit,
  onDelete,
}: IncomingMailTableProps) => {
  const [selectedMail, setSelectedMail] = useState<IncomingMail | null>(null);

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tanggal Terima</TableHead>
              <TableHead>Alamat Pengirim</TableHead>
              <TableHead>Tanggal Surat</TableHead>
              <TableHead>Nomor Agenda</TableHead>
              <TableHead>Perihal</TableHead>
              <TableHead>Nomor Surat</TableHead>
              <TableHead>PIC</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell>{format(new Date(entry.tanggalTerima), "dd/MM/yyyy")}</TableCell>
                <TableCell>{entry.alamatPengirim}</TableCell>
                <TableCell>{format(new Date(entry.tanggalSurat), "dd/MM/yyyy")}</TableCell>
                <TableCell>{entry.nomorAgenda}</TableCell>
                <TableCell>{entry.perihal}</TableCell>
                <TableCell>{entry.nomorSurat}</TableCell>
                <TableCell>{entry.pic}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(entry)}
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
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedMail(entry)}
                    >
                      <Printer className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedMail && (
        <DispositionModal
          isOpen={!!selectedMail}
          onClose={() => setSelectedMail(null)}
          mail={selectedMail}
        />
      )}
    </>
  );
};

export default IncomingMailTable;
