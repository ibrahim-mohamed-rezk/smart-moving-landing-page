"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/* ==== بيانات سلايدر البنرات ==== */
const bannerSlides = [
  "/landing/Group 2.png",
  "/landing/Group 2 copy.png",
  "/landing/Group 2 copy 2.png",
  "/landing/Group 2 copy 3.png",
];

/* ==== عنصر ظهور مع السكول (Reveal) ==== */
function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShow(true);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out will-change-transform ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ==== كارت خدمة ==== */
function ServiceCard({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="rounded-[18px] overflow-hidden shadow-sm bg-[#14284B]">
      <Image
        src={src}
        alt={alt}
        width={453}
        height={200}
        className="w-full h-auto object-contain"
      />
    </div>
  );
}

/* ==== البنر الأزرق ==== */
function BannerSlider() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % bannerSlides.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <Reveal>
      <div className="rounded-[18px] overflow-hidden shadow-[0_6px_20px_rgba(0,0,0,0.06)] bg-[#14284B] relative">
        <Image
          key={bannerSlides[i]}
          src={bannerSlides[i]}
          alt="بنر ترويجي"
          width={1287}
          height={263}
          className="w-full h-auto object-contain"
        />
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {bannerSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`slide-${idx + 1}`}
              className={`h-2.5 rounded-full transition-all ${
                idx === i ? "w-4 bg-[#69C24E]" : "w-2.5 bg-white"
              }`}
            />
          ))}
        </div>
      </div>
    </Reveal>
  );
}

