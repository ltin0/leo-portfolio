import { ReactNode } from "react";

interface Props {
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  children: ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
}

export default function PixelBtn({
  href, onClick, variant = "primary", children, type = "button", disabled, className = ""
}: Props) {
  const base: React.CSSProperties = {
    fontFamily: "var(--pixel)",
    fontSize: 8,
    padding: "14px 24px",
    border: "2px solid",
    textDecoration: "none",
    display: "inline-block",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    transition: "all 0.2s",
    letterSpacing: 1,
  };
  const primary: React.CSSProperties = {
    ...base,
    borderColor: "var(--cyan)",
    color: "var(--bg)",
    background: "var(--cyan)",
  };
  const secondary: React.CSSProperties = {
    ...base,
    borderColor: "var(--border)",
    color: "var(--text-dim)",
    background: "transparent",
  };

  const style = variant === "primary" ? primary : secondary;

  if (href) {
    return (
      <a href={href} style={style} className={className}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} style={style} disabled={disabled} className={className}>
      {children}
    </button>
  );
}
