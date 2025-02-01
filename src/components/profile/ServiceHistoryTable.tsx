import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { auth, db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { format } from "date-fns";
import { ServiceRequest } from "@/types/admin";

const ServiceHistoryTable = () => {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);

  useEffect(() => {
    const fetchRequests = async () => {
      if (!auth.currentUser) return;

      const q = query(
        collection(db, "serviceRequests"),
        where("userId", "==", auth.currentUser.uid)
      );

      const querySnapshot = await getDocs(q);
      const requestsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ServiceRequest[];

      setRequests(requestsData);
    };

    fetchRequests();
  }, []);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Tanggal</TableHead>
            <TableHead>No Registrasi</TableHead>
            <TableHead>Seksi</TableHead>
            <TableHead>PIC</TableHead>
            <TableHead>Layanan</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request, index) => (
            <TableRow key={request.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{format(new Date(request.tanggal), "dd/MM/yyyy")}</TableCell>
              <TableCell>{request.noRegistrasi}</TableCell>
              <TableCell>{request.seksi}</TableCell>
              <TableCell>{request.pic}</TableCell>
              <TableCell>{request.layanan}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-sm ${
                  request.status === "completed" ? "bg-green-100 text-green-800" :
                  request.status === "processing" ? "bg-blue-100 text-blue-800" :
                  request.status === "rejected" ? "bg-red-100 text-red-800" :
                  "bg-yellow-100 text-yellow-800"
                }`}>
                  {request.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ServiceHistoryTable;
