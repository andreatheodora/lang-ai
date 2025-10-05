import { useState, useCallback, useRef, useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import {
  PLACEHOLDERS_DE,
  PLACEHOLDERS_KR,
  PLACEHOLDERS_DEFAULT,
} from "../constants";

export default function InputField({ language, onSubmit }) {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  const [placeholders, setPlaceholders] = useState(PLACEHOLDERS_DE);

  // 1. Core Logic: Function to handle the height adjustment
  const autoExpand = useCallback(() => {
    const field = inputRef.current;
    if (field) {
      // Temporarily reset height to 'auto' to correctly calculate scrollHeight
      field.style.height = "auto";

      // Set the new height based on the content's scroll height
      field.style.height = `${field.scrollHeight}px`;
    }
  }, []);

  // 3. Effect: Runs on mount and on value change to ensure height is correct
  useEffect(() => {
    // Call autoExpand initially to set the correct min-height
    autoExpand();
  }, [input, autoExpand]); // Reruns whenever the value changes

  useEffect(() => {
    if (language == "Korean") {
      setPlaceholders(PLACEHOLDERS_KR);
    } else if (language == "German") {
      setPlaceholders(PLACEHOLDERS_DE);
    } else {
      setPlaceholders(PLACEHOLDERS_DEFAULT);
    }
  }, [language]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPlaceholder, setCurrentPlaceholder] = useState(placeholders[0]);

  useEffect(() => {
    const updatePlaceholder = () => {
      const nextIndex = (currentIndex + 1) % placeholders.length;

      setCurrentIndex(nextIndex);
      setCurrentPlaceholder(placeholders[nextIndex]);
    };

    const intervalId = setInterval(updatePlaceholder, 3000);

    return () => clearInterval(intervalId);
  }, [currentIndex, placeholders]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input) {
        onSubmit(input);
        setInput("");
      }
    }
  };
  return (
    <div
      className="font-sans bg-white sm:w-4xl px-2 py-1 sm:py-2 bg-white border border-[#ebebeb] rounded-xl items-center gap-1 sm:gap-4 mx-auto flex flex-row shadow-lg"
      style={{
        boxShadow: "0 4px 24px 0 rgba(255,255,255,0.5)",
        fontWeight: 300,
      }}
    >
      <textarea
        ref={inputRef}
        onKeyDown={handleKeyDown}
        className="w-full focus:outline-none overflow-y-auto max-h-32 resize-none"
        style={{
          padding: "10px",
          fontSize: "16px",
          transition: "all 0.5s ease",
        }}
        rows={1}
        placeholder={currentPlaceholder}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <button
        onClick={() => {
          onSubmit(input);
          setInput("");
        }}
      >
        <FiArrowRight size={20} />
      </button>
    </div>
  );
}
