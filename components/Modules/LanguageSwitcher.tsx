import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useTranslation } from "next-i18next";

interface Language {
  label: string;
  emoji: string;
}

interface Languages {
  [key: string]: Language;
}

const defaultLangs: Languages = {
  en: { label: "English", emoji: "US" },
  de: { label: "Deutsch", emoji: "DE" },
  fr: { label: "Français", emoji: "FR" },
};

export const smallDefaultLangs: Languages = {
  en: { label: "English", emoji: "US" },
  de: { label: "Deutsch", emoji: "DE" },
};

interface LanguageSwitcherProps {
  languages?: Languages;
}

export default function LanguageSwitcher({ languages = defaultLangs }: LanguageSwitcherProps) {
  const router = useRouter();
  const defaultLocale = "de";

  const { t } = useTranslation("common");

  // Set current locale, fallback to defaultLocale initially
  const [currentLocale, setCurrentLocale] = useState<string>(router.locale || defaultLocale);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // State to track if the menu should open upwards
  const [openUpwards, setOpenUpwards] = useState<boolean>(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // After mounting, update currentLocale based on client-side cookie if available
    const savedLocale = Cookies.get("NEXT_LOCALE") || router.locale;
    if (savedLocale && savedLocale !== currentLocale) {
      setCurrentLocale(savedLocale);
    }
    setIsMounted(true); // Ensure the component is mounted
  }, [router.locale, currentLocale]);

  // Function to change language
  const changeLanguage = (locale: string): void => {
    Cookies.set("NEXT_LOCALE", locale, { expires: 365 }); // Cookie expires in 1 year
    router.push(router.pathname, router.asPath, { locale });
    setCurrentLocale(locale); // Update state to avoid hydration mismatch
  };

  useEffect(() => {
    const handlePositionCheck = (): void => {
      if (buttonRef.current) {
        const buttonRect = buttonRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        if (viewportHeight - buttonRect.bottom < 150) {
          setOpenUpwards(true);
        } else {
          setOpenUpwards(false);
        }
      }
    };

    handlePositionCheck();

    window.addEventListener("resize", handlePositionCheck);
    return () => {
      window.removeEventListener("resize", handlePositionCheck);
    };
  }, []);

  if (!isMounted) return null; // Prevent rendering during SSR to avoid mismatch

  return (
    <div className="relative inline-block text-left">
      <Menu as="div" className="relative inline-block text-left">
        <div ref={buttonRef}>
          <MenuButton className="text-xl rounded-full white text-sm md:border border-gray-700 flex items-center gap-2 font-medium text-white focus:outline-none">
            <div className="ml-2 text-sm hidden md:inline-block font-bold text-gray-700 ">{t("HeaderBlock.lang")}</div>
            <div className="w-8 h-8 flex bg-uhuBlue text-sm items-center justify-center rounded-full hover:bg-darkBlue">
              <span>{languages[currentLocale]?.emoji ? languages[currentLocale]?.emoji : "-"}</span>
            </div>
          </MenuButton>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuItems
            className={`absolute right-0 w-36 mt-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none 
              ${openUpwards ? "bottom-full mb-2 origin-bottom-right" : "top-full mt-2 origin-top-right"}`}
          >
            {Object.keys(languages).map((locale) => (
              <MenuItem key={locale}>
                {({ active }: { active: boolean }) => (
                  <button
                    type="button"
                    onClick={() => changeLanguage(locale)}
                    className={`${
                      active ? "bg-gray-100" : "text-gray-900"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    <span className="mr-2 text-sm font-bold">{languages[locale]?.emoji}</span>
                    {languages[locale].label}
                  </button>
                )}
              </MenuItem>
            ))}
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
}
