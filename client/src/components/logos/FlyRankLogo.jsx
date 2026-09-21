export default function FlyRankLogo({ size = 64 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label="FlyRank">
      <defs>
        <linearGradient id="flyrank-gradient" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#b8431a" />
          <stop offset="1" stopColor="#d99535" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="url(#flyrank-gradient)" />
      <path d="M13 48 32 13l19 35H40l-3.1-6.2H27L23.8 48H13Zm18.1-15.3h1.8L32 28.8l-.9 3.9Z" fill="#fff7e9" />
      <path d="M22 20h22" stroke="#141413" strokeWidth="3" strokeLinecap="round" opacity=".35" />
    </svg>
  );
}
