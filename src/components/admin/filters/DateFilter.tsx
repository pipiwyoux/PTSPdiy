import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

interface DateFilterProps {
  date: Date | undefined;
  onSelect: (date: Date | undefined) => void;
}

const DateFilter = ({ date, onSelect }: DateFilterProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full sm:w-[240px]">
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : "Pilih tanggal"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DateFilter;
