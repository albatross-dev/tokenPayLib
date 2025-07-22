import Link from "next/link";
import { BsArrowUpRight } from "react-icons/bs";
import React, { ReactNode } from "react";

interface BannerProps {
  color: string;
  href: string;
  children: ReactNode;
  rounded?: string;
}

/**
 * Banner component that renders a styled link with an arrow icon.
 */
export default function Banner({ color, href, children, rounded = "" }: BannerProps) {
  return <Link href={href}>
    <div
      className={`${color} ${rounded} text-white font-bold px-4 py-1 flex flex-row justify-between items-center`}
    >
      <div>{children}</div>
      <BsArrowUpRight className="ml-4" />
    </div>
  </Link>;
} 