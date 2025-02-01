import { useState } from "react";
import { useForm } from "react-hook-form";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { IncomingMail } from "@/types/admin";
import IncomingMailFields from "./form-fields/IncomingMailFields";
import FormActions from "./form-fields/FormActions";

interface EditIncomingMailFormProps {
  entry: IncomingMail;
  onSuccess: () => void;
  onCancel: () => void;
}

type FormValues = Omit<IncomingMail, 'id'>;

const EditIncomingMailForm = ({ entry, onSuccess, onCancel }: EditIncomingMailFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    defaultValues: {
      tanggalTerima: entry.tanggalTerima,
      alamatPengirim: entry.alamatPengirim,
      tanggalSurat: entry.tanggalSurat,
      nomorAgenda: entry.nomorAgenda,
      perihal: entry.perihal,
      nomorSurat: entry.nomorSurat,
      pic: entry.pic
    }
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      await updateDoc(doc(db, "incomingMail", entry.id), data);
      toast({
        title: "Surat masuk berhasil diperbarui",
        description: "Data surat masuk telah diperbarui dalam sistem",
      });
      onSuccess();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Gagal memperbarui surat masuk",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <IncomingMailFields form={form} />
        <FormActions isSubmitting={isSubmitting} onCancel={onCancel} />
      </form>
    </Form>
  );
};

export default EditIncomingMailForm;
