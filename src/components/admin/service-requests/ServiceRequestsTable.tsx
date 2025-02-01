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
import { ServiceRequest } from "@/types/admin";
import ServiceRequestStatusSelect from "./ServiceRequestStatusSelect";
import ServiceRequestPICSelect from "./ServiceRequestPICSelect";
import { Link } from "lucide-react";

interface ServiceRequestsTableProps {
  requests: ServiceRequest[];
  onUpdateStatus: (requestId: string, newStatus: string) => void;
  onUpdatePIC: (requestId: string, newPIC: string) => void;
  onDelete?: (requestId: string) => void;
  onEdit?: (request: ServiceRequest) => void;
}

const ServiceRequestsTable = ({ 
  requests, 
  onUpdateStatus,
  onUpdatePIC,
  onDelete,
  onEdit 
}: ServiceRequestsTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Tanggal</TableHead>
            <TableHead>No Registrasi</TableHead>
            <TableHead>Nama Pemohon</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Seksi</TableHead>
            <TableHead>PIC</TableHead>
            <TableHead>Layanan</TableHead>
            <TableHead>Link</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request, index) => (
            <TableRow key={request.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{format(new Date(request.tanggal), "dd/MM/yyyy")}</TableCell>
              <TableCell>{request.noRegistrasi}</TableCell>
              <TableCell>{request.namaLengkap}</TableCell>
              <TableCell>{request.email}</TableCell>
              <TableCell>{request.seksi}</TableCell>
              <TableCell>
                <ServiceRequestPICSelect
                  pic={request.pic || ""}
                  onValueChange={(value) => onUpdatePIC(request.id, value)}
                />
              </TableCell>
              <TableCell>{request.layanan}</TableCell>
              <TableCell>
                {request.link && (
                  <a 
                    href={request.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                  >
                    <Link className="h-4 w-4" />
                    Link
                  </a>
                )}
              </TableCell>
              <TableCell>
                <ServiceRequestStatusSelect
                  status={request.status}
                  onValueChange={(value) => onUpdateStatus(request.id, value)}
                />
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onEdit?.(request)}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => onDelete?.(request.id)}
                  >
                    Hapus
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

export default ServiceRequestsTable;
