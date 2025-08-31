"use client";

import Image from "next/image";

export default function Footer() {
  const SOCIAL = [
    { label: "Facebook", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "Whatsapp", href: "#" },
  ];
  const EMAIL = "info@smart-moving.net";
  const WEBSITE = "https://www.smart-moving.net";

  return (
    <footer
      dir="rtl"
      role="contentinfo"
      className="relative z-10 w-full bg-[#F4F6F8] border-t border-black/10"
    >
      <div className="mx-auto max-w-[1200px] px-4 md:px-6 py-5">
        {/* موبايل: عمودي — ديسكتوب: صف */}
        <div className="flex flex-col items-center gap-4 md:flex-row md:items-center md:justify-between">
          {/* Logo */}
          <Image
            src="/landing/Logo.png"
            alt="SMART MOVING SERVICES"
            width={180}
            height={52}
            className="h-10 w-auto object-contain"
            priority={false}
          />

          {/* Links */}
          <div className="w-full md:w-auto flex flex-col items-center gap-3 text-[14px] text-black">
            {/* Socials */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline whitespace-nowrap"
                >
                  {s.label}
                </a>
              ))}
            </div>

            {/* Email + Website */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
              <a href={`mailto:${EMAIL}`} className="hover:underline break-all">
                {EMAIL}
              </a>
              <span className="hidden sm:inline text-black/40">|</span>
              <a
                href={WEBSITE}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline break-all"
              >
                {WEBSITE.replace(/^https?:\/\//, "")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
