import { UseFormReturn } from "react-hook-form";
import { IncomingMail } from "@/types/admin";
import DateField from "./DateField";
import TextField from "./TextField";
import SelectField from "./SelectField";

type FormValues = Omit<IncomingMail, 'id'>;

interface IncomingMailFieldsProps {
  form: UseFormReturn<FormValues>;
}

const staffMembers = ["ADAM", "NOVAN", "YEYEN", "DELFI"];

const IncomingMailFields = ({ form }: IncomingMailFieldsProps) => {
  return (
    <>
      <DateField
        form={form}
        name="tanggalTerima"
        label="Tanggal Terima"
      />
      <TextField
        form={form}
        name="alamatPengirim"
        label="Alamat Pengirim"
      />
      <DateField
        form={form}
        name="tanggalSurat"
        label="Tanggal Surat"
      />
      <TextField
        form={form}
        name="nomorAgenda"
        label="Nomor Agenda"
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
        name="pic"
        label="PIC"
        options={staffMembers}
      />
    </>
  );
};

export default IncomingMailFields;
