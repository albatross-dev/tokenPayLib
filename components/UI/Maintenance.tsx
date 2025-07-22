import { useTranslation } from "next-i18next";
import React, { useEffect, useRef, useState } from "react";
import { FaTools } from "react-icons/fa";

function Maintenance() {
  const { t } = useTranslation("common");
  const containerRef = useRef<HTMLDivElement>(null);
  const [showText, setShowText] = useState(true);
  const MIN_HEIGHT_THRESHOLD = 200; // Minimum height in pixels to show text

  useEffect(() => {
    const checkSize = () => {
      if (containerRef.current) {
        const height = containerRef.current.offsetHeight;
        setShowText(height >= MIN_HEIGHT_THRESHOLD);
      }
    };

    // Initial check
    checkSize();

    // Add resize listener
    window.addEventListener("resize", checkSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-col gap-2 items-center justify-center w-full h-full bg-gray-200/70 backdrop-blur-sm absolute top-0 left-0 z-[80]"
    >
      <FaTools className="w-8 h-8 text-gray-800" />
      {showText && (
        <div className="flex items-center flex-col gap-2 text-center">
          <h3>{t("maintenance.title")}</h3>
          <p className="text-center">{t("maintenance.p1")}</p>
        </div>
      )}
    </div>
  );
}

export default Maintenance;
