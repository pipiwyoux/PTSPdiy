import { format } from "date-fns";
import { OutgoingMail, IncomingMail, GuestBookEntry, Appointment, ServiceRequest } from "@/types/admin";

interface PrintAllReportsPreviewProps {
  entries: (OutgoingMail | IncomingMail | GuestBookEntry | Appointment | ServiceRequest)[];
  reportType: "outgoingMail" | "incomingMail" | "guestBook" | "appointments" | "serviceRequests";
}

const PrintAllReportsPreview = ({ entries, reportType }: PrintAllReportsPreviewProps) => {
  return (
    <div className="print-container border border-black p-4 text-sm bg-white">
      <div className="text-center">
        <div className="flex justify-center items-center mb-2">
          <img
            alt="Logo Kementerian Agama RI"
            className="mr-4"
            height={70}
            width={70}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Kementerian_Agama_new_logo.png/668px-Kementerian_Agama_new_logo.png"
          />
          <div className="text-sm">
            <div className="font-bold text-lg">KEMENTERIAN AGAMA REPUBLIK INDONESIA</div>
            <div className="text-base">KANTOR KEMENTERIAN AGAMA KOTA GORONTALO</div>
            <div className="text-base">Jalan Arif Rahman Hakim No. 22 Kota Gorontalo Telepon/Whatsupp 081143302000</div>
            <div className="text-base">Website : https://gorontalokota.kemenag.go.id e-mail : gorontalokota@kemenag.go.id</div>
          </div>
        </div>
        <div className="font-bold text-xl">LAPORAN {reportType === "outgoingMail" ? "SURAT KELUAR" : reportType === "incomingMail" ? "SURAT MASUK" : reportType === "guestBook" ? "BUKU TAMU" : reportType === "appointments" ? "JANJI TEMU" : "PERMOHONAN LAYANAN"}</div>
      </div>

      <div className="border-t border-black mt-2 pt-2">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-black">
              <th className="p-2 border-r border-black">No</th>
              {reportType === "outgoingMail" && (
                <>
                  <th className="p-2 border-r border-black">Kode Surat</th>
                  <th className="p-2 border-r border-black">Alamat Penerima</th>
                  <th className="p-2 border-r border-black">Tanggal</th>
                  <th className="p-2 border-r border-black">Perihal</th>
                  <th className="p-2 border-r border-black">Nomor Surat</th>
                  <th className="p-2 border-r border-black">Request By</th>
                </>
              )}
              {reportType === "incomingMail" && (
                <>
                  <th className="p-2 border-r border-black">Tanggal Terima</th>
                  <th className="p-2 border-r border-black">Alamat Pengirim</th>
                  <th className="p-2 border-r border-black">Tanggal Surat</th>
                  <th className="p-2 border-r border-black">Nomor Agenda</th>
                  <th className="p-2 border-r border-black">Perihal</th>
                  <th className="p-2 border-r border-black">Nomor Surat</th>
                  <th className="p-2 border-r border-black">PIC</th>
                </>
              )}
              {reportType === "guestBook" && (
                <>
                  <th className="p-2 border-r border-black">Tanggal</th>
                  <th className="p-2 border-r border-black">Nama</th>
                  <th className="p-2 border-r border-black">Alamat</th>
                  <th className="p-2 border-r border-black">Tujuan</th>
                  <th className="p-2 border-r border-black">Detail Layanan</th>
                  <th className="p-2 border-r border-black">Nomor HP</th>
                  <th className="p-2 border-r border-black">PIC</th>
                  <th className="p-2 border-r border-black">Status</th>
                </>
              )}
              {reportType === "appointments" && (
                <>
                  <th className="p-2 border-r border-black">Tanggal</th>
                  <th className="p-2 border-r border-black">Jam</th>
                  <th className="p-2 border-r border-black">Nama Tamu</th>
                  <th className="p-2 border-r border-black">Email</th>
                  <th className="p-2 border-r border-black">Instansi</th>
                  <th className="p-2 border-r border-black">Bertemu</th>
                  <th className="p-2 border-r border-black">Status</th>
                </>
              )}
              {reportType === "serviceRequests" && (
                <>
                  <th className="p-2 border-r border-black">Tanggal</th>
                  <th className="p-2 border-r border-black">No Registrasi</th>
                  <th className="p-2 border-r border-black">Nama Pemohon</th>
                  <th className="p-2 border-r border-black">Email</th>
                  <th className="p-2 border-r border-black">Seksi</th>
                  <th className="p-2 border-r border-black">PIC</th>
                  <th className="p-2 border-r border-black">Layanan</th>
                  <th className="p-2 border-r border-black">Status</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => (
              <tr key={entry.id} className="border-b border-black">
                <td className="p-2 border-r border-black text-center">{index + 1}</td>
                {reportType === "outgoingMail" && (
                  <>
                    <td className="p-2 border-r border-black">{entry.kodeSurat}</td>
                    <td className="p-2 border-r border-black">{entry.alamatPenerima}</td>
                    <td className="p-2 border-r border-black text-center">{format(new Date(entry.tanggal), "dd/MM/yyyy")}</td>
                    <td className="p-2 border-r border-black">{entry.perihal}</td>
                    <td className="p-2 border-r border-black">{entry.nomorSurat}</td>
                    <td className="p-2 border-r border-black">{entry.requestBy}</td>
                  </>
                )}
                {reportType === "incomingMail" && (
                  <>
                    <td className="p-2 border-r border-black text-center">{format(new Date(entry.tanggalTerima), "dd/MM/yyyy")}</td>
                    <td className="p-2 border-r border-black">{entry.alamatPengirim}</td>
                    <td className="p-2 border-r border-black text-center">{format(new Date(entry.tanggalSurat), "dd/MM/yyyy")}</td>
                    <td className="p-2 border-r border-black">{entry.nomorAgenda}</td>
                    <td className="p-2 border-r border-black">{entry.perihal}</td>
                    <td className="p-2 border-r border-black">{entry.nomorSurat}</td>
                    <td className="p-2 border-r border-black">{entry.pic}</td>
                  </>
                )}
                {reportType === "guestBook" && (
                  <>
                    <td className="p-2 border-r border-black text-center">{format(new Date(entry.tanggal), "dd/MM/yyyy")}</td>
                    <td className="p-2 border-r border-black">{entry.nama}</td>
                    <td className="p-2 border-r border-black">{entry.alamat}</td>
                    <td className="p-2 border-r border-black">{entry.tujuan}</td>
                    <td className="p-2 border-r border-black">{entry.detailLayanan}</td>
                    <td className="p-2 border-r border-black">{entry.nomorHp}</td>
                    <td className="p-2 border-r border-black">{entry.pic}</td>
                    <td className="p-2 border-r border-black">{entry.status}</td>
                  </>
                )}
                {reportType === "appointments" && (
                  <>
                    <td className="p-2 border-r border-black text-center">{format(new Date(entry.date), "dd/MM/yyyy")}</td>
                    <td className="p-2 border-r border-black">{entry.time}</td>
                    <td className="p-2 border-r border-black">{entry.name}</td>
                    <td className="p-2 border-r border-black">{entry.email}</td>
                    <td className="p-2 border-r border-black">{entry.institution}</td>
                    <td className="p-2 border-r border-black">{entry.meetWith}</td>
                    <td className="p-2 border-r border-black">{entry.status}</td>
                  </>
                )}
                {reportType === "serviceRequests" && (
                  <>
                    <td className="p-2 border-r border-black text-center">{format(new Date(entry.tanggal), "dd/MM/yyyy")}</td>
                    <td className="p-2 border-r border-black">{entry.noRegistrasi}</td>
                    <td className="p-2 border-r border-black">{entry.namaLengkap}</td>
                    <td className="p-2 border-r border-black">{entry.email}</td>
                    <td className="p-2 border-r border-black">{entry.seksi}</td>
                    <td className="p-2 border-r border-black">{entry.pic}</td>
                    <td className="p-2 border-r border-black">{entry.layanan}</td>
                    <td className="p-2 border-r border-black">{entry.status}</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PrintAllReportsPreview;
