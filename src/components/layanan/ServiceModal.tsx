import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ServiceItem } from "@/types/layanan";
import { useNavigate } from "react-router-dom";
import { auth, db } from "@/lib/firebase";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { useToast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";
import LoginModal from "../LoginModal";
import RegisterModal from "../RegisterModal";

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceItem | null;
}

const ServiceModal = ({ isOpen, onClose, service }: ServiceModalProps) => {
  const form = useForm();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      }
    };
    fetchUserData();
  }, []);

  const handleSubmit = async (data: any) => {
    if (!auth.currentUser) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Silakan login terlebih dahulu untuk mengajukan permohonan",
      });
      return;
    }

    try {
      const serviceRequest = {
        userId: auth.currentUser.uid,
        userEmail: auth.currentUser.email,
        namaLengkap: userData?.name || "",
        email: userData?.email || "",
        nomorHp: userData?.whatsapp || "",
        tanggal: new Date().toISOString(),
        noRegistrasi: `REG-${Date.now()}`,
        seksi: service?.section || "",
        tipe: "Online",
        layanan: service?.name || "",
        status: "pending",
        formLink: data.formLink,
        link: data.formLink,
        pic: "",
        createdAt: new Date().toISOString(),
      };

      await addDoc(collection(db, "serviceRequests"), serviceRequest);

      toast({
        title: "Sukses",
        description: "Permohonan layanan berhasil dikirim",
      });
      onClose();
      navigate("/permohonan");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Gagal mengirim permohonan layanan",
      });
    }
  };

  if (!service) return null;

  const renderAuthenticatedContent = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
        <h3 className="font-semibold text-primary mb-2 text-sm sm:text-base">Persyaratan:</h3>
        <p className="text-gray-700 text-xs sm:text-sm whitespace-pre-line">{service.requirements}</p>
      </div>
      <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
        <h3 className="font-semibold text-primary mb-2 text-sm sm:text-base">Waktu Pengerjaan:</h3>
        <p className="text-gray-700 text-xs sm:text-sm">{service.processingTime}</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="formLink"
            render={({ field }) => (
              <FormItem>
                <h3 className="font-semibold text-primary mb-2 text-sm sm:text-base">
                  Formulir Permohonan:
                </h3>
                <FormControl>
                  <Textarea
                    placeholder="Masukkan link dokumen Google Drive/OneDrive/Dropbox"
                    className="resize-none min-h-[80px] text-sm"
                    {...field}
                  />
                </FormControl>
                <p className="text-xs text-gray-500 mt-1">
                  *Pastikan link/folder sudah dishare public
                </p>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-white"
          >
            Kirim Permohonan
          </Button>
        </form>
      </Form>
    </div>
  );

  const renderUnauthenticatedContent = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
        <h3 className="font-semibold text-primary mb-2 text-sm sm:text-base">Persyaratan:</h3>
        <p className="text-gray-700 text-xs sm:text-sm whitespace-pre-line">{service.requirements}</p>
      </div>
      <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
        <h3 className="font-semibold text-primary mb-2 text-sm sm:text-base">Waktu Pengerjaan:</h3>
        <p className="text-gray-700 text-xs sm:text-sm">{service.processingTime}</p>
      </div>
      <div className="space-y-4">
        <p className="text-center text-gray-600 text-sm">
          Silakan login atau buat akun untuk mengajukan permohonan layanan
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Button
            className="flex-1 bg-primary hover:bg-primary/90 text-white"
            onClick={() => setShowLoginModal(true)}
          >
            Login
          </Button>
          <Button
            className="flex-1 bg-secondary hover:bg-secondary/90 text-primary"
            onClick={() => setShowRegisterModal(true)}
          >
            Buat Akun
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto bg-white mx-4">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl font-bold text-primary pr-6">
              {service.name}
            </DialogTitle>
            <DialogDescription className="text-sm">
              {auth.currentUser
                ? "Silakan lengkapi formulir permohonan di bawah ini"
                : "Informasi layanan"}
            </DialogDescription>
          </DialogHeader>
          {auth.currentUser
            ? renderAuthenticatedContent()
            : renderUnauthenticatedContent()}
        </DialogContent>
      </Dialog>

      {showLoginModal && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          type="pemohon"
        />
      )}
      {showRegisterModal && (
        <RegisterModal
          isOpen={showRegisterModal}
          onClose={() => setShowRegisterModal(false)}
        />
      )}
    </>
  );
};

export default ServiceModal;