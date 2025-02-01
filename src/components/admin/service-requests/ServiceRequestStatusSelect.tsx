import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ServiceRequestStatusSelectProps {
  status: string;
  onValueChange: (value: string) => void;
}

const ServiceRequestStatusSelect = ({ status, onValueChange }: ServiceRequestStatusSelectProps) => {
  return (
    <Select defaultValue={status} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="pending">Pending</SelectItem>
        <SelectItem value="processing">Diproses</SelectItem>
        <SelectItem value="completed">Selesai</SelectItem>
        <SelectItem value="rejected">Ditolak</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default ServiceRequestStatusSelect;
