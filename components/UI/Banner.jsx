import Link from "next/link";
import { BsArrowUpRight } from "react-icons/bs";

/**
 * Banner component that renders a styled link with an arrow icon.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.color - The background color class for the banner.
 * @param {string} props.href - The URL to which the banner should link.
 * @param {React.ReactNode} props.children - The content to be displayed inside the banner.
 *
 * @returns {JSX.Element} The rendered Banner component.
 */
export default function Banner({ color, href, children, rounded="" }) {
  return <Link href={href}>
    <div
      className={`${color} ${rounded} text-white font-bold px-4 py-1 flex flex-row justify-between items-center`}
    >
      <div>{children}</div>
      <BsArrowUpRight className="ml-4"></BsArrowUpRight>
    </div>
  </Link>;
}