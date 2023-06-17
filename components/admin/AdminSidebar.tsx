"use client";
import { Sidebar } from "flowbite-react";

import { HiChartPie } from "react-icons/hi";
import { TfiSettings } from "react-icons/tfi";
import { FiMenu } from "react-icons/fi";

export default function AdminSidebar() {
  return (
    <Sidebar
      aria-label="Admin sidebar"
      className="fixed left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
    >
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/admin/dashboard/" icon={HiChartPie}>
            Dashboard
          </Sidebar.Item>
          
          <Sidebar.Item href="/admin/dashboard/navigation/" icon={FiMenu}>
            Navigation
          </Sidebar.Item>
          <Sidebar.Item href="/admin/dashboard/settings/" icon={TfiSettings}>
            Settings
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
