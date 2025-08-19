import React from "react";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { CategoryWithTranslations } from "../../types/tokenpay-partner.types";

interface CategoryCardProps {
  category: CategoryWithTranslations;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={category.href}
      className="group relative bg-white rounded-2xl aspect-square shadow-md overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer border border-gray-200 w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64"
    >
      {/* Category Card with Background Image */}
      <div className="relative h-full w-full p-4 flex items-center justify-center">
        {/* Background Image with blur and opacity */}
        {category.image && (
          <img
            src={category.image}
            alt={category.name}
            className="absolute inset-0 w-full h-full object-cover opacity-60 blur-sm"
            style={{ zIndex: 0 }}
          />
        )}

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-20" />

        {/* Long Black Arrow - Top Right */}
        <div className="absolute top-2 right-2 z-10">
          <ArrowUpRightIcon className="h-6 w-6 text-black" />
        </div>

        {/* Category Name - Centered */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h3 className="text-black font-bold text-base sm:text-lg lg:text-xl px-4 text-center">
            {category.name}
          </h3>
        </div>
      </div>
    </Link>
  );
}