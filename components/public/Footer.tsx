"use client";
import Link from "next/link";
import Image from "next/image";

interface FooterProps {
  navigation: { [x: string]: any }[] | null;
  settings: { [key: string]: { value: string } } | null;
}

export default function Footer({ navigation, settings }: FooterProps) {
  if (settings && navigation)
    return (
      <footer className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <Link href="/" className="flex items-center mb-4 sm:mb-0">
              <Image
                src={`${settings["logo_image"].value || "/logoasilas.png"}`}
                className="h-8 mr-3"
                width={32}
                height={32}
                alt=""
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-900">
                {`${settings["web_title"].value}`}
              </span>
            </Link>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              {!!navigation &&
                navigation.map((navigationItem) => {
                  return (
                    <li key={navigationItem.id}>
                      <Link
                        href={navigationItem.href}
                        className="mr-4 hover:underline md:mr-6 "
                      >
                        {navigationItem.title}
                      </Link>
                    </li>
                  );
                })}
              <li>
                <Link href="/admin" className="mr-4 hover:underline md:mr-6 ">
                  Admin
                </Link>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023{" "}
            <Link href="/" className="hover:underline">
              {`${settings["web_title"].value}`}
            </Link>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    );

  return <></>;
}
