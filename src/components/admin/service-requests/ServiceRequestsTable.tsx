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
import { Link, MessageSquare } from "lucide-react";

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
  const handleWhatsAppClick = (phoneNumber: string) => {
    if (!phoneNumber) return;
    const url = `https://wa.me/${phoneNumber.replace(/\D/g, '')}`;
    window.open(url, '_blank');
  };

  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="whitespace-nowrap">No</TableHead>
            <TableHead className="whitespace-nowrap">Tanggal</TableHead>
            <TableHead className="whitespace-nowrap">No Registrasi</TableHead>
            <TableHead className="whitespace-nowrap">Nama Pemohon</TableHead>
            <TableHead className="whitespace-nowrap">Email</TableHead>
            <TableHead className="whitespace-nowrap">No HP</TableHead>
            <TableHead className="whitespace-nowrap">Seksi</TableHead>
            <TableHead className="whitespace-nowrap">PIC</TableHead>
            <TableHead className="whitespace-nowrap">Layanan</TableHead>
            <TableHead className="whitespace-nowrap">Link</TableHead>
            <TableHead className="whitespace-nowrap">Status</TableHead>
            <TableHead className="whitespace-nowrap">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request, index) => (
            <TableRow key={request.id}>
              <TableCell className="whitespace-nowrap">{index + 1}</TableCell>
              <TableCell className="whitespace-nowrap">{format(new Date(request.tanggal), "dd/MM/yyyy")}</TableCell>
              <TableCell className="whitespace-nowrap">{request.noRegistrasi}</TableCell>
              <TableCell className="max-w-[150px] truncate">{request.namaLengkap}</TableCell>
              <TableCell className="max-w-[200px] truncate">{request.email}</TableCell>
              <TableCell className="whitespace-nowrap">{request.nomorHp || '-'}</TableCell>
              <TableCell className="whitespace-nowrap">{request.seksi}</TableCell>
              <TableCell className="min-w-[140px]">
                <ServiceRequestPICSelect
                  pic={request.pic || ""}
                  onValueChange={(value) => onUpdatePIC(request.id, value)}
                />
              </TableCell>
              <TableCell className="max-w-[200px] truncate">{request.layanan}</TableCell>
              <TableCell className="whitespace-nowrap">
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
              <TableCell className="min-w-[120px]">
                <ServiceRequestStatusSelect
                  status={request.status}
                  onValueChange={(value) => onUpdateStatus(request.id, value)}
                />
              </TableCell>
              <TableCell className="whitespace-nowrap">
                <div className="flex gap-1">
                  {request.nomorHp && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleWhatsAppClick(request.nomorHp)}
                      title="Kirim pesan WhatsApp"
                    >
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  )}
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