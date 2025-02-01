import { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ServiceRequest } from "@/types/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const Track = () => {
  const [trackingCode, setTrackingCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [serviceRequest, setServiceRequest] = useState<ServiceRequest | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setServiceRequest(null);

    try {
      const serviceRequestsRef = collection(db, "serviceRequests");
      const q = query(
        serviceRequestsRef,
        where("noRegistrasi", "==", trackingCode)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        toast({
          variant: "destructive",
          title: "Tidak ditemukan",
          description: "Nomor registrasi tidak ditemukan",
        });
        return;
      }

      const doc = querySnapshot.docs[0];
      setServiceRequest({ id: doc.id, ...doc.data() } as ServiceRequest);
    } catch (error) {
      console.error("Error fetching service request:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Terjadi kesalahan saat mencari data",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadgeColor = (status: ServiceRequest["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: ServiceRequest["status"]) => {
    switch (status) {
      case "pending":
        return "Menunggu";
      case "processing":
        return "Diproses";
      case "completed":
        return "Selesai";
      case "rejected":
        return "Ditolak";
      default:
        return status;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Track Layanan</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl">Lacak Status Layanan</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Masukkan Nomor Registrasi"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Mencari...
                </>
              ) : (
                "Lacak"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {serviceRequest && (
        <Card>
          <CardHeader>
            <CardTitle>Detail Layanan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Nomor Registrasi</p>
                <p className="font-medium">{serviceRequest.noRegistrasi}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Tanggal</p>
                <p className="font-medium">{serviceRequest.tanggal}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Nama Pemohon</p>
                <p className="font-medium">{serviceRequest.namaLengkap}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{serviceRequest.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Seksi</p>
                <p className="font-medium">{serviceRequest.seksi}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Layanan</p>
                <p className="font-medium">{serviceRequest.layanan}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-500">Status</p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm ${getStatusBadgeColor(
                    serviceRequest.status
                  )}`}
                >
                  {getStatusText(serviceRequest.status)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Track;
