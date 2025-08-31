"use client";
import React, { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useScroll, useSpring, Variants } from "framer-motion";

/* ==== بيانات سلايدر البنرات ==== */
const bannerSlides = [
  "/landing/Group 2.png",
  "/landing/Group 2 copy.png",
  "/landing/Group 2 copy 2.png",
  "/landing/Group 2 copy 3.png",
];

/* ==== Variants عامة ==== */
const fadeUp: Variants = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const staggerContainer = (stagger = 0.12): Variants => ({
  initial: {},
  animate: { transition: { staggerChildren: stagger } },
});

/* ==== عنصر ظهور مع السكول (نسخة Motion) ==== */
function Reveal({
  children,
  className = "",
  delay = 0,
  variant = fadeUp,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: Variants;
}) {
  return (
    <motion.div
      variants={variant}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-80px" }}
      style={{ transitionDelay: `${delay}ms` as any }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ==== كارت خدمة ==== */
function ServiceCard({ src, alt }: { src: string; alt: string }) {
  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -6, rotate: -0.3, transition: { type: "spring", stiffness: 300, damping: 18 } }}
      whileTap={{ scale: 0.98 }}
      className="rounded-[18px] overflow-hidden shadow-sm bg-[#14284B]"
    >
      <Image
        src={src}
        alt={alt}
        width={453}
        height={200}
        className="w-full h-auto object-contain"
      />
    </motion.div>
  );
}

/* ==== شريط تقدم السكروول أعلى الصفحة ==== */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.3 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-1 origin-left z-[60]"
    >
      <div className="h-full w-full bg-gradient-to-r from-[#69C24E] to-[#14284B]" />
    </motion.div>
  );
}

/* ==== البنر الأزرق (سلايدر) ==== */
function BannerSlider() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % bannerSlides.length), 4000);
    return () => clearInterval(t);
  }, []);

  const prevSlide = () => setI((p) => (p - 1 + bannerSlides.length) % bannerSlides.length);
  const nextSlide = () => setI((p) => (p + 1) % bannerSlides.length);

  return (
    <Reveal variant={staggerContainer(0.08)}>
      <motion.div
        variants={scaleIn}
        className="rounded-[18px] overflow-hidden shadow-[0_6px_20px_rgba(0,0,0,0.06)] bg-[#14284B] relative"
      >
        <motion.div
          key={bannerSlides[i]}
          initial={{ opacity: 0, scale: 0.995 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Image
            src={bannerSlides[i]}
            alt="بنر ترويجي"
            width={1287}
            height={263}
            className="w-full h-auto object-contain"
            priority={false}
          />
        </motion.div>

        {/* زرار left */}
        <motion.button
          onClick={prevSlide}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-2 rounded-full transition"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </motion.button>

        {/* زرار right */}
        <motion.button
          onClick={nextSlide}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-2 rounded-full transition"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </motion.button>

        {/* النقاط */}
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {bannerSlides.map((_, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.15 }}
              onClick={() => setI(idx)}
              aria-label={`slide-${idx + 1}`}
              className={`h-2.5 rounded-full transition-all ${
                idx === i ? "w-4 bg-[#69C24E]" : "w-2.5 bg-white/90"
              }`}
            />
          ))}
        </div>
      </motion.div>
    </Reveal>
  );
}

