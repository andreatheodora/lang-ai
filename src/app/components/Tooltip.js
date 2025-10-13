"use client";

export default function Tooltip({ text, children }) {
  return (
    <div className="z-30 absolute top-0 left-1/2 -translate-x-1/2 group-hover:inline-block hidden">
      {children}
      <span
        className="absolute
          -top-8 left-1/2 -translate-x-1/2 
          bg-gray-800 text-white text-sm 
          px-2 py-1 rounded-md 
          opacity-100
          transition 
          whitespace-nowrap
        "
      >
        {text}a very long adksjfasdfasasdfasd
        {/* Tooltip arrow */}
        <span
          className="
            absolute left-1/2 top-full -translate-x-1/2
            border-4 border-transparent border-t-gray-800
          "
        />
      </span>
    </div>
  );
}
