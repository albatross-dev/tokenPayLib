import React from "react";
import Link from "next/link";
import Image from "next/image";
import { PartnerWithTranslations } from "../../types/tokenpay-partner.types";

interface PartnerCardProps {
  partner: PartnerWithTranslations;
}

export default function PartnerCard({ partner }: PartnerCardProps) {
  return (
    <Link
      href={partner.href}
      className="block group hover:bg-gray-50 rounded-lg p-3 transition-colors duration-200 border border-gray-100 bg-white shadow-md"
    >
      <div className="flex items-start space-x-3">
        {/* Partner Logo */}
        <div className="flex-shrink-0">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center p-2">
            <Image
              src={partner.logo}
              alt={partner.name}
              width={64}
              height={64}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Partner Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-600">{partner.name}</h3>
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{partner.description}</p>
        </div>
      </div>
    </Link>
  );
}