/* ==== حمّل التطبيق الآن + Popup ==== */
function DownloadApp() {
  const [show, setShow] = useState(false);
  const appStoreLink = ""; // ضع رابط App Store لو جاهز
  const googlePlayLink =
    "https://smart-movingdash.space/storage/Smart%20Moving%20(1).apk";

  const handleClick = (link: string) => {
    if (link) window.open(link, "_blank");
    else setShow(true);
  };

  return (
    <section id="download" className="mt-8 md:mt-10 scroll-mt-24 md:scroll-mt-28">
      <Reveal>
        <div className="rounded-[22px] overflow-hidden shadow-[0_8px_28px_rgba(0,0,0,0.08)]">
          <div className="bg-[#69C24E] text-white text-center font-bold py-3 md:py-4 text-lg md:text-2xl">
            حمّل التطبيق الآن
          </div>
          <div className="bg-[#14284B] px-4 md:px-8 py-4 md:py-6 flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8">
            <button onClick={() => handleClick(appStoreLink)} aria-label="App Store" className="rounded-full">
              <Image
                src="/landing/Layer 19.png"
                alt="Download on the App Store"
                width={473}
                height={147}
                className="w-[260px] md:w-[340px] h-auto object-contain"
              />
            </button>
            <button onClick={() => handleClick(googlePlayLink)} aria-label="Google Play" className="rounded-full">
              <Image
                src="/landing/Layer 21.png"
                alt="Get it on Google Play"
                width={473}
                height={147}
                className="w-[260px] md:w-[340px] h-auto object-contain"
              />
            </button>
          </div>
        </div>
      </Reveal>

      {show && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-xl text-center max-w-sm w-full">
            <h2 className="text-xl font-bold mb-3 text-gray-800">🚧 Coming Soon</h2>
            <p className="text-gray-600 mb-5">التطبيق لسه تحت التحضير وهيتوفر قريبًا.</p>
            <button onClick={() => setShow(false)} className="px-6 py-2 text-white rounded-md">
              إغلاق
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

/* ==== الصفحة ==== */
export default function HomePage() {
  const services = [
    { src: "/landing/2.png", alt: "رحلاتك" },
    { src: "/landing/3.png", alt: "احتياجاتك" },
    { src: "/landing/4.png", alt: "مطاعمك" },
    { src: "/landing/5.png", alt: "تكلفتك" },
  ];

  // سلايدر الموبايل
  const railRef = useRef<HTMLDivElement | null>(null);
  const scrollBy = (dir: "l" | "r") => {
    const rail = railRef.current;
    if (!rail) return;
    const amount = rail.clientWidth * 0.9;
    rail.scrollBy({ left: dir === "l" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <main className="bg-[#F4F6F8]" dir="rtl">
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6 py-6 md:py-8">
        {/* HERO */}
        <section className="rounded-[26px] overflow-hidden shadow-[0_6px_24px_rgba(0,0,0,0.08)]">
          <Reveal>
            <Image
              src="/landing/1.png"
              alt="Smart Moving Hero"
              width={1287}
              height={687}
              className="w-full h-auto object-contain bg-transparent"
              priority
            />
          </Reveal>
        </section>

        {/* SERVICES — سلايدر على الموبايل + جريد على الديسكتوب */}
        <section id="services" className="mt-6 md:mt-8 scroll-mt-24 md:scroll-mt-28">
          {/* Mobile Slider */}
          <div className="md:hidden relative overflow-visible">
            <div
              ref={railRef}
              className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory"
              style={{ paddingInline: 16, scrollPaddingInline: 16 }}
            >
              {services.map((c, idx) => (
                <Reveal
                  key={c.src}
                  delay={idx * 120}
                  className="shrink-0 snap-center w-[calc(100vw-2rem)] max-w-[460px]"
                >
                  <ServiceCard src={c.src} alt={c.alt} />
                </Reveal>
              ))}
            </div>

            {/* أزرار */}
            <button
              onClick={() => scrollBy("l")}
              aria-label="prev"
              className="absolute top-1/2 -translate-y-1/2 right-2 z-10 bg-white/90 backdrop-blur rounded-full w-9 h-9 grid place-items-center shadow"
            >
              ‹
            </button>
            <button
              onClick={() => scrollBy("r")}
              aria-label="next"
              className="absolute top-1/2 -translate-y-1/2 left-2 z-10 bg-white/90 backdrop-blur rounded-full w-9 h-9 grid place-items-center shadow"
            >
              ›
            </button>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {services.map((c, idx) => (
              <Reveal key={c.src} delay={idx * 120}>
                <ServiceCard src={c.src} alt={c.alt} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* Banner Slider */}
        <section className="mt-6 md:mt-8">
          <BannerSlider />
        </section>

        {/* من نحن */}
        <section id="about" className="mt-6 md:mt-8 scroll-mt-24 md:scroll-mt-28">
          <Reveal>
            <div className="rounded-[28px] overflow-hidden shadow-[0_8px_28px_rgba(0,0,0,0.10)] bg-[#14284B]">
              <Image
                src="/landing/OUR.png"
                alt="من نحن - Smart Moving"
                width={1286}
                height={667}
                className="w-full h-auto object-contain"
              />
            </div>
          </Reveal>
        </section>

        {/* تواصل معنا */}
        <section id="contact" className="mt-6 md:mt-10 scroll-mt-24 md:scroll-mt-28">
          <Reveal>
            <div className="grid md:grid-cols-2 gap-6 bg-white rounded-[28px] overflow-hidden shadow-[0_8px_28px_rgba(0,0,0,0.08)]">
              <div className="bg-[#69C24E] flex items-center justify-center">
                <Image
                  src="/landing/Layer 20.png"
                  alt="اتصل بنا - Smart Moving"
                  width={857}
                  height={678}
                  className="w-full h-auto object-contain"
                />
              </div>

              <div className="p-6 md:p-10 flex flex-col justify-center">
                <form className="space-y-4">
                  <div>
                    <label className="block mb-1 font-medium text-gray-700">الاسم</label>
                    <input
                      type="text"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium text-gray-700">البريد الإلكتروني</label>
                    <input
                      type="email"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium text-gray-700">رقم الهاتف</label>
                    <input
                      type="tel"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium text-gray-700">الرسالة</label>
                    <textarea
                      rows={4}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <button type="submit" className="bg-[#14284B] text-white px-6 py-2 rounded-md font-semibold">
                    إرسال
                  </button>
                </form>
              </div>
            </div>
          </Reveal>
        </section>

        {/* حمّل التطبيق الآن */}
        <DownloadApp />
      </div>

      {/* ستايلات عامة */}
      <style jsx global>{`
        html { scroll-behavior: smooth; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </main>
  );
}
