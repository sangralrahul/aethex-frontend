const LOGO_URL = 'https://customer-assets.emergentagent.com/job_aethex-preview/artifacts/wil6kzyv_photo_2026-03-26_01-03-36.jpg';

export function AethexLogo({ size = 'default', showText = true, className = '' }) {
  const sizes = {
    sm: { icon: 32, text: 'text-lg' },
    default: { icon: 38, text: 'text-xl' },
    lg: { icon: 52, text: 'text-3xl' },
    xl: { icon: 72, text: 'text-5xl' },
  };
  const s = sizes[size] || sizes.default;

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`} data-testid="aethex-logo">
      <img
        src={LOGO_URL}
        alt="aethex"
        width={s.icon}
        height={s.icon}
        className="rounded-lg object-cover flex-shrink-0"
        style={{ width: s.icon, height: s.icon }}
      />
      {showText && (
        <span
          className={`${s.text} font-bold tracking-tight text-white`}
          style={{ fontFamily: 'Cabinet Grotesk, sans-serif' }}
        >
          aethex
        </span>
      )}
    </span>
  );
}

export function AethexLogoWhite({ size = 'default', showText = true, className = '' }) {
  return <AethexLogo size={size} showText={showText} className={className} />;
}
