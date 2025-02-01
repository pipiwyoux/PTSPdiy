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
import { IncomingMail } from "@/types/admin";

type FormData = Omit<IncomingMail, "id">;

const IncomingMailForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const form = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "incomingMail"), data);
      toast({
        title: "Surat masuk berhasil ditambahkan",
        description: "Data surat masuk telah tersimpan dalam sistem",
      });
      form.reset();
      onSuccess();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Gagal menambahkan surat masuk",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const staffMembers = ["ADAM", "NOVAN", "YEYEN", "DELFI"];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="tanggalTerima"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tanggal Terima</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="alamatPengirim"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alamat Pengirim</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tanggalSurat"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tanggal Surat</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nomorAgenda"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nomor Agenda</FormLabel>
              <FormControl>
                <Input {...field} />
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
          name="pic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>PIC</FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="w-full rounded-md border p-2"
                >
                  <option value="">Pilih PIC</option>
                  {staffMembers.map((staff) => (
                    <option key={staff} value={staff}>
                      {staff}
                    </option>
                  ))}
                </select>
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

export default IncomingMailForm;
