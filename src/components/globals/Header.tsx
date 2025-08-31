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

export default function Header() {
  const headerRef = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState<string>("");

  // Scroll to section with offset for sticky header
  const goTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const headerH = headerRef.current?.offsetHeight ?? 72;
    const y = el.getBoundingClientRect().top + window.scrollY - (headerH + 8);
    window.scrollTo({ top: y, behavior: "smooth" });
    setActive(id);
  };

  // Observe sections to update active link while scrolling
  useEffect(() => {
    const headerH = headerRef.current?.offsetHeight ?? 72;
    const opts: IntersectionObserverInit = {
      root: null,
      // اترك مسافة الهيدر من الأعلى + شوية من تحت
      rootMargin: `-${headerH + 10}px 0px -55% 0px`,
      threshold: 0.1,
    };
    const obs = new IntersectionObserver((entries) => {
      // اختر السكشن ذو أعلى نسبة تقاطع
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
          {/* الشعار (يمين) */}
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

          {/* أزرار التنقل (شمال) */}
          <nav className="ms-4">
            <ul className="flex items-center gap-3 md:gap-4 overflow-x-auto no-scrollbar">
              {LINKS.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => goTo(item.id)}
                    className={pillClass(item)}
                    aria-current={active === item.id ? "page" : undefined}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <style jsx global>{`
        html {
          scroll-behavior: smooth; /* للسكرول العادي لو استُخدم روابط هاش */
        }
        /* إخفاء سكرول الهورايزونتال لشريط الأزرار على الموبايل */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </header>
  );
}
