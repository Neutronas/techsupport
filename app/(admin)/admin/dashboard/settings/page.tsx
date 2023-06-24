import SettingsForm from "@/components/admin/SettingsForm";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function SettingsPage() {
  const supabase = createClientComponentClient();

  const { data: settings } = await supabase
    .from("settings")
    .select("*")
    .order("id", { ascending: true });

  return (
    <>
      <SettingsForm settings={settings} />
    </>
  );
}
