import { useState } from "react";
import { useForm } from "react-hook-form";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { OutgoingMail } from "@/types/admin";
import { AlertCircle } from "lucide-react";

type FormData = Omit<OutgoingMail, "id">;

const OutgoingMailForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const form = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "outgoingMail"), data);
      toast({
        title: "Surat keluar berhasil ditambahkan",
        description: "Data surat keluar telah tersimpan dalam sistem",
      });
      form.reset();
      onSuccess();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Gagal menambahkan surat keluar",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const openReferencePopup = () => {
    const width = 800;
    const height = 600;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;
    
    window.open(
      'https://nomorsurat.tolopani.net/',
      'ReferensiKode',
      `width=${width},height=${height},left=${left},top=${top}`
    );
  };

  const departments = ["SETJEN", "BIMAS ISLAM", "MADRASAH", "PAI", "PONTREN", "ZAWA", "PHU"];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="kodeSurat"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel>Kode Surat</FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={openReferencePopup}
                  className="ml-2"
                >
                  <AlertCircle className="mr-2 h-4 w-4" />
                  Referensi Kode
                </Button>
              </div>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="alamatPenerima"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alamat Penerima</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tanggal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tanggal</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="perihal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Perihal</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nomorSurat"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nomor Surat</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="requestBy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Request By</FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="w-full rounded-md border p-2"
                >
                  <option value="">Pilih Department</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="linkFile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link File (Optional)</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Menyimpan..." : "Simpan"}
        </Button>
      </form>
    </Form>
  );
};

export default OutgoingMailForm;
