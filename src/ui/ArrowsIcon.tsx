export const ArrowIcon = () => (
  <svg
    width="28" // Чуть увеличил для баланса с текстом 5xl
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org" // Исправлено
    className="inline-block"
  >
    <path
      d="M7 13L12 18L17 13"
      stroke="#3b82f6"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <animate
        attributeName="opacity"
        values="0;1;0"
        dur="1.5s"
        repeatCount="indefinite"
      />
    </path>
    <path
      d="M7 7L12 12L17 7"
      stroke="#3b82f6"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <animate
        attributeName="opacity"
        values="1;0;1"
        dur="1.5s"
        repeatCount="indefinite"
      />
    </path>
  </svg>
);
