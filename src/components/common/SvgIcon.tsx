import { ICON_PATHS } from "@/constants/icons";

interface SvgIconProps extends React.SVGProps<SVGSVGElement> {
  name: keyof typeof ICON_PATHS;
  size?: number;
  className?: string;
  fill?: string;
}

export default function SvgIcon({ name, size = 20, className = "", fill = "", ...props }: SvgIconProps) {
  return (
    <svg
      className={`fill-current ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d={ICON_PATHS[name] || ICON_PATHS['unknown']} />
    </svg>
  );
}