import { UseFormReturn } from "react-hook-form";
import { OutgoingMail } from "@/types/admin";
import DateField from "./DateField";
import TextField from "./TextField";
import SelectField from "./SelectField";

type FormValues = Omit<OutgoingMail, 'id'>;

interface OutgoingMailFieldsProps {
  form: UseFormReturn<FormValues>;
}

const departments = ["SETJEN", "BIMAS ISLAM", "MADRASAH", "PAI", "PONTREN", "ZAWA", "PHU"];

const OutgoingMailFields = ({ form }: OutgoingMailFieldsProps) => {
  return (
    <>
      <TextField
        form={form}
        name="kodeSurat"
        label="Kode Surat"
      />
      <TextField
        form={form}
        name="alamatPenerima"
        label="Alamat Penerima"
      />
      <DateField
        form={form}
        name="tanggal"
        label="Tanggal"
      />
      <TextField
        form={form}
        name="perihal"
        label="Perihal"
      />
      <TextField
        form={form}
        name="nomorSurat"
        label="Nomor Surat"
      />
      <SelectField
        form={form}
        name="requestBy"
        label="Request By"
        options={departments}
      />
      <TextField
        form={form}
        name="linkFile"
        label="Link File (Optional)"
      />
    </>
  );
};

export default OutgoingMailFields;
