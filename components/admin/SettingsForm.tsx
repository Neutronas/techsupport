"use client";

import { Button, FileInput, Label, Spinner, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useState } from "react";

type setting = { [x: string]: any };
interface SettingsFormProps {
  settings: { [x: string]: any }[] | null;
  saveSettings: (formData: any) => void;
}

export default function SettingsForm({
  settings,
  saveSettings,
}: SettingsFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const createImagesObject = () => {
    let images: { [x: number]: string | string[] } = {};
    settings?.forEach((item) => {
      if (item.type === "image") {
        images = { ...images, [item.id]: `/${item.value}` };
      }
    });
    return images;
  };
  const [images, setImages] = useState(createImagesObject);
  const [loading, setLoading] = useState(false);

  const handleImageInputChange = (event: Event): void => {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }

    const fieldName = input.name;
    const file = input.files[0];
    setImages({ ...images, [fieldName]: URL.createObjectURL(file) });
  };

  const titleCase = (s: string) =>
    s.replace(/^_*(.)|_+(.)/g, (s, c, d) =>
      c ? c.toUpperCase() : " " + d.toUpperCase()
    );

  const submitForm = handleSubmit(async (formData) => {
    setLoading(true);
    const formDataWithFiles = new FormData();

    // Append each form field to formDataWithFiles
    Object.entries(formData).forEach(([key, value]) => {
      if (value instanceof FileList) {
        formDataWithFiles.append(key, value[0]);
      } else {
        formDataWithFiles.append(key, JSON.stringify(value));
      }
    });

    saveSettings(formDataWithFiles);
  });

  const fieldAccordingToType = (setting: setting) => {
    switch (setting.type) {
      case "text":
        return (
          <TextInput
            key={setting.id}
            value={setting.value}
            // @ts-ignore
            {...register(`${setting.id}`)}
          />
        );
      case "file":
        return (
          <>
            <FileInput
              key={setting.id}
              // value={setting.value}
              // @ts-ignore
              {...register(`${setting.id}`)}
            />
          </>
        );
      case "image":
        return (
          <>
            <Image
              src={`${images[setting.id]}`}
              alt={titleCase(setting.key)}
              width="0"
              height="0"
              sizes="100vw"
              className="w-16 h-16"
            />
            <FileInput
              key={setting.id}
              // value={setting.value}
              // @ts-ignore
              {...register(`${setting.id}`)}
              // @ts-ignore
              onChange={handleImageInputChange}
              accept="image/*"
            />
          </>
        );
    }
  };

  return (
    <form className="flex max-w-md flex-col gap-4" onSubmit={submitForm}>
      {settings
        ? settings.map((item) => (
            <div key={item.id}>
              <div className="mb-2 block">
                <Label htmlFor={item.id} value={titleCase(item.key)} />
              </div>
              {fieldAccordingToType(item)}
            </div>
          ))
        : ""}
      {!loading ? (
        <Button type="submit" className="mt-4">
          Submit
        </Button>
      ) : (
        <Spinner aria-label="Loading" />
      )}
    </form>
  );
}
