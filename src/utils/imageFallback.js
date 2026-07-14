const FALLBACK_IMAGE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <rect width="200" height="200" fill="#E9E1F5"/>
      <g fill="none" stroke="#8A7E99" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">
        <rect x="40" y="55" width="120" height="90" rx="8"/>
        <circle cx="75" cy="88" r="10"/>
        <path d="M40 130l35-30 25 22 30-28 30 26"/>
      </g>
    </svg>`
  );

export const handleImgError = (e) => {
  e.currentTarget.onerror = null;
  e.currentTarget.src = FALLBACK_IMAGE;
};

export default FALLBACK_IMAGE;
