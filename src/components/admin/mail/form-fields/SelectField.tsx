import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";

interface SelectFieldProps {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  options: string[];
}

const SelectField = ({ form, name, label, options }: SelectFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <select
              {...field}
              className="w-full rounded-md border p-2"
            >
              <option value="">Pilih {label}</option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectField;
