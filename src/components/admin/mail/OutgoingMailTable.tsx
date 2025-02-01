import { format } from "date-fns";
import { Edit, Trash } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { OutgoingMail } from "@/types/admin";

interface OutgoingMailTableProps {
  entries: OutgoingMail[];
  onEdit: (entry: OutgoingMail) => void;
  onDelete: (id: string) => void;
}

const OutgoingMailTable = ({
  entries,
  onEdit,
  onDelete,
}: OutgoingMailTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Kode Surat</TableHead>
            <TableHead>Alamat Penerima</TableHead>
            <TableHead>Tanggal</TableHead>
            <TableHead>Perihal</TableHead>
            <TableHead>Nomor Surat</TableHead>
            <TableHead>Request By</TableHead>
            <TableHead>File/Link</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell>{entry.kodeSurat}</TableCell>
              <TableCell>{entry.alamatPenerima}</TableCell>
              <TableCell>{format(new Date(entry.tanggal), "dd/MM/yyyy")}</TableCell>
              <TableCell>{entry.perihal}</TableCell>
              <TableCell>{entry.nomorSurat}</TableCell>
              <TableCell>{entry.requestBy}</TableCell>
              <TableCell>
                {entry.fileSurat && <span>File tersedia</span>}
                {entry.linkFile && (
                  <a
                    href={entry.linkFile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Link
                  </a>
                )}
              </TableCell>
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
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OutgoingMailTable;
