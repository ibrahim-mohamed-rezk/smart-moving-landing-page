"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  // عدّل الروابط هنا
  const SOCIAL = [
    { label: "Facebook", href: "https://facebook.com/smartmoving" },
    { label: "Instagram", href: "https://instagram.com/smartmoving" },
    { label: "Whatsapp", href: "https://wa.me/201234567890" },
  ];
  const EMAIL = "info@smart-moving.net";
  const WEBSITE = "https://www.smart-moving.net";

  return (
    <footer className="w-full  border-t border-black/10">
      <div
        className="
          mx-auto max-w-[1200px] px-4 md:px-6
          py-3 md:py-4
          flex flex-wrap items-center gap-x-4 gap-y-2
          justify-between
        "
      >
        {/* Logo */}
        <div className="flex items-center">
          {/* بدّل المسار حسب مكان اللوجو عندك */}
          <Image
            src="/landing/Logo.png"
            alt="SMART MOVING SERVICES"
            width={180}
            height={52}
            className="h-8 w-auto object-contain"
            priority={false}
          />
        </div>

        {/* Links row */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[15px] text-black">
          {/* Socials */}
          <span className="flex items-center gap-x-3">
            {SOCIAL.map((s, idx) => (
              <span key={s.label} className="flex items-center">
                <Link
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {s.label}
                </Link>
                {idx < SOCIAL.length - 1 && (
                  <span className="mx-3 text-black/50">|</span>
                )}
              </span>
            ))}
          </span>

          {/* Email */}
          <span className="mx-3 hidden md:inline text-black/50">|</span>
          <span className="flex items-center gap-2">
            <span className="font-normal">Email:</span>
            <a
              href={`mailto:${EMAIL}`}
              className="hover:underline break-all"
            >
              {EMAIL}
            </a>
          </span>

          {/* Website */}
          <span className="mx-3 text-black/50">|</span>
          <span className="flex items-center gap-2">
            <span className="font-normal">Website:</span>
            <a
              href={WEBSITE}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              www.smart-moving.net
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
