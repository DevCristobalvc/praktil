import Image from "next/image";

type LogoProps = {
  size?: number;
  priority?: boolean;
  className?: string;
};

export function Logo({ size = 120, priority = false, className }: LogoProps) {
  return (
    <Image
      src="/logo.png"
      alt="Praktil"
      width={size}
      height={size}
      priority={priority}
      className={`rounded-full ${className ?? ""}`}
    />
  );
}
