import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchFilterProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const SearchFilter = ({ placeholder, value, onChange }: SearchFilterProps) => {
  return (
    <div className="flex-1">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-8"
        />
      </div>
    </div>
  );
};

export default SearchFilter;
