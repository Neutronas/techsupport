"use client";

import { Button, FileInput, Label, Spinner, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

type setting = { [x: string]: any };
interface SettingsFormProps {
  settings: { [x: string]: any }[] | null;
}

export default function SettingsForm({ settings }: SettingsFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>();

  const createImagesObject = () => {
    let images: { [x: number]: string | string[] } = {};
    settings?.forEach((item) => {
      if (item.type === "image") {
        images = { ...images, [item.id]: `${item.value}` };
      }
    });
    return images;
  };
  const [images, setImages] = useState(createImagesObject);
  const [loading, setLoading] = useState(false);

  const handleImageInputChange = async (event: Event): Promise<any> => {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }

    const fieldName = input.name;
    const file = input.files[0];
    const imageInputId: string = fieldName.replace(/^file_/, "");
    // set to empty
    setImages({ ...images, [imageInputId]: false });

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("/api/image", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setImages({ ...images, [imageInputId]: data.url });
        // @ts-ignore
        setValue(imageInputId, data.url);
      }
    } catch (error) {
      console.error("Failed to upload image:", error);
    }
  };

  const titleCase = (s: string) =>
    s.replace(/^_*(.)|_+(.)/g, (s, c, d) =>
      c ? c.toUpperCase() : " " + d.toUpperCase()
    );

  const submitForm = handleSubmit(async (formData) => {
    setLoading(true);
    const response = await fetch("/api/settings", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    toast.success("Your settings are updated.");

    setLoading(false);
  });

  const fieldAccordingToType = (setting: setting) => {
    switch (setting.type) {
      case "text":
        return (
          <TextInput
            key={setting.id}
            defaultValue={setting.value}
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
            {images[setting.id] ? (
              <Image
                src={`${images[setting.id]}`}
                alt={titleCase(setting.key)}
                width="0"
                height="0"
                sizes="100vw"
                className="w-16 h-16"
              />
            ) : (
              <Spinner aria-label="Uploading image" />
            )}

            <FileInput
              key={"file_" + setting.id}
              name={`file_${setting.id}`}
              // @ts-ignore
              // {...register(`file_${setting.id}`)}
              // @ts-ignore
              onChange={handleImageInputChange}
              accept="image/*"
            />
            <TextInput
              key={setting.id}
              value={`${images[setting.id]}`}
              // @ts-ignore
              {...register(`${setting.id}`)}
              // @ts-ignore
              onChange={handleImageInputChange}
              className="hidden"
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
