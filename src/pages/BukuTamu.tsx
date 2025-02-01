import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  nama: z.string().min(2, "Nama minimal 2 karakter"),
  alamat: z.string().min(5, "Alamat minimal 5 karakter"),
  tujuan: z.string(),
  detailLayanan: z.string().min(5, "Detail layanan minimal 5 karakter"),
  nomorHp: z.string().min(10, "Nomor HP minimal 10 digit"),
});

const BukuTamu = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: "",
      alamat: "",
      tujuan: "",
      detailLayanan: "",
      nomorHp: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const docRef = await addDoc(collection(db, "guestBook"), {
        ...values,
        tanggal: new Date().toISOString(),
      });
      
      toast({
        title: "Berhasil",
        description: "Data tamu berhasil disimpan",
      });
      
      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Gagal menyimpan data tamu",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Buku Tamu</h1>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="nama"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Lengkap</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan nama lengkap" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="alamat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alamat</FormLabel>
                <FormControl>
                  <Textarea placeholder="Masukkan alamat lengkap" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tujuan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tujuan</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih tujuan" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="HAJI DAN UMRAH">HAJI DAN UMRAH</SelectItem>
                    <SelectItem value="SETJEN">SETJEN</SelectItem>
                    <SelectItem value="MADRASAH">MADRASAH</SelectItem>
                    <SelectItem value="PAI">PAI</SelectItem>
                    <SelectItem value="PD PONTREN">PD PONTREN</SelectItem>
                    <SelectItem value="ZAKAT WAKAF">ZAKAT WAKAF</SelectItem>
                    <SelectItem value="BIMAS ISLAM">BIMAS ISLAM</SelectItem>
                    <SelectItem value="PRIBADI">PRIBADI</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="detailLayanan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Detail Layanan</FormLabel>
                <FormControl>
                  <Textarea placeholder="Masukkan detail layanan yang dibutuhkan" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nomorHp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nomor HP</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="Masukkan nomor HP" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Kirim
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default BukuTamu;
