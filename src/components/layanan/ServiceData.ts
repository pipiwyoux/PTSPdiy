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
        requirements: "Persyaratan akan ditampilkan disini",
        processingTime: "7 hari kerja",
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
        requirements: "1. Struktur Organisasi Pesantren\n2. Data Tenaga Pendidik\n3. Data Tenaga Kependidikan\n4. Data santri mukim minimal 15 santri\n5. Data Kurikulum\n6. Data Kitab Kuning\n7. Jadwal pembelajaran pesantren\n8. Asli Formulir Pengajuan Izin Terdaftar Pesantren\n9. Asli Surat Pernyataan Kesanggupan Setia Kepada NKRI\n10. Asli Surat Keterangan Domisili Kelurahan/Desa\n11. Salinan Akta Notaris Yayasan/Lembaga\n12. Salinan SK Kemenkumham Pengesahan Pendirian Badan Hukum yayasan/lembaga\n13. Salinan Nomor Pokok Wajib Pajak (NPWP) yayasan\n14. Salinan Kartu Tanda Penduduk (KTP) pimpinan pesantren\n15. Bukti lulus pesantren pimpinan pesantren\n16. Salinan Bukti Kepemilikan Tanah Milik atau Wakaf\n17. Dokumentasi Papan Nama Pesantren\n18. Dokumentasi Asrama\n19. Doumentasi Masjid/Mushalla\n20. Dokumentasi ruang belajar\n21. Dokumentasi Aktivitas Pembelajaran Kitab Kuning\n22. Dokumentasi Denah Pesantren\n23. Dokumentasi Dapur\n24. Dokumentasi MCK",
        processingTime: "7 hari kerja",
        formLink: "#"
      },
      {
        name: "Perubahan Data Pondok Pesantren",
        requirements: "1. Asli Surat Pernyataan Perbaikan Data SK   dan Piagam Statistik Pesantren yang menyatakan data yang salah serta data yang seharusnya (perbaikan) ditandatangani Pimpinan/Pengasuh Pesantren dan bermaterai 10.000\n2. Asli SK dan Piagam Statistik Pesantren yang akan diperbaiki\n3. Semua berkas hardcopy  ASLI disampaikan ke Seksi PD Pontren",
        processingTime: "1 Hari sejak berkas lengkap diterima",
        formLink: "#"
      },
      {
        name: "Rekomendasi Perpanjangan ITAS,Izin RPTKA, RPTKA Non-DKPTKA",
        requirements: "1. Surat Permohonan Rekomendasi Perpanjangan ITAS,Izin RPTKA, RPTKA Non-DKPTKA\n2. Surat Pernyataan Jaminan dan Sponsor\n3. Fotocopy KTP Sponsor ( berwarna )\n4. Fotocopy Passport (berwarna)\n5. Surat izin tinggal terbatas elektronik dari Imigrasi\n6. Rekomendasi Perpanjangan ITAS,Izin RPTKA, RPTKA Non-DKPTKA  dari Biro Hukum dan Kerjasama Luar 7. Negeri Sekretariat Jenderal Kemenag RI Tahun sebelumnya",
        processingTime: "1 Hari sejak berkas lengkap diterima",
        formLink: "#"
      },
      {
        name: "Surat Rekomendasi Pindah Sekolah ( PKPPS/ SPM/ PDF) Kemenag",
        requirements: "1. Surat Keterangan Pindah Keluar dari lembaga asal ( dicetak dari aplikasi EMIS )\n2. Surat Keterangan dari lembaga penerima\n3. Surat Keterangan Kelakuan Baik dari lembaga Asal\n4. Laporan Hasil Belajar ( Semester terakhir ) Siswa\n5. Kartu Keluarga\n6. Semua Berkas ( 1-5) di scan pdf berurutan",
        processingTime: "1 Hari sejak berkas lengkap diterima",
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
        requirements: "1. Foto copy Salinan Akte Kematian (bagi yg meninggal dunia)\n2. Surat Keterangan Sakit dari Dokter Pemerintah (bagi yg sakit)\n3. Asli bukti setoran awal dan asli SPPH\n4. Asli Surat kuasa pelimpahan porsi\n5. Asli surat pernyataan tanggung jawab mutlak\n6. Foto copy KTP penerima pelimpahan\n7. Foto copy KK Penerima Pelimpahan\n8. Foto copy Akte Lahir Penerima Pelimpahan\n9. Foto copy Ijazah Penerima Pelimpahan\n10. Foto copy KTP Pemberi Kuasa\n11. Foto copy KK Alm/Almh\n12. Foto copy Rek Penerima Pelimpahan (Bank sama dg Rek Alm/Almh)",
        processingTime: "1 Hari sejak berkas lengkap diterima",
        formLink: "#"
      },
      {
        name: "Penggabungan Mahram",
        requirements: "1. Pengajukan  permohonan  ditempel  materai 10.000\n2. Fotokopi KTP\n3. Fotokopi bukti setoran awal bipih\n4. Fotokopi bukti setoran lunas bpih\n5. Fotokopi KTP jamaah yang akan menggabung\n6. Fotokopi bukti setoran awal bipih jamaah yang akan menggabung\n7. Fotokopi bukti hubungan keluarga (pilih salah satu yang sesuai)\n8. Fotokopii akta nikah (jika Status suami istri),\n9. Fotokopi akta lahir dan KK (jika status orang tua/anak kandung)",
        processingTime: "1 Hari sejak berkas lengkap diterima",
        formLink: "#"
      },
      {
        name: "Permohonan Rekomendasi Pembukaan Kantor Cabang PPIU",
        requirements: "1. Surat Permohonan Rekomendasi untuk Pengesahan Kantor Cabang PPIU ditujukan kepada Kepala Kantor Kemenag Kab / Kota yang ditandatangani oleh Pimpinan PPIU dan stampel perusahaan;(Asli)\n2. Salinan akte notaris pembentukan Kantor Cabang;\n3. Salinan keputusan izin operasional PPIU;\n4. Surat Keterangan Domisili Kantor Cabang;\n5. Daftar Riwayat Hidup, Kartu Tanda Penduduk (KTP), dan Nomor Pokok Wajib Pajak (NPWP) pimpinan Kantor Cabang\n6. Susunan pengurus Kantor Cabang yang disahkan oleh Pimpinan PPIU; ()\n7. Surat pernyataan di atas materai tentang integritas dan komitmen penyelenggaraan perjalanan ibadah umrah sesuai format yang ditentukan dalam lampiran III Surat Keputusan Dirjen PHU Nomor 338 Tahun 2018 tentang Pedoman Tata Cara, Persyaratan, dan Pelaporan Pembukaan Kantor Cabang Penyelenggara Perjalanan Ibadah Umrah;",
        processingTime: "1 Hari sejak berkas lengkap diterima",
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
        requirements: "1. Surat Permohonan ditujukan kepada Kepala Kantor Kemenag Kota Gorontalo diketahui oleh lurah\n2. Susunan Pengurus dan fotocopy KTP Pengurus\n3. Daftar nama-nama Jamaah, dan minimal 15 fotocopy KTP Jamaah\n4. Surat Pernyataan Pengurus yang menerangkan bahwa majelis taklim tersebut benar benar ada dan diketahui oleh Lurah setempat\n5. Surat Rekomendasi dari kepala KUA Kecamatan\n6. Surat Keterangan Domisili Sekretariat Majelis Taklim yang dibuat oleh Pengurus dan disahkan oleh pemerintah desa/lurah",
        processingTime: "1 Hari sejak berkas lengkap diterima",
        formLink: "#"
      },
      {
        name: "Pengukuran Arah Kiblat",
        requirements: "1. Surat Permohonan Arah Kiblat\n2. Surat pernyataan Persetujuan dan Belum Pernah Mendapatkan Pengukuran Arah kiblat dari pihak lain.\n3.Denah Lokasi yang akan Diukur Arah Kiblatnya\n4. Surat Pernyataan Keaslian Dokumen.(Di File Pendukung)",
        processingTime: "5 Hari sejak berkas lengkap diterima",
        formLink: "#"
      },
      {
        name: "Permohonan Data Pernikahan",
        requirements: "Surat Permohonan ditujukan kepada kepala Kantor Kementerian Agama Kota Gorontalo",
        processingTime: "1 Hari sejak berkas lengkap diterima",
        formLink: "#"
      },
      {
        name: "Permohonan Data Tempat Ibadah Muslim",
        requirements: "Surat Permohonan ditujukan kepada kepala Kankemenag",
        processingTime: "1 Hari sejak berkas lengkap diterima",
        formLink: "#"
      },
      {
        name: "Permohonan Pembaca Doa",
        requirements: "Surat Permohonan ditujukan kepada kepala Kankemenag",
        processingTime: "1 Hari sejak berkas lengkap diterima",
        formLink: "#"
      },
      {
        name: "Permohonan Penugasan Wali Hakim",
        requirements: "Surat Permohonan wali hakim ditujukan kepada kepala Kantor Kementerian Agama Kota Gorontalo",
        processingTime: "1 Hari sejak berkas lengkap diterima",
        formLink: "#"
      },
      {
        name: "Permohonan Perpanjangan Penerbitan Surat Keterangan Terdaftar Majelis Taklim",
        requirements: "1. Surat permohonan yang ditujukan kepada Kepala Kankemenag. Kota Gorontalo\n2. Surat Keterangan Terdaftar Majelis Taklim lama.",
        processingTime: "1 Hari sejak berkas lengkap diterima",
        formLink: "#"
      },
      {
        name: "Permohonan Rekomendasi Bantuan Masjid atau Mushola",
        requirements: "1. Surat Permohonan Rekomendasi Bantuan yang ditujukan kepada Kepala Kankemenag.\n2. Surat Keterangan Identitas (ID) Nasional Masjid atau Mushola.\n3. Susunan Pengurus Masjid atau Mushola.\n4. Bila Masjid belum ada pembangunan fisiknya dilampiri: Sertifikat wakaf/SHM, bila sudah ada IMB, Susunan Panitia Pembangunan.\n5. Proposal Bantuan yang akan digunakan untuk mengajukan bantuan.",
        processingTime: "1 Hari sejak berkas lengkap diterima",
        formLink: "#"
      },
      {
        name: "Permohonan Rekomendasi Pengajuan Bantuan Majelis Taklim",
        requirements: "1. Surat Permohonan ditujukan kepada kepala kantor kemenag Kota Gorontalo yang diketahui oleh Kepala KUA setempat\n2. Surat Keterangan Terdaftar (SKT) Majelis Taklim\n3. Proposal pengajuan bantuan\n4. Surat Pernyataan Keaslian Dokumen (Di file Pendukung).",
        processingTime: "1 Hari sejak berkas lengkap diterima",
        formLink: "#"
      },
      {
        name: "Permohonan Rohaniawan",
        requirements: "Surat Permohonan ditujukan kepada kepala Kankemenag",
        processingTime: "1 Hari sejak berkas lengkap diterima",
        formLink: "#"
      },
      {
        name: "Surat Keterangan Pendaftaran No ID Nasional Masjid dan Mushalla",
        requirements: "1. Surat Permohonan kepada Kepala Kantor Kankemenag untuk mendapatkan Surat Keterangan Identitas Nasional Masjid atau Mushola\n2. Profil Masjid dan Mushalla\n3. Susunan Pengurus Masjid atau Mushola\n4. Surat Keterangan Status Tanah atau FC Sertifikat Tanah\n5. Bila Masjid belum ada pembangunan fisiknya dilampiri: Sertifikat wakaf/SHM, bila sudah ada IMB, Susunan Panitia Pembangunan.",
        processingTime: "1 Hari sejak berkas lengkap diterima",
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
