import { useState } from "react";
import { useForm } from "react-hook-form";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { OutgoingMail } from "@/types/admin";
import OutgoingMailFields from "./form-fields/OutgoingMailFields";
import FormActions from "./form-fields/FormActions";

interface EditOutgoingMailFormProps {
  entry: OutgoingMail;
  onSuccess: () => void;
  onCancel: () => void;
}

type FormValues = Omit<OutgoingMail, 'id'>;

const EditOutgoingMailForm = ({ entry, onSuccess, onCancel }: EditOutgoingMailFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    defaultValues: {
      kodeSurat: entry.kodeSurat,
      alamatPenerima: entry.alamatPenerima,
      tanggal: entry.tanggal,
      perihal: entry.perihal,
      nomorSurat: entry.nomorSurat,
      requestBy: entry.requestBy,
      linkFile: entry.linkFile
    }
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      await updateDoc(doc(db, "outgoingMail", entry.id), data);
      toast({
        title: "Surat keluar berhasil diperbarui",
        description: "Data surat keluar telah diperbarui dalam sistem",
      });
      onSuccess();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Gagal memperbarui surat keluar",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <OutgoingMailFields form={form} />
        <FormActions isSubmitting={isSubmitting} onCancel={onCancel} />
      </form>
    </Form>
  );
};

export default EditOutgoingMailForm;
