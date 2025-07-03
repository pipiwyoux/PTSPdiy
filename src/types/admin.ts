export interface Appointment {
  id: string;
  date: string;
  time: string;
  name: string;
  email: string;
  whatsapp: string;
  institution: string;
  meetWith: string;
  purpose: string;
  status: "pending" | "approved" | "rejected";
}

export interface ServiceRequest {
  id: string;
  userId: string;
  userEmail: string;
  namaLengkap: string;
  email: string;
  nomorHp: string;
  tanggal: string;
  noRegistrasi: string;
  seksi: string;
  layanan: string;
  link: string;
  pic: string;
  status: "pending" | "processing" | "completed" | "rejected";
}

export interface GuestBookEntry {
  id: string;
  nama: string;
  alamat: string;
  tujuan: string;
  nomorHp: string;
  tanggal: string;
  detailLayanan?: string;
  pic?: string;
  status?: "pending" | "processing" | "completed" | "rejected";
}

export interface IncomingMail {
  id: string;
  tanggalTerima: string;
  alamatPengirim: string;
  tanggalSurat: string;
  nomorAgenda: string;
  perihal: string;
  nomorSurat: string;
  pic: string;
}

export interface OutgoingMail {
  id: string;
  kodeSurat: string;
  alamatPenerima: string;
  tanggal: string;
  perihal: string;
  nomorSurat: string;
  requestBy: "SETJEN" | "BIMAS ISLAM" | "MADRASAH" | "PAI" | "PONTREN" | "ZAWA" | "PHU";
  fileSurat?: File;
  linkFile?: string;
}