import { ServiceCategory } from "@/types/layanan";

export const serviceCategories: ServiceCategory[] = [
  {
    id: "kepegawaian",
    title: "1. Kepegawaian",
    services: [
      {
        name: "Permohonan Cuti Pegawai",
        requirements: "Surat Permohonan Permintaan Cuti",
        processingTime: "1 Hari sejak berkas lengkap diterima",
        formLink: "",
        section: "Kepegawaian"
      },
      {
        name: "Permohonan Rekomendasi Mutasi Masuk",
        requirements: "1. Surat Permohonan yang memuat alasan pindah wilayah kerja\n2. Surat persetujuan pindah dari pimpinan Satker Asal.\n3. Surat pernyataan persetujuan pindah dari unit penerima\n4. SKP dan PPKP 2 Tahun terakhir\n5. KARPEG/KPE\n6. Ijazah terakhir\n7. Sertifikat guru profesional untuk guru\n8. SK Kenaikan pangkat terakhir\n9. SK CPNS\n10. SK PNS",
        processingTime: "3 Hari sejak berkas lengkap diterima",
        formLink: ""
      }
    ]
  },
  {
    id: "pontren",
    title: "2. Seksi Pendidikan Diniyah dan Pondok Pesantren (PONTREN)",
    services: [
      {
        name: "Permohonan Pendaftaran Lembaga pendidikan Al-Quran (LPQ)",
        requirements: "- Surat Permohonan Pendaftaran\n- Profil Lembaga\n- Akta notaris penyelenggara\n- SK Struktur organisasi penyelenggara\n- KTP pengurus LPQ (Kepala, Guru, Tendik)\n- Daftar santri minimal 15 santri\n- Daftar ustadz/ustadzah\n- Kurikulum dan Jadwal pembelajaran\n- Surat keterangan domisili dari desa\n- Surat rekomendasi dari KUA\n- Memiliki sarana dan prasarana pembelajaran\n- Foto kegiatan",
        processingTime: "7 hari kerja",
        formLink: "#"
      },
      {
        name: "Permohonan Pendaftaran Madrasah Diniyah Takmiliyah",
        requirements: "-Surat permohonan pendaftaran MDT\n\n-Daftar Pengelola, terdiri dari;\na. Kepala Madrasah Diniyah Takmiliyah\nb. Guru, Sekurang-kurangnya 2 (dua) orang\nc. Tenaga administrasi, sekurang-kurangnya 1(satu) orang\n\n-Daftar santri sekurang-kurangnya 15 (lima belas) orang;\n\n- Bersedia dan sanggup menyelenggarakan dan mengelola Madrasah Diniyah Takmiliyah dibuktikan dengan surat pernyataan dari Kepala Madrasah Diniyah Takmiliyah;\n\n- Surat keterangan domisili dari pemerintah desa/kelurahan\n\n- Surat rekomendasi dari KUA (Kantor Urusan Agama) setempat\n\n- Jadwal pembelajaran MDT minimal 18 jam/minggu dengan materi pokok :\na. Bahasa Arab\nb. Fiqh ibadah\nc. Al Quran dan Al Hadits\nd. Aqidah Akhlak\ne. Tarikh Islam\n\n- Susunan Pengurus MDT\n\n- KTP pengurus harian\n\n- Tersedia sarana pembelajaran (ruangan dan alat pembelajaran)\n\n- Akta notaris (tidak wajib)\n\n- NPWP (tidak wajib)\n\n- Foto kegiatan",
        processingTime: "1 Hari sejak berkas lengkap diterima",
        formLink: "#"
      },
      {
        name: "Permohonan Penerbitan Kembali Piagam Lembaga Pendidikan Al Qur'an (LPQ) dan Madrasah Diniyah Takmiliyah",
        requirements: "Surat Keterangan Kehilangan dari Kepolisian",
        processingTime: "1 Hari sejak berkas lengkap diterima",
        formLink: "#"
      },
      {
        name: "Permohonan Rekomendasi Bantuan Pesantren, Madrasah Diniyah Takmiliyah dan Lembaga Pendidikan Al Quran (LPQ)",
        requirements: "- Surat Permohonan Rekomendasi Bantuan untuk lembaga Pondok Pesantren, Madin dan LPQ\n- Proposal Permohonan Bantuan untuk lembaga Pondok Pesantren, Madin dan LPQ Lengkap\n- NPWP Lembaga/Yayasan.\n- Akta Yayasan/Lembaga dari Notaris atau SK Kemenkuham\n- Piagam Izin Operasional Pondok Pesantren, Madin dan LPQ yang telah terdaftar dan aktif\n- Foto/screenshot Data Pondok Pesantren, Madin dan LPQ telah aktif pada Aplikasi Data EMIS.\n- Surat Pernyataan Keaslian Dokumen.",
        processingTime: "1 Hari sejak berkas lengkap diterima",
        formLink: "#"
      },
      {
        name: "Permohonan Rekomendasi Pencairan dana BOS Program Kesetaraan Pondok Pesantren Salafiyah (PKPPS)",
        requirements: "Persyaratan akan ditampilkan disini",
        processingTime: "7 hari kerja",
        formLink: "#"
      },
      {
        name: "Permohonan Rekomendasi Pendaftaran Keberadaan Pesantren",
        requirements: "Persyaratan akan ditampilkan disini",
        processingTime: "7 hari kerja",
        formLink: "#"
      },
      {
        name: "Perubahan Data Pondok Pesantren",
        requirements: "Persyaratan akan ditampilkan disini",
        processingTime: "7 hari kerja",
        formLink: "#"
      },
      {
        name: "Rekomendasi Perpanjangan ITAS,Izin RPTKA, RPTKA Non-DKPTKA",
        requirements: "Persyaratan akan ditampilkan disini",
        processingTime: "7 hari kerja",
        formLink: "#"
      },
      {
        name: "Surat Rekomendasi Pindah Sekolah ( PKPPS/ SPM/ PDF) Kemenag",
        requirements: "Persyaratan akan ditampilkan disini",
        processingTime: "7 hari kerja",
        formLink: "#"
      }
    ]
  },
  {
    id: "phu",
    title: "4. Seksi Penyelenggara Haji dan Umrah (PHU)",
    services: [
      {
        name: "Pelimpahan Nomor Porsi Haji (Karena Meninggal Dunia dan Karena Sakit Permanen)",
        requirements: "Persyaratan akan ditampilkan disini",
        processingTime: "7 hari kerja",
        formLink: "#"
      },
      {
        name: "Penggabungan Mahram",
        requirements: "Persyaratan akan ditampilkan disini",
        processingTime: "7 hari kerja",
        formLink: "#"
      },
      {
        name: "Permohonan Rekomendasi Pembukaan Kantor Cabang PPIU",
        requirements: "Persyaratan akan ditampilkan disini",
        processingTime: "7 hari kerja",
        formLink: "#"
      }
    ]
  },
  {
    id: "bimas",
    title: "5. Seksi Bimbingan Masyarakat Islam (BIMAS)",
    services: [
      {
        name: "Penerbitan Surat Keterangan Terdaftar (SKT) Majelis Taklim",
        requirements: "Persyaratan akan ditampilkan disini",
        processingTime: "7 hari kerja",
        formLink: "#"
      },
      {
        name: "Pengukuran Arah Kiblat",
        requirements: "Persyaratan akan ditampilkan disini",
        processingTime: "7 hari kerja",
        formLink: "#"
      },
      {
        name: "Permohonan Data Pernikahan",
        requirements: "Persyaratan akan ditampilkan disini",
        processingTime: "7 hari kerja",
        formLink: "#"
      },
      {
        name: "Permohonan Data Tempat Ibadah Muslim",
        requirements: "Persyaratan akan ditampilkan disini",
        processingTime: "7 hari kerja",
        formLink: "#"
      },
      {
        name: "Permohonan Pembaca Doa",
        requirements: "Persyaratan akan ditampilkan disini",
        processingTime: "7 hari kerja",
        formLink: "#"
      },
      {
        name: "Permohonan Penugasan Wali Hakim",
        requirements: "Persyaratan akan ditampilkan disini",
        processingTime: "7 hari kerja",
        formLink: "#"
      },
      {
        name: "Permohonan Perpanjangan Penerbitan Surat Keterangan Terdaftar Majelis Taklim",
        requirements: "Persyaratan akan ditampilkan disini",
        processingTime: "7 hari kerja",
        formLink: "#"
      },
      {
        name: "Permohonan Rekomendasi Bantuan Masjid atau Mushola",
        requirements: "Persyaratan akan ditampilkan disini",
        processingTime: "7 hari kerja",
        formLink: "#"
      },
      {
        name: "Permohonan Rekomendasi Pengajuan Bantuan Majelis Taklim",
        requirements: "Persyaratan akan ditampilkan disini",
        processingTime: "7 hari kerja",
        formLink: "#"
      },
      {
        name: "Permohonan Rohaniawan",
        requirements: "Persyaratan akan ditampilkan disini",
        processingTime: "7 hari kerja",
        formLink: "#"
      },
      {
        name: "Surat Keterangan Pendaftaran No ID Nasional Masjid dan Mushalla",
        requirements: "Persyaratan akan ditampilkan disini",
        processingTime: "7 hari kerja",
        formLink: "#"
      }
    ]
  },
  {
    id: "pais",
    title: "6. Seksi Pendidikan Agama Islam (PAIS)",
    services: [
      {
        name: "Pemberkasan Pengawas PAI",
        requirements: "Persyaratan akan ditampilkan disini",
        processingTime: "7 hari kerja",
        formLink: "#"
      },
      {
        name: "Pemberksaan TPG Non ASN",
        requirements: "Persyaratan akan ditampilkan disini",
        processingTime: "7 hari kerja",
        formLink: "#"
      },
      {
        name: "Pemberksaan TPG PNS",
        requirements: "Persyaratan akan ditampilkan disini",
        processingTime: "7 hari kerja",
        formLink: "#"
      },
      {
        name: "Pemberksaan TPG PPPK",
        requirements: "Persyaratan akan ditampilkan disini",
        processingTime: "7 hari kerja",
        formLink: "#"
      }
    ]
  },
  {
    id: "dikmad",
    title: "7. Seksi Pendidikan Madrasah (DIKMAD)",
    services: [
      {
        name: "Pemberkasan Tunjangan Profesi Guru Madrasah",
        requirements: "Persyaratan akan ditampilkan disini",
        processingTime: "7 hari kerja",
        formLink: "#"
      },
      {
        name: "Pengajuan Berkas Tukin Guru PNS",
        requirements: "Persyaratan akan ditampilkan disini",
        processingTime: "7 hari kerja",
        formLink: "#"
      },
      {
        name: "Permohonan Data",
        requirements: "Persyaratan akan ditampilkan disini",
        processingTime: "7 hari kerja",
        formLink: "#"
      },
      {
        name: "Permohonan Rekomendasi Bantuan",
        requirements: "Persyaratan akan ditampilkan disini",
        processingTime: "7 hari kerja",
        formLink: "#"
      },
      {
        name: "Permohonan Rekomendasi Penggunaan Honor BOS di atas 60%",
        requirements: "Persyaratan akan ditampilkan disini",
        processingTime: "7 hari kerja",
        formLink: "#"
      },
      {
        name: "Permohonan Rekomendasi Pindah Sekolah Jenjang MI dan MTS",
        requirements: "Persyaratan akan ditampilkan disini",
        processingTime: "7 hari kerja",
        formLink: "#"
      },
      {
        name: "Permohonan Rekomendasi SK Kelembagaan Madrasah",
        requirements: "Persyaratan akan ditampilkan disini",
        processingTime: "7 hari kerja",
        formLink: "#"
      }
    ]
  },
  {
    id: "tata-usaha",
    title: "8. Sub Bagian Tata Usaha - Kehumasan",
    services: [
      {
        name: "Permohonan Rekomendasi Izin Kegiatan Keagamaan",
        requirements: "Persyaratan akan ditampilkan disini",
        processingTime: "7 hari kerja",
        formLink: "#"
      },
      {
        name: "Permohonan Rekomendasi Pendaftaran Ormas Keagamaan",
        requirements: "Persyaratan akan ditampilkan disini",
        processingTime: "7 hari kerja",
        formLink: "#"
      },
      {
        name: "Permohonan Rekomendasi Penerbitan Izin Penelitian",
        requirements: "Persyaratan akan ditampilkan disini",
        processingTime: "7 hari kerja",
        formLink: "#"
      },
      {
        name: "Permohonan Rekomendasi Penerbitan Izin PKL/PPL/Magang",
        requirements: "Persyaratan akan ditampilkan disini",
        processingTime: "7 hari kerja",
        formLink: "#"
      },
      {
        name: "Rekomendasi Bantuan Pembangunan Rumah Ibadah/Sosial Keagamaan",
        requirements: "Persyaratan akan ditampilkan disini",
        processingTime: "7 hari kerja",
        formLink: "#"
      },
      {
        name: "Surat Masuk",
        requirements: "Persyaratan akan ditampilkan disini",
        processingTime: "7 hari kerja",
        formLink: "#"
      }
    ]
  }
];
