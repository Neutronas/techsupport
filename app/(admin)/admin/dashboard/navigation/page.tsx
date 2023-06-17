import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import NavigationForm from "@/components/admin/NavigationForm";

export default async function Page() {
  const supabase = createServerComponentClient({ cookies });

  const { data: navigation } = await supabase.from("SmartMenu").select("*");

  return <NavigationForm />;
}
