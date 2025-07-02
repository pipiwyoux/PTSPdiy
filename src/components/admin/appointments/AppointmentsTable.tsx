import { useState } from "react";
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
import { Appointment } from "@/types/admin";
import AppointmentStatusSelect from "./AppointmentStatusSelect";
import { Edit, Trash, MessageSquare } from "lucide-react";
import EditAppointmentModal from "./EditAppointmentModal";

interface AppointmentsTableProps {
  appointments: Appointment[];
  onUpdateStatus: (appointmentId: string, newStatus: string) => void;
  onDelete?: (appointmentId: string) => void;
  onEdit?: (appointment: Appointment) => void;
}

const AppointmentsTable = ({ appointments, onUpdateStatus, onDelete, onEdit }: AppointmentsTableProps) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const handleWhatsAppClick = (phoneNumber: string) => {
    const url = `https://wa.me/${phoneNumber.replace(/\D/g, '')}`;
    window.open(url, '_blank');
  };

  const handleEditClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setEditModalOpen(true);
  };

  return (
    <>
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="whitespace-nowrap">No</TableHead>
              <TableHead className="whitespace-nowrap">Tanggal</TableHead>
              <TableHead className="whitespace-nowrap">Jam</TableHead>
              <TableHead className="whitespace-nowrap">Nama Tamu</TableHead>
              <TableHead className="whitespace-nowrap">Email</TableHead>
              <TableHead className="whitespace-nowrap">Instansi</TableHead>
              <TableHead className="whitespace-nowrap">Bertemu</TableHead>
              <TableHead className="whitespace-nowrap">Keperluan</TableHead>
              <TableHead className="whitespace-nowrap">No WhatsApp</TableHead>
              <TableHead className="whitespace-nowrap">Status</TableHead>
              <TableHead className="whitespace-nowrap">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appointment, index) => (
              <TableRow key={appointment.id}>
                <TableCell className="whitespace-nowrap">{index + 1}</TableCell>
                <TableCell className="whitespace-nowrap">{format(new Date(appointment.date), "dd/MM/yyyy")}</TableCell>
                <TableCell className="whitespace-nowrap">{appointment.time}</TableCell>
                <TableCell className="max-w-[150px] truncate">{appointment.name}</TableCell>
                <TableCell className="max-w-[200px] truncate">{appointment.email}</TableCell>
                <TableCell className="whitespace-nowrap">{appointment.institution}</TableCell>
                <TableCell className="whitespace-nowrap">{appointment.meetWith}</TableCell>
                <TableCell className="max-w-[200px] truncate">{appointment.purpose}</TableCell>
                <TableCell className="whitespace-nowrap">{appointment.whatsapp}</TableCell>
                <TableCell className="min-w-[120px]">
                  <AppointmentStatusSelect
                    status={appointment.status}
                    onValueChange={(value) => onUpdateStatus(appointment.id, value)}
                  />
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleWhatsAppClick(appointment.whatsapp)}
                    >
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleEditClick(appointment)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => onDelete?.(appointment.id)}
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
      {selectedAppointment && (
        <EditAppointmentModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          appointment={selectedAppointment}
        />
      )}
    </>
  );
};

export default AppointmentsTable;