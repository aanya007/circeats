interface LogoMarkProps {
  /* nav = green fill / black stroke; footer = lime fill / off-white stroke */
  variant?: "nav" | "footer";
}

export default function LogoMark({ variant = "nav" }: LogoMarkProps) {
  const isFooter = variant === "footer";
  return (
    <svg viewBox="0 0 80 80" fill="none" width="22" height="22" aria-hidden="true">
      <ellipse cx="40" cy="42" rx="22" ry="26" fill={isFooter ? "#C8F169" : "#3D8B5F"} />
      <path
        d="M40 16Q44 6 48 12"
        stroke={isFooter ? "#F7F5F2" : "#0F0F0F"}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      {!isFooter && (
        <ellipse cx="48" cy="12" rx="7" ry="4.5" fill="#3D8B5F" stroke="#0F0F0F" strokeWidth="2" />
      )}
    </svg>
  );
}
