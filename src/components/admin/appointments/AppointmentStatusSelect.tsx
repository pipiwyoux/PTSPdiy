import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AppointmentStatusSelectProps {
  status: string;
  onValueChange: (value: string) => void;
}

const AppointmentStatusSelect = ({ status, onValueChange }: AppointmentStatusSelectProps) => {
  return (
    <Select defaultValue={status} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="pending">Pending</SelectItem>
        <SelectItem value="approved">Disetujui</SelectItem>
        <SelectItem value="rejected">Ditolak</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default AppointmentStatusSelect;
