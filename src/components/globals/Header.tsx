"use client";

// import { useLocale, useTranslations } from "next-intl";
// import { useState, useRef, useEffect } from "react";
import { Link } from "@/i18n/routing";
// import { ChevronDown, Check, Menu, X, BadgePercent } from "lucide-react";
import Image from "next/image";
import Script from "next/script";
// import AuthModal from "../ui/AuthModal";
// import { navigatons } from "@/libs/data/data";
// import axios from "axios";
// import { useSearchParams } from "next/navigation";
// import ForgetPasswordModal from "../ui/ForgetPasswordModal";
// import { UserDataTypes } from "@/libs/types/types";

// const flagMap: Record<string, string> = {
//   en: "gb",
//   ar: "sa",
// };

export default function Header() {
  // const router = useRouter();
  // const pathname = usePathname();
  // const locale = useLocale();
  // const [openForgotPassword, setOpenForgotPassword] = useState(false);
  // const [langOpen, setLangOpen] = useState(false);
  // const [authModalType, setAuthModalType] = useState<
  //   "login" | "register" | "verify" | null
  // >(null);
  // const t = useTranslations("header");
  // const [token, setToken] = useState<string | null>(null);
  // const [userMenuOpen, setUserMenuOpen] = useState(false);
  // const [userMobileMenuOpen, setUserMbileMenuOpen] = useState(false);
  // const searchParams = useSearchParams();
  // const [user, setUser] = useState<UserDataTypes | null>(null);
  // const userMenuRef = useRef<HTMLDivElement>(null);
  // const userMobileMenuRef = useRef<HTMLDivElement>(null);

  // const [menuOpen, setMenuOpen] = useState(false);
  // const langRef = useRef<HTMLDivElement>(null);
  // const [showNotification, setShowNotification] = useState(false);
  // const [showNotificationChat, setShowNotificationChat] = useState(0);

  // const changeLanguage = (l: string) => {
  //   const paramsString = searchParams.toString();
  //   const url = paramsString ? `${pathname}?${paramsString}` : pathname;

  //   router.replace(url, { locale: l });
  //   setLangOpen(false);
  // };

  // useEffect(() => {
  //   const feachData = async () => {
  //     try {
  //       const response = await axios.get("/api/auth/getToken");
  //       setToken(response.data.token);
  //       setUser(JSON.parse(response.data.user));
  //     } catch (error) {
  //       throw error;
  //     }
  //   };

  //   feachData();
  // }, []);

  // useEffect(() => {
  //   const onClick = (e: MouseEvent) => {
  //     if (langRef.current && !langRef.current.contains(e.target as Node)) {
  //       setLangOpen(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", onClick);
  //   return () => document.removeEventListener("mousedown", onClick);
  // }, []);

  // useEffect(() => {
  //   const feachData = async () => {
  //     if (!token) return null;
  //     try {
  //       const response = await axios.post(
  //         "/api/coockies/get-data-from-coockies",
  //         {
  //           key: "has_hold",
  //         }
  //       );
  //       setShowNotification(response.data.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   feachData();

  //   // Set up interval for subsequent fetches
  //   const intervalId = setInterval(feachData, 10000);

  //   // Cleanup interval on component unmount
  //   return () => clearInterval(intervalId);
  // }, [token]);

  // useEffect(() => {
  //   const feachData = async () => {
  //     if (!token) return null;
  //     try {
  //       const response = await axios.post(
  //         "/api/coockies/get-data-from-coockies",
  //         {
  //           key: "un_read_message_count",
  //         }
  //       );
  //       setShowNotificationChat(response.data.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   feachData();
  // }, [token]);

  // useEffect(() => {
  //   const onClick = (e: MouseEvent) => {
  //     if (
  //       userMenuRef.current &&
  //       !userMenuRef.current.contains(e.target as Node)
  //     ) {
  //       setUserMenuOpen(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", onClick);
  //   return () => document.removeEventListener("mousedown", onClick);
  // }, []);

  // useEffect(() => {
  //   const onClick = (e: MouseEvent) => {
  //     if (
  //       userMobileMenuRef.current &&
  //       !userMobileMenuRef.current.contains(e.target as Node)
  //     ) {
  //       setUserMbileMenuOpen(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", onClick);
  //   return () => document.removeEventListener("mousedown", onClick);
  // }, []);

  // const logout = async () => {
  //   try {
  //     await axios.post("/api/auth/logout");
  //     setToken(null);
  //     router.push("/");
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  return (
    <>
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "SmartMoving",
            url: "https://www.smart-moving.net/",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://www.smart-moving.net/?s={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "SmartMoving",
            image: "https://www.smart-moving.net/logo.png",
            url: "https://www.smart-moving.net/",
            telephone: "+1-214-960-4130",
            email: "sales@smartmoving.com",
            address: {
              "@type": "PostalAddress",
              streetAddress: "12377 Merit Drive, Suite 1530",
              addressLocality: "Dallas",
              addressRegion: "TX",
              postalCode: "75251",
              addressCountry: "US",
            },
            priceRange: "$$$",
            description:
              "All‑in‑one moving company software and CRM to streamline operations, dispatch, estimates, billing, and reporting.",
            openingHours: ["Mo-Fr 08:00-18:00"],
            geo: {
              "@type": "GeoCoordinates",
              latitude: 32.8644,
              longitude: -96.824,
            },
          }),
        }}
      />
      <header className="bg-gradient-to-r w-full max-w-full bg-[#192953] sticky top-0 z-50 shadow-md">
        <div className="container w-full mx-auto">
          <div className="flex w-full items-center justify-between py-[clamp(5px,0.417vw,20px)] ">
            {/* Left side: Logo and Language */}
            <div className="flex w-full items-center gap-6">
              <Link
                href="/"
                className="flex items-center w-[clamp(100px,11.458vw,220px)] "
              >
                <Image
                  src={"/logo.png"}
                  alt="MySite Logo"
                  width={130}
                  height={40}
                  className="object-contain w-full h-full"
                />
              </Link>

              {/* Right side: Desktop nav */}
              {/* <nav className="hidden ms-[clamp(20px,5.0vw,596px)] md:flex items-center gap-6">
                {navigatons.map((nav) => (
                  <Link
                    key={nav.href}
                    href={nav.href}
                    locale={locale}
                    className="text-white hover:text-blue-400 font-[400] font-['Libre_Baskerville'] leading-[100%] text-[clamp(12px,0.938vw,18px)] transition-colors"
                  >
                    {t(nav.name)}
                  </Link>
                ))}
              </nav> */}

              <div className="items-center justify-center hidden md:flex ms-auto gap-[clamp(5px,1.25vw,50px)] ">
                {/* offers icon */}
                {/* {token && (
                  <Link
                    href="/myprofile?page=tasks"
                    onClick={() => setUserMenuOpen(false)}
                    className=" flex justify-center relative"
                  >
                    <BadgePercent className="text-white" />
                    {showNotification && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                    )}
                  </Link>
                )} */}

                {/* chat icon */}
                {/* {token ? (
                  <Link
                    href="/chats"
                    className="w-6 h-6 hover:opacity-70 relative"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.1706 20.8905C18.3536 20.6125 21.6856 17.2332 21.9598 12.9909C22.0134 12.1607 22.0134 11.3009 21.9598 10.4707C21.6856 6.22838 18.3536 2.84913 14.1706 2.57107C12.7435 2.47621 11.2536 2.47641 9.8294 2.57107C5.64639 2.84913 2.31441 6.22838 2.04024 10.4707C1.98659 11.3009 1.98659 12.1607 2.04024 12.9909C2.1401 14.536 2.82343 15.9666 3.62791 17.1746C4.09501 18.0203 3.78674 19.0758 3.30021 19.9978C2.94941 20.6626 2.77401 20.995 2.91484 21.2351C3.05568 21.4752 3.37026 21.4829 3.99943 21.4982C5.24367 21.5285 6.08268 21.1757 6.74868 20.6846C7.1264 20.4061 7.31527 20.2668 7.44544 20.2508C7.5756 20.2348 7.83177 20.3403 8.34401 20.5513C8.8044 20.7409 9.33896 20.8579 9.8294 20.8905C11.2536 20.9852 12.7435 20.9854 14.1706 20.8905Z"
                        fill="#192953"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8.5 14.5H15.5M8.5 9.5H12"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    {showNotificationChat !== 0 && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                    )}
                  </Link>
                ) : (
                  <button
                    onClick={() => setAuthModalType("login")}
                    className="text-white bg-transparent cursor-pointer hover:bg-[#000953] hover:border-white/70 hover:text-white/70 border border-white rounded-[clamp(10px,0.833vw,20px)] font-['Libre_Baskerville'] text-[clamp(14px,1.042vw,20px)] font-[400] py-[clamp(5px,0.417vw,8px)] px-[clamp(5px,1.562vw,300px)] text-sm transition-colors"
                  >
                    {t("Login")}
                  </button>
                )} */}

                {/* user icon */}
                {/* {token ? (
                  <div className="relative flex" ref={userMenuRef}>
                    <button
                      onClick={() => setUserMenuOpen((open) => !open)}
                      className="w-6 h-6 hover:opacity-70 relative"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17 8.5C17 5.73858 14.7614 3.5 12 3.5C9.23858 3.5 7 5.73858 7 8.5C7 11.2614 9.23858 13.5 12 13.5C14.7614 13.5 17 11.2614 17 8.5Z"
                          stroke="white"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <mask id="path-2-inside-1_107_998" fill="white">
                          <path d="M19 20.5C19 16.634 15.866 13.5 12 13.5C8.13401 13.5 5 16.634 5 20.5" />
                        </mask>
                        <path
                          d="M17.5 20.5C17.5 21.3284 18.1716 22 19 22C19.8284 22 20.5 21.3284 20.5 20.5H17.5ZM3.5 20.5C3.5 21.3284 4.17157 22 5 22C5.82843 22 6.5 21.3284 6.5 20.5H3.5ZM19 20.5H20.5C20.5 15.8056 16.6944 12 12 12V13.5V15C15.0376 15 17.5 17.4624 17.5 20.5H19ZM12 13.5V12C7.30558 12 3.5 15.8056 3.5 20.5H5H6.5C6.5 17.4624 8.96244 15 12 15V13.5Z"
                          fill="white"
                          mask="url(#path-2-inside-1_107_998)"
                        />
                      </svg>
                    </button>
                    <div
                      className={`absolute overflow-hidden top-6 start-1/2 transform ${
                        locale === "ar" ? "translate-x-1/2" : "-translate-x-1/2"
                      } mt-2 w-32 bg-white rounded-xl shadow-lg z-10 transition-all duration-150 ${
                        userMenuOpen
                          ? "opacity-100 scale-100 pointer-events-auto"
                          : "opacity-0 scale-95 pointer-events-none"
                      }`}
                    >
                      <div className="py-1 flex items-center justify-center flex-col">
                        <Link
                          href="/myprofile?page=personal-info"
                          className=" w-full text-center py-2 flex justify-center text-sm text-gray-700 hover:bg-gray-100 font-['Libre_Baskerville']"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          {t("My Profile")}
                        </Link>

                        <button
                          onClick={() => {
                            setUserMenuOpen(false);
                            logout();
                          }}
                          className="block w-full text-center py-2 text-sm text-gray-700 hover:bg-gray-100 font-['Libre_Baskerville']"
                        >
                          {t("Logout")}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link href="/RegisterCompany">
                    <button className="text-white cursor-pointer hover:bg-[#000953] hover:border-white/70 hover:text-white/70 border-white rounded-[clamp(10px,0.833vw,20px)] border font-['Libre_Baskerville'] text-[clamp(14px,1.042vw,20px)] font-[400] py-[clamp(5px,0.417vw,8px)] px-[clamp(5px,1.562vw,30px)] text-sm transition-colors">
                      {t("Register Moving Company")}
                    </button>
                  </Link>
                )} */}

                {/* Language Switcher */}
                {/* <div className="relative">
                  <button
                    onClick={() => setLangOpen((o) => !o)}
                    className="flex items-center hover:border hover:border-white/70 rounded-[clamp(10px,0.833vw,20px)] font-['Libre_Baskerville'] text-[clamp(14px,1.042vw,20px)] font-[400] py-[clamp(3px,0.417vw,5px)] px-[clamp(5px,1.562vw,10px)] justify-center gap-2 text-white cursor-pointer transition focus:outline-none"
                  >
                    <span className={`fi fi-${flagMap[locale]} mr-1`} />
                    <Image
                      src={`/images/${locale}.svg`}
                      alt="Arrow Down"
                      width={30}
                      height={20}
                    />
                    <span className="uppercase font-medium font-['Libre_Baskerville'] text-[18px]">
                      {locale}
                    </span>
                    <ChevronDown className="w-4 h-4 text-[18px] text-gray-300" />
                  </button>
                  <div className="" ref={langRef}>
                    <div
                      className={`absolute  mt-2 w-[clamp(50px,6.5vw,144px)] border border-gray-200 bg-white bg-opacity-95 backdrop-blur-sm rounded-xl shadow-xl transform origin-top-left transition-all duration-150 ${
                        langOpen
                          ? "opacity-100 scale-100 pointer-events-auto"
                          : "opacity-0 scale-95 pointer-events-none"
                      }`}
                    >
                      <ul className="divide-y divide-gray-100">
                        {routing.locales.map((l) => (
                          <li key={l}>
                            <button
                              onClick={() => changeLanguage(l)}
                              className="w-full flex items-center px-3 py-2 hover:bg-gray-100 transition-colors rounded-xl"
                            >
                              <Image
                                src={`/images/${l}.svg`}
                                alt="Arrow Down"
                                width={30}
                                height={20}
                              />
                              <span className={`fi fi-${flagMap[l]} mr-2`} />
                              <span className="capitalize font-[400] font-['Libre_Baskerville'] text-[clamp(12px,0.938vw,20px)] flex-1">
                                {l}
                              </span>
                              {l === locale && (
                                <Check className="w-4 h-4 text-blue-600" />
                              )}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>

            {/* Mobile Menu Button */}
            {/* <div className="md:hidden flex items-center">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-white focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-lg p-1"
              >
                {menuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div> */}
          </div>
        </div>

        {/* Mobile Menu - Outside the container but still in the header */}
        {/* {menuOpen && ( */}
          <div className="md:hidden bg-[#192953] shadow-lg border-t border-[#304680]">
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col space-y-4">
              {/* {user?.role === "customer" &&
                navigatons.map((nav) => (
                  <Link
                    href={nav.href}
                    key={nav.href}
                    locale={locale}
                    className="text-white hover:text-blue-400 font-medium text-base block py-2 px-3 hover:bg-[#263966] rounded-lg transition-colors"
                  >
                    {t(nav.name)}
                  </Link>
                ))} */}

              {/* Language Switcher mobile */}
              {/* <div className="relative z-50 block mx-auto">
                <button
                  onClick={() => setLangOpen((o) => !o)}
                  className="flex items-center hover:border hover:border-white/70 rounded-[clamp(10px,0.833vw,20px)] font-['Libre_Baskerville'] text-[clamp(14px,1.042vw,20px)] font-[400] py-[clamp(3px,0.417vw,5px)] px-[clamp(5px,1.562vw,10px)] justify-center gap-2 text-white cursor-pointer transition focus:outline-none"
                >
                  <span className={`fi fi-${flagMap[locale]} mr-1`} />
                  <Image
                    src={`/images/${locale}.svg`}
                    alt="Arrow Down"
                    width={30}
                    height={20}
                  />
                  <span className="uppercase font-medium font-['Libre_Baskerville'] text-[18px]">
                    {locale}
                  </span>
                  <ChevronDown className="w-4 h-4 text-[18px] text-gray-300" />
                </button>
                <div className="" ref={langRef}>
                  <div
                    className={`absolute  mt-2 w-fit border border-gray-200 bg-white bg-opacity-95 backdrop-blur-sm rounded-xl shadow-xl transform origin-top-left transition-all duration-150 ${
                      langOpen
                        ? "opacity-100 scale-100 pointer-events-auto"
                        : "opacity-0 scale-95 pointer-events-none"
                    }`}
                  >
                    <ul className="divide-y divide-gray-100">
                      {routing.locales.map((l) => (
                        <li key={l}>
                          <button
                            onClick={() => changeLanguage(l)}
                            className="w-full flex items-center px-3 py-2 hover:bg-gray-100 transition-colors rounded-xl"
                          >
                            <Image
                              src={`/images/${l}.svg`}
                              alt="Arrow Down"
                              width={30}
                              height={20}
                            />
                            <span className={`fi fi-${flagMap[l]} mr-2`} />
                            <span className="capitalize font-[400] font-['Libre_Baskerville'] text-[clamp(12px,0.938vw,20px)] flex-1">
                              {l}
                            </span>
                            {l === locale && (
                              <Check className="w-4 h-4 text-blue-600" />
                            )}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div> */}

              {/* auth buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <div className="w-full flex relative ">
                  {/* offers icon */}
                  {/* {token && (
                    <Link
                      href="/myprofile?page=tasks"
                      onClick={() => setMenuOpen(false)}
                      className="w-fit flex mx-auto relative"
                    >
                      <BadgePercent className="text-white" />
                      {showNotification && (
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                      )}
                    </Link>
                  )} */}
                  {/* chat icon */}
                  {/* {token ? (
                    <Link
                      href="/chats"
                      onClick={() => setMenuOpen(false)}
                      className="w-6 mx-auto h-6 relative"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.1706 20.8905C18.3536 20.6125 21.6856 17.2332 21.9598 12.9909C22.0134 12.1607 22.0134 11.3009 21.9598 10.4707C21.6856 6.22838 18.3536 2.84913 14.1706 2.57107C12.7435 2.47621 11.2536 2.47641 9.8294 2.57107C5.64639 2.84913 2.31441 6.22838 2.04024 10.4707C1.98659 11.3009 1.98659 12.1607 2.04024 12.9909C2.1401 14.536 2.82343 15.9666 3.62791 17.1746C4.09501 18.0203 3.78674 19.0758 3.30021 19.9978C2.94941 20.6626 2.77401 20.995 2.91484 21.2351C3.05568 21.4752 3.37026 21.4829 3.99943 21.4982C5.24367 21.5285 6.08268 21.1757 6.74868 20.6846C7.1264 20.4061 7.31527 20.2668 7.44544 20.2508C7.5756 20.2348 7.83177 20.3403 8.34401 20.5513C8.8044 20.7409 9.33896 20.8579 9.8294 20.8905C11.2536 20.9852 12.7435 20.9854 14.1706 20.8905Z"
                          fill="#192953"
                          stroke="white"
                          stroke-width="1.5"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M8.5 14.5H15.5M8.5 9.5H12"
                          stroke="white"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      {showNotificationChat !== 0 && (
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                      )}
                    </Link>
                  ) : (
                    <button
                      onClick={() => {
                        setAuthModalType("login");
                        setMenuOpen(false);
                      }}
                      className="text-white bg-transparent hover:bg-blue-600 border border-blue-40hover:border-blue-600 rounded-lg py-2 px-4 font-medium text-sm transition-colors w-full sm:w-auto"
                    >
                      {t("Login")}
                    </button>
                  )} */}

                  {/* user icon mobile */}
                  {/* {token ? (
                    <div className="relative mx-auto">
                      <button
                        onClick={() => setUserMbileMenuOpen((open) => !open)}
                        className="w-fit flex mx-auto relative"
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17 8.5C17 5.73858 14.7614 3.5 12 3.5C9.23858 3.5 7 5.73858 7 8.5C7 11.2614 9.23858 13.5 12 13.5C14.7614 13.5 17 11.2614 17 8.5Z"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <mask id="path-2-inside-1_107_998" fill="white">
                            <path d="M19 20.5C19 16.634 15.866 13.5 12 13.5C8.13401 13.5 5 16.634 5 20.5" />
                          </mask>
                          <path
                            d="M17.5 20.5C17.5 21.3284 18.1716 22 19 22C19.8284 22 20.5 21.3284 20.5 20.5H17.5ZM3.5 20.5C3.5 21.3284 4.17157 22 5 22C5.82843 22 6.5 21.3284 6.5 20.5H3.5ZM19 20.5H20.5C20.5 15.8056 16.6944 12 12 12V13.5V15C15.0376 15 17.5 17.4624 17.5 20.5H19ZM12 13.5V12C7.30558 12 3.5 15.8056 3.5 20.5H5H6.5C6.5 17.4624 8.96244 15 12 15V13.5Z"
                            fill="white"
                            mask="url(#path-2-inside-1_107_998)"
                          />
                        </svg>
                      </button>
                      <div
                        ref={userMobileMenuRef}
                        className={`absolute overflow-hidden left-1/2 transform -translate-x-1/2 mt-2 w-32 bg-white rounded-xl shadow-lg z-10 transition-all duration-150 ${
                          userMobileMenuOpen
                            ? "opacity-100 scale-100 pointer-events-auto"
                            : "opacity-0 scale-95 pointer-events-none"
                        }`}
                      >
                        <div className="py-1 flex items-center justify-center flex-col">
                          <Link
                            href="/myprofile?page=personal-info"
                            className="w-full text-center py-2 flex justify-center text-sm text-gray-700 hover:bg-gray-100 font-['Libre_Baskerville']"
                            onClick={() => {
                              setUserMbileMenuOpen(false); // Close user dropdown
                              setMenuOpen(false); // Close mobile menu
                            }}
                          >
                            {t("My Profile")}
                          </Link>

                          <button
                            type="button"
                            onClick={() => {
                              setUserMbileMenuOpen(false); // Close user dropdown
                              setMenuOpen(false); // Close mobile menu
                              logout(); // Perform logout
                            }}
                            className="block w-full text-center py-2 text-sm text-gray-700 hover:bg-gray-100 font-['Libre_Baskerville']"
                          >
                            {t("Logout")}
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href="/RegisterCompany"
                      className="w-full sm:w-auto"
                      onClick={() => setMenuOpen(false)}
                    >
                      <button className="text-white bg-blue-600 hover:bg-blue-700 rounded-lg py-2 px-4 font-medium text-sm transition-colors w-full">
                        {t("Register Moving Company")}
                      </button>
                    </Link>
                  )} */}
                </div>
              </div>
            </div>
          </div>
        {/* )} */}

        {/* {authModalType && (
          <AuthModal
            type={authModalType}
            onClose={() => setAuthModalType(null)}
            setForgotPassword={setOpenForgotPassword}
            openVerifyModal={() => setAuthModalType("verify")}
          />
        )}

        {openForgotPassword && (
          <ForgetPasswordModal onClose={() => setAuthModalType(null)} />
        )} */}
      </header>
    </>
  );
}
