"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button, Card, Label, Spinner, TextInput } from "flowbite-react";
import toast from "react-hot-toast";

type FormData = {
  email: string;
  password: string;
};

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const supabase = createClientComponentClient();

  const submitForm = handleSubmit(async (formData) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });
    if (error) {
      setShowError(true);
      toast.error("Invalid credentials!");
    } else {
      router.push("/admin/dashboard");
    }
    setLoading(false);
  });

  return (
    <div className="mx-auto grid h-screen place-items-center bg-gradient-to-br from-white to-blue-200">
      <Card className="min-w-[25%]">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Login
        </h5>
        <form onSubmit={submitForm}>
          <div className="mb-4">
            <div className="mb-2 block">
              <Label htmlFor="email" value="Your email" />
            </div>
            <TextInput
              id="email"
              type="email"
              placeholder="user@mail.com"
              required={true}
              {...register("email")}
            />
          </div>
          <div className="mb-4">
            <div className="mb-2 block">
              <Label htmlFor="password" value="Your password" />
            </div>
            <TextInput
              id="password"
              type="password"
              required={true}
              {...register("password")}
              color={showError ? "failure" : ""}
              helperText={showError ? "Invalid password" : ""}
            />
          </div>
          {!loading ? (
            <Button type="submit" className="mt-4">
              Login
            </Button>
          ) : (
            <Spinner aria-label="Loading" />
          )}
        </form>
      </Card>
    </div>
  );
}
