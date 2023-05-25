"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";

type FormData = {
  email: string;
  password: string;
};

export default function Page() {
  return <div>You are logged in</div>;
}
