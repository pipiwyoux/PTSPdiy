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

interface AppointmentsTableProps {
  appointments: Appointment[];
  onUpdateStatus: (appointmentId: string, newStatus: string) => void;
}

const AppointmentsTable = ({ appointments, onUpdateStatus }: AppointmentsTableProps) => {
  return (
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
              <TableCell>
                <AppointmentStatusSelect
                  status={appointment.status}
                  onValueChange={(value) => onUpdateStatus(appointment.id, value)}
                />
              </TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  Detail
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppointmentsTable;
