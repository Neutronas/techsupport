import AdminNavbar from "@/components/admin/AdminNavbar";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { supabase } from "@/lib/supabaseClient";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data: settings } = await supabase.from("settings").select("*");

  let reMappedSettings = settings!.reduce((acc, obj) => {
    acc[obj.key] = obj;
    return acc;
  }, {});

  return (
    <div>
      <AdminNavbar
        email={session?.user.email!}
        logoURL={reMappedSettings["logo_image"].value}
        title={reMappedSettings["web_title"].value}
      />
      <AdminSidebar />
      <div className="p-4 sm:ml-64">{children}</div>
    </div>
  );
}
