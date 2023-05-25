"use server";

import { supabase } from "@/lib/supabaseClient";
import { FormEvent } from "react";

interface loginInfo {
  email: string;
  password: string;
}
const loginAction = async (formData: loginInfo) => {
  console.log(formData);
  // if (formData.target.email.value && formData.get("password")) {
  //   const { data, error } = await supabase.auth.signInWithPassword({
  //     email: formData.get("email") as string,
  //     password: formData.get("password") as string,
  //   });

  //   if (error) {
  //     return false;
  //   }

  //   return data;
  // }
};

export default loginAction;
