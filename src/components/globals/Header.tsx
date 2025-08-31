"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type NavItem = { id: string; label: string; green?: boolean };

const LINKS: NavItem[] = [
  { id: "services", label: "خدماتنا" },
  { id: "about", label: "من نحن" },
  { id: "contact", label: "تواصل معنا" },
  { id: "download", label: "حمّل التطبيق", green: true },
];

// رابط الأندرويد المباشر
const ANDROID_APK_URL =
  "https://smart-movingdash.space/storage/Smart%20Moving%20(1).apk";

export default function Header() {
  const headerRef = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  const openAndroid = () => {
    // تحميل مباشر في نفس النافذة
    window.location.href = ANDROID_APK_URL;
  };

  const goTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const headerH = headerRef.current?.offsetHeight ?? 72;
    const y = el.getBoundingClientRect().top + window.scrollY - (headerH + 8);
    window.scrollTo({ top: y, behavior: "smooth" });
    setActive(id);
  };

  const goToAndClose = (id: string) => {
    goTo(id);
    setOpen(false);
  };

  useEffect(() => {
    const headerH = headerRef.current?.offsetHeight ?? 72;
    const opts: IntersectionObserverInit = {
      root: null,
      rootMargin: `-${headerH + 10}px 0px -55% 0px`,
      threshold: 0.1,
    };
    const obs = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0))[0];
      if (visible?.target?.id) setActive(visible.target.id);
    }, opts);

    LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const pillClass = (item: NavItem) => {
    const base =
      "inline-flex items-center rounded-full px-4 py-1.5 text-[15px] transition-colors";
    if (item.green) {
      return active === item.id
        ? `${base} bg-[#4FA73A] text-white shadow`
        : `${base} bg-[#69C24E] text-white hover:opacity-90`;
    }
    return active === item.id
      ? `${base} bg-[#14284B] text-white border border-[#14284B]`
      : `${base} border border-black/50 hover:bg-black/5`;
  };

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 w-full bg-[#F4F6F8] border-b border-black/10"
      dir="rtl"
    >
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">
        <div className="flex items-center justify-between py-3">
          <Link href="/" className="shrink-0">
            <Image
              src="/landing/Logo.png"
              alt="SMART MOVING SERVICES"
              width={220}
              height={60}
              className="h-10 w-auto object-contain md:h-12"
              priority
            />
          </Link>

          {/* ديسكتوب: نفس اللينكات لكن لو "حمّل التطبيق" -> تحميل أندرويد فورًا */}
          <nav className="ms-4 hidden md:block">
            <ul className="flex items-center gap-3 md:gap-4 overflow-x-auto no-scrollbar">
              {LINKS.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() =>
                      item.id === "download" ? openAndroid() : goTo(item.id)
                    }
                    className={pillClass(item)}
                    aria-current={active === item.id ? "page" : undefined}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* موبايل: زر حمّل التطبيق = تحميل مباشر + زر القائمة */}
          <div className="ms-4 flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={openAndroid}
              className={pillClass({ id: "download", label: "حمّل التطبيق", green: true })}
            >
              حمّل التطبيق
            </button>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="open menu"
              className="grid place-items-center w-10 h-10 rounded-full border border-black/40 bg-white active:scale-95 transition"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="#0f172a" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* السلايد الجانبي للموبايل */}
      <div
        className={`fixed inset-0 z-[60] md:hidden transition-opacity ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <aside
        className={`
          fixed top-0 bottom-0 right-0 z-[61] w-[78%] max-w-[320px]
          bg-white shadow-2xl md:hidden transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-black/10">
          <span className="font-semibold">القائمة</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="close menu"
            className="grid place-items-center w-9 h-9 rounded-full border border-black/20 bg-white active:scale-95 transition"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6L6 18" stroke="#0f172a" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-3">
            {LINKS.filter((l) => l.id !== "download").map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => {
                    goToAndClose(item.id);
                  }}
                  className={`w-full text-right px-4 py-3 rounded-xl border transition
                    ${active === item.id ? "bg-[#14284B] text-white border-[#14284B]" : "border-black/15 hover:bg-black/5"}`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <style jsx global>{`
        html { scroll-behavior: smooth; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </header>
  );
}
