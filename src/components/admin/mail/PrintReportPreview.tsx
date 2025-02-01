import { OutgoingMail } from "@/types/admin";
import { format } from "date-fns";

interface PrintReportPreviewProps {
  entries: OutgoingMail[];
}

const PrintReportPreview = ({ entries }: PrintReportPreviewProps) => {
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
        <div className="font-bold text-xl">LAPORAN SURAT KELUAR</div>
      </div>

      <div className="border-t border-black mt-2 pt-2">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-black">
              <th className="p-2 border-r border-black">No</th>
              <th className="p-2 border-r border-black">Kode Surat</th>
              <th className="p-2 border-r border-black">Alamat Penerima</th>
              <th className="p-2 border-r border-black">Tanggal</th>
              <th className="p-2 border-r border-black">Perihal</th>
              <th className="p-2 border-r border-black">Nomor Surat</th>
              <th className="p-2 border-r border-black">Request By</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => (
              <tr key={entry.id} className="border-b border-black">
                <td className="p-2 border-r border-black text-center">{index + 1}</td>
                <td className="p-2 border-r border-black">{entry.kodeSurat}</td>
                <td className="p-2 border-r border-black">{entry.alamatPenerima}</td>
                <td className="p-2 border-r border-black text-center">{format(new Date(entry.tanggal), "dd/MM/yyyy")}</td>
                <td className="p-2 border-r border-black">{entry.perihal}</td>
                <td className="p-2 border-r border-black">{entry.nomorSurat}</td>
                <td className="p-2 border-r border-black">{entry.requestBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PrintReportPreview;
