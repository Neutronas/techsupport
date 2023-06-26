import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export interface NavigationItem {
  id: number;
  created_at: Date;
  title: string;
  href: string;
  order: number;
}

interface FormData {
  title: string;
  href: string;
  id: number;
}

export default function NavigationItemForm({
  navigationItem,
}: {
  navigationItem: NavigationItem;
}) {
  const form = useForm<FormData>();

  const handleFormSubmit = async (data: FormData) => {
    const response = await fetch("/api/navigation", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(`Form data:`, data);
  };

  return (
    <form onSubmit={form.handleSubmit(handleFormSubmit)}>
      <div className="flex max-w-md flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor={`title-${navigationItem.id}`} value="Title" />
          </div>
          <TextInput
            id={`title-${navigationItem.id}`}
            type="text"
            defaultValue={navigationItem.title}
            {...form.register("title")}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor={`href-${navigationItem.id}`} value="URL" />
          </div>
          <TextInput
            id={`href-${navigationItem.id}`}
            type="text"
            defaultValue={navigationItem.href}
            {...form.register("href")}
          />
        </div>
        <TextInput
          id={`href-${navigationItem.id}`}
          type="text"
          defaultValue={navigationItem.id}
          {...form.register("id")}
          className="hidden"
        />
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
