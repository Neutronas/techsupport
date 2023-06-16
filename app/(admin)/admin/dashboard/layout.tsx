import AdminNavbar from "@/components/admin/AdminNavbar";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClientComponentClient();

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
      <div>
        <AdminSidebar />
        <div className="p-4 sm:ml-64">{children}</div>
      </div>
    </div>
  );
}
