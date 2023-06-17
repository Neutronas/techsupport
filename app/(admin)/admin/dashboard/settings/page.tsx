import SettingsForm from "@/components/admin/SettingsForm";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
export default async function SettingsPage() {
  const supabase = createClientComponentClient();

  const { data: settings } = await supabase.from("settings").select("*");

  const saveSettings = async (formData: FormData) => {
    "use server";
    console.log(formData);
    // for (const pair of formData.entries()) {
    // if (typeof pair[1] === 'object' && pair[1] !== null && pair[1].constructor.name === 'File') {
    //   // supabase.storage.from('images').upload(pair[1].name, );
    // }
  };
  return (
    <>
      <SettingsForm settings={settings} saveSettings={saveSettings} />
    </>
  );
}
