import { IncomingMail } from "@/types/admin";
import { format } from "date-fns";

interface DispositionPreviewProps {
  mail: IncomingMail;
}

const DispositionPreview = ({ mail }: DispositionPreviewProps) => {
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
        <div className="font-bold text-xl">LEMBAR DISPOSISI</div>
      </div>

      <div className="border-t border-black mt-2 pt-2">
        <div className="mb-2">Perhatian: Dilarang memisahkan sehelai surat pun yang digabung dalam berkas ini</div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="mb-2 flex items-center">
              Nomor Surat<span className="ml-2">:</span>
              <span className="inline-block flex-grow ml-2">{mail.nomorSurat}</span>
            </div>
            <div className="mb-2 flex items-center">
              Tanggal Surat<span className="ml-2">:</span>
              <span className="inline-block flex-grow ml-2">
                {format(new Date(mail.tanggalSurat), "dd/MM/yyyy")}
              </span>
            </div>
            <div className="mb-2 flex items-center">
              Lampiran<span className="ml-2">:</span>
              <span className="inline-block flex-grow ml-2">-</span>
            </div>
            <div className="mb-2 flex items-center">
              Diterima Tanggal<span className="ml-2">:</span>
              <span className="inline-block flex-grow ml-2">
                {format(new Date(mail.tanggalTerima), "dd/MM/yyyy")}
              </span>
            </div>
            <div className="mb-2 flex items-center">
              No Agenda<span className="ml-2">:</span>
              <span className="inline-block flex-grow ml-2">{mail.nomorAgenda}</span>
            </div>
          </div>
          <div>
            <div className="mb-2">
              Status: <input type="checkbox" /> Asli <input type="checkbox" /> Tembusan
            </div>
            <div className="mb-2">
              Sifat: <input type="checkbox" /> Sangat Segera <input type="checkbox" /> Segera{" "}
              <input type="checkbox" /> Penting
            </div>
          </div>
        </div>
        <div className="mb-2 flex items-center">
          Perihal<span className="ml-2">:</span>
          <span className="inline-block flex-grow ml-2">{mail.perihal}</span>
        </div>
      </div>

      <div className="border-t border-black mt-2 pt-2">
        <div className="grid grid-cols-3 text-center font-bold border-b border-black">
          <div className="border-r border-black">SANGAT RAHASIA</div>
          <div className="border-r border-black">SEGERA</div>
          <div>BIASA</div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-2">
          <div className="border-r border-black pr-2">
            <div className="font-bold mb-2">Disposisi Kepala Kepada:</div>
            <div><input type="checkbox" /> Kepala Tata Usaha</div>
            <div><input type="checkbox" /> Kasi Pendidikan Madrasah</div>
            <div><input type="checkbox" /> Kasi Pendidikan Agama Islam</div>
            <div><input type="checkbox" /> Kasi Penyelenggara Haji dan Umrah</div>
            <div><input type="checkbox" /> Kasi Bimas Islam</div>
            <div><input type="checkbox" /> Kasi Pendidikan Diniyah dan Pontren</div>
            <div><input type="checkbox" /> Penyelenggara ZAWA</div>
            <div><input type="checkbox" /> Penyelenggara Kristen</div>
          </div>
          <div className="border-r border-black pr-2">
            <div className="font-bold mb-2">Petunjuk:</div>
            <div><input type="checkbox" /> Setuju</div>
            <div><input type="checkbox" /> Tolak</div>
            <div><input type="checkbox" /> Teliti & Pendapat</div>
            <div><input type="checkbox" /> Untuk Diketahui</div>
            <div><input type="checkbox" /> Selesaikan</div>
            <div><input type="checkbox" /> Sesuai Catatan</div>
            <div><input type="checkbox" /> Untuk Diperhatikan</div>
            <div><input type="checkbox" /> Edaran</div>
          </div>
          <div className="pr-2">
            <div className="font-bold mb-2">Petunjuk:</div>
            <div><input type="checkbox" /> Jawab</div>
            <div><input type="checkbox" /> Perbaiki</div>
            <div><input type="checkbox" /> Bicarakan dengan saya</div>
            <div><input type="checkbox" /> Bicarakan bersama</div>
            <div><input type="checkbox" /> Ingatkan</div>
            <div><input type="checkbox" /> Simpan</div>
            <div><input type="checkbox" /> Disiapkan</div>
            <div><input type="checkbox" /> Harap dihadiri/ wakili</div>
          </div>
        </div>
      </div>

      <div className="border-t border-black mt-2 pt-2">
        <div className="font-bold mb-2">CATATAN KEPALA:</div>
        <div className="border-b border-black mb-2">&nbsp;</div>
        <div className="border-b border-black mb-2">&nbsp;</div>
        <div className="border-b border-black mb-2">&nbsp;</div>
      </div>

      <div className="border-t border-black mt-2 pt-2">
        <div className="grid grid-cols-2 gap-4">
          <div className="pr-2">
            <div className="mb-2 flex items-center">
              Tanggal Penyelesaian<span className="ml-2">:</span>
              <span className="inline-block flex-grow ml-2">&nbsp;</span>
            </div>
            <div className="mb-2 flex items-center">
              Penerima<span className="ml-2">:</span>
              <span className="inline-block flex-grow ml-2">&nbsp;</span>
            </div>
          </div>
          <div className="pr-2">
            <div className="mb-2 flex items-center">
              Diajukan kembali tgl<span className="ml-2">:</span>
              <span className="inline-block flex-grow ml-2">&nbsp;</span>
            </div>
            <div className="mb-2 flex items-center">
              Penerima<span className="ml-2">:</span>
              <span className="inline-block flex-grow ml-2">&nbsp;</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DispositionPreview;
