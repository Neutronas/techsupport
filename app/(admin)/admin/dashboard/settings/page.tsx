import SettingsForm from "@/components/admin/SettingsForm";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function SettingsPage() {
  const supabase = createClientComponentClient();

  const { data: settings } = await supabase.from("settings").select("*");

  const saveSettings = async (formData: FormData) => {
    "use server";
    console.log(formData);
    for (const pair of formData.entries()) {
      console.log(pair[1]);
    }
  };
  return (
    <>
      <SettingsForm settings={settings} saveSettings={saveSettings} />
    </>
  );
}
