/**
 * Loader component that displays a processing animation.
 * 
 * Precondition: 
 * - Tailwind
 * - i18n
 *
 * @component
 * @returns {JSX.Element} The Loader component.
 */

import React, { useState, useEffect, useId } from 'react'
import { useTranslation } from "next-i18next";

interface TextSlideControl {
  textSlide: number;
  setTextSlide: React.Dispatch<React.SetStateAction<number>>;
}

interface ProcessingAnimationProps {
  textSlideC: TextSlideControl;
  loading: boolean;
}

export default function Loader(): JSX.Element {
  const [textSlide, setTextSlide] = useState<number>(0);
  return (
    <ProcessingAnimation
      textSlideC={{ textSlide, setTextSlide }}
      loading
    />
  )
}

/**
 * ProcessingAnimation component that displays a spinning animation with text slides.
 * Important is that it has the texts in the common translation file in i18n.
 *
 * @component
 * @param {ProcessingAnimationProps} props - The component props.
 * @returns {JSX.Element} The ProcessingAnimation component.
 */
export const ProcessingAnimation: React.FC<ProcessingAnimationProps> = ({ textSlideC, loading }) => {
  const { textSlide, setTextSlide } = textSlideC;

  const { t } = useTranslation("common");

  const texts: string[] = [
    t("fact_1"),
    t("fact_2"),
    t("fact_3"),
    t("fact_4"),
    t("fact_5"),
    t("fact_6"),
    t("fact_7"),
    t("fact_8"),
    t("fact_9"),
    t("fact_10"),
    t("fact_11"),
    t("fact_12")
  ];
  
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (loading) {
      interval = setInterval(() => {
        setTextSlide((prev) => (prev + 1) % texts.length);
      }, 6000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [loading, setTextSlide, texts.length]);

  const id = useId();

  return (
    <div
      className="
      h-96 w-80
      overflow-hidden
      stroke-gray-300/70
      relative flex items-center justify-center
      sm:h-96 sm:w-96
      md:h-80 md:w-80 
      lg:h-[24rem] lg:w-[24rem]
    "
    >
      <svg
        viewBox="0 0 1026 1026"
        fill="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full animate-spin-slow"
      >
        <path
          d="M1025 513c0 282.77-229.23 512-512 512S1 795.77 1 513 230.23 1 513 1s512 229.23 512 512Z"
          stroke="#D4D4D4"
          strokeOpacity="0.2"
          strokeWidth="4"
        />
        <path
          d="M513 1025C230.23 1025 1 795.77 1 513"
          stroke={`url(#${id}-gradient-1)`}
          strokeLinecap="round"
          strokeWidth="4"
        />
        <defs>
          <linearGradient
            id={`${id}-gradient-1`}
            x1="1"
            y1="513"
            x2="1"
            y2="1025"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#2e3dff" />
            <stop offset="1" stopColor="#2e3dff" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <svg
        viewBox="0 0 1026 1026"
        fill="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full animate-spin-reverse-slower"
      >
        <path
          d="M913 513c0 220.914-179.086 400-400 400S113 733.914 113 513s179.086-400 400-400 400 179.086 400 400Z"
          stroke="#D4D4D4"
          strokeOpacity="0.2"
          strokeWidth="4"
        />
        <path
          d="M913 513c0 220.914-179.086 400-400 400"
          stroke={`url(#${id}-gradient-2)`}
          strokeLinecap="round"
          strokeWidth="4"
        />
        <defs>
          <linearGradient
            id={`${id}-gradient-2`}
            x1="913"
            y1="513"
            x2="913"
            y2="913"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#17d3f5" />
            <stop offset="1" stopColor="#17d3f5" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <div className="w-full sm:w-48 h-6 flex justify-center overflow-hidden">
        {texts.map((text, index) => (
          <div
            key={index}
            className={`text-center flex items-center text-gray-600 text-sm transition duration-300 absolute ${
              index < textSlide && "-translate-x-6 opacity-0"
            } ${index > textSlide && "translate-x-6 opacity-0"}`}
            style={{
              padding: "0 1rem",
            }}
          >
            <p className="px-6 sm:px-16">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
