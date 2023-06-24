"use client";
import { Sidebar, Navbar, Avatar, Dropdown } from "flowbite-react";
import Image from "next/image";

import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

interface AdminNavBarProps {
  email: string;
  title: string;
  logoURL: string;
}

export default function AdminNavbar({
  email,
  title,
  logoURL,
}: AdminNavBarProps) {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log({ error });
    } else {
      router.push("/");
    }
  };

  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="/">
        <Image
          src={`${logoURL}`}
          className="h-8 mr-3"
          width={32}
          height={32}
          alt={`${title}`}
        />
        <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-900">
          {`${title}`}
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          inline
          label={
            <Avatar alt="User settings" img="/profileAvatar.png" rounded />
          }
        >
          <Dropdown.Header>
            <span className="block truncate text-sm font-medium">{email}</span>
          </Dropdown.Header>
          {/* <Dropdown.Item>Profile</Dropdown.Item>
          <Dropdown.Divider /> */}
          <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
        </Dropdown>
      </div>
    </Navbar>
  );
}
