import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";
import AdminServiceRequests from "@/components/admin/AdminServiceRequests";
import AdminAppointments from "@/components/admin/AdminAppointments";
import AdminGuestBook from "@/components/admin/AdminGuestBook";
import AdminIncomingMail from "@/components/admin/AdminIncomingMail";
import AdminOutgoingMail from "@/components/admin/AdminOutgoingMail";
import AdminSidebar from "@/components/admin/AdminSidebar";
import PrintReportPage from "./PrintReportPage";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { isAdmin, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("layanan");

  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate("/");
    }
  }, [isAdmin, loading, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return null; // or a login page, or a not-authorized page
  }

  return (
    <SidebarProvider defaultOpen>
      <div className="min-h-screen flex w-full bg-gray-50 dark:bg-gray-900">
        <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto px-6 py-8">
            <h1 className="text-3xl font-bold mb-8 text-primary">
              Dashboard Admin
            </h1>

            {activeTab === "layanan" && <AdminServiceRequests />}
            {activeTab === "janji-temu" && <AdminAppointments />}
            {activeTab === "buku-tamu" && <AdminGuestBook />}
            {activeTab === "agenda-surat-masuk" && <AdminIncomingMail />}
            {activeTab === "agenda-surat-keluar" && <AdminOutgoingMail />}
            {activeTab === "cetak-laporan" && <PrintReportPage />}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
