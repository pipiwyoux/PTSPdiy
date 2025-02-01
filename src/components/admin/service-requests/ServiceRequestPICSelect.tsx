import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ServiceRequestPICSelectProps {
  pic: string;
  onValueChange: (value: string) => void;
}

const PIC_OPTIONS = ["ADAM", "NOVAN", "YEYEN", "DELFI"];

const ServiceRequestPICSelect = ({
  pic,
  onValueChange,
}: ServiceRequestPICSelectProps) => {
  return (
    <Select value={pic} onValueChange={onValueChange}>
      <SelectTrigger className="w-[140px]">
        <SelectValue placeholder="Pilih PIC" />
      </SelectTrigger>
      <SelectContent>
        {PIC_OPTIONS.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ServiceRequestPICSelect;
