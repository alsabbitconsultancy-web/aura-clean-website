import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
};

export function ShieldIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M12 3.2 19.2 6v5.4c0 4.4-2.9 8.3-7.2 9.4-4.3-1.1-7.2-5-7.2-9.4V6L12 3.2Z" />
      <path d="m8.8 12.1 2.1 2.1 4.3-4.4" />
    </svg>
  );
}

export function LeafIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M5 19c8.5-1.2 13.2-7.4 14-14-6.6.8-12.8 5.5-14 14Z" />
      <path d="M8.2 15.8C10 12.4 13.2 9.4 17.4 7.6" />
    </svg>
  );
}

export function DropIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M12 3.5c3.8 4.4 6.2 7.6 6.2 10.4A6.2 6.2 0 0 1 12 20.1a6.2 6.2 0 0 1-6.2-6.2C5.8 11.1 8.2 7.9 12 3.5Z" />
    </svg>
  );
}

export function ArrowIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M5 12h13" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function PhIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <circle cx="12" cy="12" r="8.2" />
      <path d="M9.2 15.2V8.8h2.4a2.2 2.2 0 1 1 0 4.4H9.2" />
      <path d="M15.4 8.8v6.4" />
    </svg>
  );
}

export function FlaskIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M9 4h6" />
      <path d="M10 4v5.2L6.4 18.2A2.4 2.4 0 0 0 8.6 21.5h6.8a2.4 2.4 0 0 0 2.2-3.3L13.8 9.2V4" />
      <path d="M8.2 15.2h7.6" />
    </svg>
  );
}

export function BanIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <circle cx="12" cy="12" r="8.2" />
      <path d="m7.2 7.2 9.6 9.6" />
    </svg>
  );
}

export function DermIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <circle cx="12" cy="8.2" r="3.1" />
      <path d="M6.4 19.2c.7-3.2 2.8-4.8 5.6-4.8s4.9 1.6 5.6 4.8" />
      <path d="M16.8 6.2c1.3.4 2.3 1.5 2.6 2.9" />
    </svg>
  );
}

export function StarShieldIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M12 3.2 19.2 6v5.4c0 4.4-2.9 8.3-7.2 9.4-4.3-1.1-7.2-5-7.2-9.4V6L12 3.2Z" />
      <path d="m12 8.4.9 1.9 2.1.3-1.5 1.5.4 2.1L12 13.2l-1.9 1 0.4-2.1-1.5-1.5 2.1-.3L12 8.4Z" />
    </svg>
  );
}

export function FamilyIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M12 11.2c3.8-3.2 8.2-.4 8.2 2.8 0 2.6-3.4 5.4-8.2 7.4-4.8-2-8.2-4.8-8.2-7.4 0-3.2 4.4-6 8.2-2.8Z" />
    </svg>
  );
}

export function LifeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M12 3.5c3.8 4.4 6.2 7.6 6.2 10.4A6.2 6.2 0 0 1 12 20.1a6.2 6.2 0 0 1-6.2-6.2C5.8 11.1 8.2 7.9 12 3.5Z" />
      <path d="M12 11v5" />
      <path d="M9.5 13.5h5" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

export function HomeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M4.5 11.2 12 4.8l7.5 6.4" />
      <path d="M7 10.8V19h10v-8.2" />
      <path d="M10 19v-4.2h4V19" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M6 6 18 18" />
      <path d="M18 6 6 18" />
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <circle cx="11" cy="11" r="6.2" />
      <path d="m20 20-3.4-3.4" />
    </svg>
  );
}

export function CartIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M4.2 5.2h1.7l1.8 10.4h10.6" />
      <path d="M7.4 7.6h12.1l-1.1 6.2H8.2" />
      <circle cx="9.2" cy="19.1" r="1.15" />
      <circle cx="16.6" cy="19.1" r="1.15" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 7.2A4.8 4.8 0 1 0 12 16.8 4.8 4.8 0 0 0 12 7.2Zm0 7.9A3.1 3.1 0 1 1 12 8.9a3.1 3.1 0 0 1 0 6.2Z" />
      <circle cx="17.4" cy="6.7" r="1.05" />
      <path d="M16.7 3H7.3A4.3 4.3 0 0 0 3 7.3v9.4A4.3 4.3 0 0 0 7.3 21h9.4a4.3 4.3 0 0 0 4.3-4.3V7.3A4.3 4.3 0 0 0 16.7 3Zm2.6 13.7a2.6 2.6 0 0 1-2.6 2.6H7.3a2.6 2.6 0 0 1-2.6-2.6V7.3A2.6 2.6 0 0 1 7.3 4.7h9.4a2.6 2.6 0 0 1 2.6 2.6v9.4Z" />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M14.2 21v-7.2h2.4l.4-2.9h-2.8V9.1c0-.8.2-1.4 1.4-1.4h1.5V5.1c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.2H8.7v2.9h2.3V21h3.2Z" />
    </svg>
  );
}

export function PinIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M12 21s6.2-5.2 6.2-10.2A6.2 6.2 0 0 0 12 4.6a6.2 6.2 0 0 0-6.2 6.2C5.8 15.8 12 21 12 21Z" />
      <circle cx="12" cy="10.8" r="2.2" />
    </svg>
  );
}
