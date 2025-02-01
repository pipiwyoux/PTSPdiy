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
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Jam</TableHead>
              <TableHead>Nama Tamu</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Instansi</TableHead>
              <TableHead>Bertemu</TableHead>
              <TableHead>Keperluan</TableHead>
              <TableHead>No WhatsApp</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appointment, index) => (
              <TableRow key={appointment.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{format(new Date(appointment.date), "dd/MM/yyyy")}</TableCell>
                <TableCell>{appointment.time}</TableCell>
                <TableCell>{appointment.name}</TableCell>
                <TableCell>{appointment.email}</TableCell>
                <TableCell>{appointment.institution}</TableCell>
                <TableCell>{appointment.meetWith}</TableCell>
                <TableCell>{appointment.purpose}</TableCell>
                <TableCell>{appointment.whatsapp}</TableCell>
                <TableCell>
                  <AppointmentStatusSelect
                    status={appointment.status}
                    onValueChange={(value) => onUpdateStatus(appointment.id, value)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleWhatsAppClick(appointment.whatsapp)}
                    >
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditClick(appointment)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
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
