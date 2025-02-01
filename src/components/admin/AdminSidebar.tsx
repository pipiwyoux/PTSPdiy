import { LogOut, FileText, Calendar, Book, Mail, Inbox, Printer } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { auth } from "@/lib/firebase";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const AdminSidebar = ({ activeTab, onTabChange }: AdminSidebarProps) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Sidebar>
      <SidebarContent className="py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 text-sm font-semibold">Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => onTabChange("layanan")}
                  data-active={activeTab === "layanan"}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-sidebar-accent rounded-md transition-colors"
                >
                  <FileText className="h-4.5 w-4.5 text-sidebar-foreground" />
                  <span className="text-sm font-medium">Permohonan Layanan</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => onTabChange("janji-temu")}
                  data-active={activeTab === "janji-temu"}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-sidebar-accent rounded-md transition-colors"
                >
                  <Calendar className="h-4.5 w-4.5 text-sidebar-foreground" />
                  <span className="text-sm font-medium">Janji Temu</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => onTabChange("buku-tamu")}
                  data-active={activeTab === "buku-tamu"}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-sidebar-accent rounded-md transition-colors"
                >
                  <Book className="h-4.5 w-4.5 text-sidebar-foreground" />
                  <span className="text-sm font-medium">Daftar Tamu</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => onTabChange("agenda-surat")}
                  data-active={activeTab.startsWith("agenda-surat")}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-sidebar-accent rounded-md transition-colors"
                >
                  <Mail className="h-4.5 w-4.5 text-sidebar-foreground" />
                  <span className="text-sm font-medium">Agenda Surat</span>
                </SidebarMenuButton>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      onClick={() => onTabChange("agenda-surat-masuk")}
                      data-active={activeTab === "agenda-surat-masuk"}
                      className="flex items-center gap-3"
                    >
                      <Inbox className="h-4 w-4" />
                      <span>Surat Masuk</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      onClick={() => onTabChange("agenda-surat-keluar")}
                      data-active={activeTab === "agenda-surat-keluar"}
                      className="flex items-center gap-3"
                    >
                      <Mail className="h-4 w-4" />
                      <span>Surat Keluar</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => onTabChange("cetak-laporan")}
                  data-active={activeTab === "cetak-laporan"}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-sidebar-accent rounded-md transition-colors"
                >
                  <Printer className="h-4.5 w-4.5 text-sidebar-foreground" />
                  <span className="text-sm font-medium">Cetak Laporan</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-md transition-colors"
                >
                  <LogOut className="h-4.5 w-4.5" />
                  <span className="text-sm font-medium">Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
