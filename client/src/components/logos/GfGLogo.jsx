export default function GfGLogo({ size = 64 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label="GeeksforGeeks">
      <rect width="64" height="64" rx="16" fill="#2F8D46" />
      <text x="32" y="39" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="700" fill="#fff">
        &lt;/&gt;
      </text>
    </svg>
  );
}