/* ==== فورم التواصل (يرسل إلى /api/contact) ==== */
function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
      honeypot: formData.get("company"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();

      if (json.ok) {
        setStatus("ok");
        form.reset();
      } else {
        setStatus("error");
        setError(json.error || "حصل خطأ أثناء الإرسال");
      }
    } catch {
      setStatus("error");
      setError("فشل الاتصال بالخادم");
    }
  }

  return (
    <motion.form
      variants={staggerContainer(0.08)}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-80px" }}
      className="space-y-4"
      onSubmit={onSubmit}
    >
      {/* Honeypot (Anti-spam) */}
      <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />

      <motion.div variants={fadeUp}>
        <label className="block mb-1 font-medium text-gray-700">الاسم</label>
        <input
          name="name"
          type="text"
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </motion.div>

      <motion.div variants={fadeUp}>
        <label className="block mb-1 font-medium text-gray-700">البريد الإلكتروني</label>
        <input
          name="email"
          type="email"
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </motion.div>

      <motion.div variants={fadeUp}>
        <label className="block mb-1 font-medium text-gray-700">رقم الهاتف</label>
        <input
          name="phone"
          type="tel"
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </motion.div>

      <motion.div variants={fadeUp}>
        <label className="block mb-1 font-medium text-gray-700">الرسالة</label>
        <textarea
          name="message"
          rows={4}
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </motion.div>

      <motion.button
        variants={fadeIn}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={status === "loading"}
        className="bg-[#14284B] text-white px-6 py-2 rounded-md font-semibold disabled:opacity-60"
      >
        {status === "loading" ? "جارٍ الإرسال..." : "إرسال"}
      </motion.button>

      {status === "ok" && (
        <motion.p variants={fadeIn} className="text-green-600 font-medium">
          تم إرسال رسالتك بنجاح، هنرجع لك قريبًا.
        </motion.p>
      )}
      {status === "error" && (
        <motion.p variants={fadeIn} className="text-red-600 font-medium">
          خطأ: {error}
        </motion.p>
      )}
    </motion.form>
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
        <motion.div variants={scaleIn} className="rounded-[22px] overflow-hidden shadow-[0_8px_28px_rgba(0,0,0,0.08)]">
          <div className="bg-[#69C24E] text-white text-center font-bold py-3 md:py-4 text-lg md:text-2xl">
            حمّل التطبيق الآن
          </div>
          <div className="bg-[#14284B] px-4 md:px-8 py-4 md:py-6 flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8">
            <motion.button
              onClick={() => handleClick(appStoreLink)}
              aria-label="App Store"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-full"
            >
              <Image
                src="/landing/Layer 19.png"
                alt="Download on the App Store"
                width={473}
                height={147}
                className="w-[260px] md:w-[340px] h-auto object-contain"
              />
            </motion.button>
            <motion.button
              onClick={() => handleClick(googlePlayLink)}
              aria-label="Google Play"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-full"
            >
              <Image
                src="/landing/Layer 21.png"
                alt="Get it on Google Play"
                width={473}
                height={147}
                className="w-[260px] md:w-[340px] h-auto object-contain"
              />
            </motion.button>
          </div>
        </motion.div>
      </Reveal>

      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
            className="bg-white rounded-xl p-6 shadow-xl text-center max-w-sm w-full"
          >
            <h2 className="text-xl font-bold mb-3 text-gray-800">🚧 Coming Soon</h2>
            <p className="text-gray-600 mb-5">التطبيق لسه تحت التحضير وهيتوفر قريبًا.</p>
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShow(false)}
              className="px-6 py-2 text-dark bg-[#69C24E] rounded-md"
            >
              إغلاق
            </motion.button>
          </motion.div>
        </motion.div>
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
      {/* Scroll progress */}
      <ScrollProgress />

      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6 py-6 md:py-8">
        {/* HERO */}
        <section className="rounded-[26px] overflow-hidden shadow-[0_6px_24px_rgba(0,0,0,0.08)]">
          <Reveal variant={fadeIn}>
            <motion.div initial={{ scale: 1 }} animate={{ scale: [1, 1.005, 1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}>
              <Image
                src="/landing/1.png"
                alt="Smart Moving Hero"
                width={1287}
                height={687}
                className="w-full h-auto object-contain bg-transparent"
                priority
              />
            </motion.div>
          </Reveal>
        </section>

        {/* SERVICES — سلايدر على الموبايل + جريد على الديسكتوب */}
        <section id="services" className="mt-6 md:mt-8 scroll-mt-24 md:scroll-mt-28">
          {/* Mobile Slider */}
          <motion.div
            variants={staggerContainer(0.1)}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-80px" }}
            className="md:hidden relative overflow-visible"
          >
            <div
              ref={railRef}
              className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory"
              style={{ paddingInline: 16, scrollPaddingInline: 16 }}
            >
              {services.map((c, idx) => (
                <Reveal key={c.src} delay={idx * 80} variant={scaleIn} className="shrink-0 snap-center w-[calc(100vw-2rem)] max-w-[460px]">
                  <ServiceCard src={c.src} alt={c.alt} />
                </Reveal>
              ))}
            </div>

            {/* أزرار */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollBy("l")}
              aria-label="prev"
              className="absolute top-1/2 -translate-y-1/2 right-2 z-10 bg-white/90 backdrop-blur rounded-full w-9 h-9 grid place-items-center shadow"
            >
              ‹
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollBy("r")}
              aria-label="next"
              className="absolute top-1/2 -translate-y-1/2 left-2 z-10 bg-white/90 backdrop-blur rounded-full w-9 h-9 grid place-items-center shadow"
            >
              ›
            </motion.button>
          </motion.div>

          {/* Desktop Grid */}
          <motion.div
            variants={staggerContainer(0.1)}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-80px" }}
            className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
          >
            {services.map((c, idx) => (
              <Reveal key={c.src} delay={idx * 80}>
                <ServiceCard src={c.src} alt={c.alt} />
              </Reveal>
            ))}
          </motion.div>
        </section>

        {/* Banner Slider */}
        <section className="mt-6 md:mt-8">
          <BannerSlider />
        </section>

        {/* من نحن */}
        <section id="about" className="mt-6 md:mt-8 scroll-mt-24 md:scroll-mt-28">
          <Reveal>
            <motion.div variants={scaleIn} className="rounded-[28px] overflow-hidden shadow-[0_8px_28px_rgba(0,0,0,0.10)] bg-[#F0F2F4]">
              <Image
                src="/landing/OUR.png"
                alt="من نحن - Smart Moving"
                width={1286}
                height={667}
                className="w-full h-auto object-contain"
              />
            </motion.div>
          </Reveal>
        </section>

        {/* صورة السائقين - تنقل إلى contact */}
        <section id="contact-drivers" className="mt-6 md:mt-8 scroll-mt-24 md:scroll-mt-28">
          <Reveal>
            <motion.div variants={scaleIn} className="rounded-[28px] overflow-hidden shadow-[0_8px_28px_rgba(0,0,0,0.10)] bg-[#F0F2F4]">
              <Link href="#contact" scroll>
                <Image
                  src="/landing/driver.png"
                  alt="من نحن - Smart Moving"
                  width={1286}
                  height={667}
                  className="w-full h-auto object-contain cursor-pointer"
                />
              </Link>
            </motion.div>
          </Reveal>
        </section>

        {/* تواصل معنا */}
        <section id="contact" className="mt-6 md:mt-10 scroll-mt-24 md:scroll-mt-28">
          <Reveal>
            <motion.div variants={fadeIn} className="grid md:grid-cols-2 gap-6 bg-white rounded-[28px] overflow-hidden shadow-[0_8px_28px_rgba(0,0,0,0.08)]">
              <div className="bg-[#69C24E] flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0.9 }}
                  animate={{ opacity: [0.9, 1, 0.9] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Image
                    src="/landing/Layer 20.png"
                    alt="اتصل بنا - Smart Moving"
                    width={857}
                    height={678}
                    className="w-full h-auto object-contain"
                  />
                </motion.div>
              </div>

              <div className="p-6 md:p-10 flex flex-col justify-center">
                <ContactForm />
              </div>
            </motion.div>
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
