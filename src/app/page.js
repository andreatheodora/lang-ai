"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { FiLogIn, FiSidebar, FiLogOut, FiArrowRight } from "react-icons/fi";
import { chat } from "@/lib/api/chatApi";
import ChatWindow from "./components/ChatWindow";
import InputField from "./components/InputField";
import Image from "next/image";

export default function Home() {
  const [language, setLanguage] = useState("German");
  const [messages, setMessages] = useState([]);
  const [level, setLevel] = useState("A1");
  const [vocabulary, setVocabulary] = useState([]);
  const [grammars, setGrammars] = useState([]);
  const [imageSrc, setImageSrc] = useState(`/${language.toLowerCase()}.png`);

  const [showModal, setShowModal] = useState(false);
  const [showLevelModal, setShowLevelModal] = useState(false);

  const languageRef = useRef(null);
  const levelRef = useRef(null);

  const handleSubmit = async (input) => {
    addMessage(input, "user");

    const safeInput = input.replace(/(["'])/g, "\\$1");

    const newInput = [
      {
        role: "user",
        parts: [{ text: safeInput }],
      },
    ];

    const history = messages.map((msg) => ({
      role: msg.sender,
      parts: [{ text: msg.text }],
    }));

    const newHistory = history.concat(newInput);
    console.log(newHistory);

    try {
      const res = await chat(newHistory, language, level, vocabulary, grammars);
      addMessage(JSON.stringify(res), "model");
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  const addMessage = useCallback((messageText, sender) => {
    const newMessage = {
      id: crypto.randomUUID(),
      text: messageText,
      sender: sender,
    };

    setMessages((prev) => [...prev, newMessage]);
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (languageRef.current && !languageRef.current.contains(e.target)) {
        setShowModal(false);
      }

      if (levelRef.current && !levelRef.current.contains(e.target)) {
        setShowLevelModal(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowModal, setShowLevelModal]);

  useEffect(() => {
    setImageSrc(`/${language.toLowerCase()}.png`);
    setMessages([]);
  }, [language]);

  useEffect(() => {
    const words = ["전통적이다", "지지율", "무기력하다"];
    localStorage.setItem("WORDS_KR", JSON.stringify(words));

    if (language == "Korean") {
      const wordsString = localStorage.getItem("WORDS_KR");
      setVocabulary(JSON.parse(wordsString));
    } else if (language == "German") {
    }
  }, []);

  return (
    <>
      <div className="mx-auto md:w-5xl font-sans h-[100dvh] md:w-5xl mx-auto px-4 sm:px-16 py-4 sm:py-8 flex flex-col justify-between">
        <div className="relative shrink-0 flex flex-row justify-between items-center pb-4">
          <div className="flex flex-row items-center gap-2">
            <button
              onClick={() => {
                setShowModal(true);
              }}
              className="relative w-8 h-8 rounded-full shadow-sm overflow-hidden flex items-center justify-center"
              style={{}}
            >
              <Image
                className="object-fit border-2 rounded-full border-white"
                src={imageSrc}
                width={32}
                height={32}
                alt="language"
              />
            </button>
            <button
              onClick={() => {
                setShowLevelModal(true);
              }}
              className="relative w-8 h-8 w-8 h-8 shadow-sm border-2 border-foreground rounded-full overflow-hidden flex items-center justify-center"
              style={{
                background: "var(--gradient)",
              }}
            >
              <label className="text-foreground">{level}</label>
            </button>

            {/*PROFICIENCY LEVEL MODAL */}
            {showLevelModal && (
              <div
                ref={levelRef}
                className="bg-foreground text-[var(--writing)] border-[#ebebeb] absolute w-auto left-10 top-10 z-30 px-4 py-3 sm:px-6 sm:py-4 bg-white rounded-xl text-center flex flex-col"
                style={{
                  boxShadow: "0 4px 24px 0 rgba(255,255,255,0.5)",
                }}
              >
                <h2 className="text-center text-sm hidden sm:block">
                  Select your level
                </h2>
                <div className="flex flex-col items-start sm:mt-2 gap-3 rounded-lg">
                  <div className="flex flex-row sm:justify-center items-center gap-3">
                    <button
                      onClick={() => {
                        setShowLevelModal(false);
                        setLevel("A1");
                      }}
                      className="relative w-8 h-8 sm:w-8 sm:h-8 rounded-full shadow-md overflow-hidden flex items-center justify-center"
                    >
                      A1
                    </button>
                    <label className="sm:block hidden">Beginner</label>
                  </div>

                  <div className="flex flex-row sm:justify-center items-center gap-3">
                    <button
                      onClick={() => {
                        setShowLevelModal(false);
                        setLevel("A2");
                      }}
                      className="relative w-8 h-8 sm:w-8 sm:h-8 rounded-full shadow-md overflow-hidden flex items-center justify-center"
                    >
                      A2
                    </button>
                    <label className="sm:block hidden">Elementary</label>
                  </div>

                  <div className="flex flex-row sm:justify-center items-center gap-3">
                    <button
                      onClick={() => {
                        setShowLevelModal(false);
                        setLevel("B1");
                      }}
                      className="relative w-8 h-8 sm:w-8 sm:h-8 rounded-full shadow-md overflow-hidden flex items-center justify-center"
                    >
                      B1
                    </button>
                    <label className="sm:block hidden">Intermediate</label>
                  </div>

                  <div className="flex flex-row sm:justify-center items-center gap-3">
                    <button
                      onClick={() => {
                        setShowLevelModal(false);
                        setLevel("B2");
                      }}
                      className="relative w-8 h-8 sm:w-8 sm:h-8 rounded-full shadow-md overflow-hidden flex items-center justify-center"
                    >
                      B2
                    </button>
                    <label className="sm:block hidden">
                      Upper Intermediate
                    </label>
                  </div>
                  <div className="flex flex-row sm:justify-center items-center gap-3">
                    <button
                      onClick={() => {
                        setShowLevelModal(false);
                        setLevel("C1");
                      }}
                      className="relative w-8 h-8 sm:w-8 sm:h-8 rounded-full shadow-md overflow-hidden flex items-center justify-center"
                    >
                      C1
                    </button>
                    <label className="sm:block hidden">Advanced</label>
                  </div>
                </div>
              </div>
            )}
            {/*LANGUAGE SELECTION MODAL */}
            {showModal && (
              <div
                ref={languageRef}
                className="bg-foreground text-[var(--writing)] border border-[#ebebeb] border-rounded absolute sm:w-auto left-0 top-10 z-30 px-4 py-4 sm:px-6 sm:py-4 bg-white rounded-xl text-center flex flex-col justify-center"
                style={{
                  boxShadow: "0 4px 24px 0 rgba(255,255,255,0.5)",
                }}
              >
                <h2 className="text-center text-sm hidden mb-2 sm:block">
                  Select language
                </h2>
                <div className="sm:flex grid grid-cols-1 sm:flex-col gap-3 sm:gap-4 rounded-lg">
                  <div className="flex flex-row items-center sm:justify-start justify-center gap-3">
                    <button
                      onClick={() => {
                        setShowModal(false);
                        setLanguage("Korean");
                      }}
                      className="relative w-8 h-8 rounded-full shadow-md overflow-hidden flex items-center"
                    >
                      <Image
                        className="border-white"
                        src="/korean.png"
                        fill={true}
                        sizes={16}
                        alt="language"
                      />
                    </button>
                    <label className="sm:block hidden">한국어</label>
                  </div>

                  <div className="flex flex-row items-center sm:justify-start justify-center gap-3">
                    <button
                      onClick={() => {
                        setShowModal(false);
                        setLanguage("German");
                      }}
                      className="relative w-8 h-8 rounded-full shadow-md overflow-hidden flex items-center"
                    >
                      <Image
                        className="border-white"
                        src="/german.png"
                        fill={true}
                        sizes={16}
                        alt="language"
                      />
                    </button>
                    <label className="sm:block hidden">Deutsch</label>
                  </div>

                  <div className="flex flex-row items-center sm:justify-start justify-center gap-3">
                    <button
                      onClick={() => {
                        setShowModal(false);
                        setLanguage("Mandarin");
                      }}
                      className="relative w-8 h-8 sm:w-8 sm:h-8 rounded-full shadow-md overflow-hidden flex items-center"
                    >
                      <Image
                        className="border-white"
                        src="/mandarin.png"
                        fill={true}
                        sizes={16}
                        alt="language"
                      />
                    </button>
                    <label className="sm:block hidden">中文</label>
                  </div>

                  <div className="flex flex-row items-center sm:justify-start justify-center gap-3">
                    <button
                      onClick={() => {
                        setShowModal(false);
                        setLanguage("Japanese");
                      }}
                      className="relative w-8 h-8 sm:w-8 sm:h-8 rounded-full shadow-md overflow-hidden flex items-center"
                    >
                      <Image
                        className="border-white"
                        src="/japanese.png"
                        fill={true}
                        sizes={16}
                        alt="language"
                      />
                    </button>
                    <label className="sm:block hidden">日本語</label>
                  </div>

                  <div className="flex flex-row items-center sm:justify-start justify-center gap-3">
                    <button
                      onClick={() => {
                        setShowModal(false);
                        setLanguage("English");
                      }}
                      className="relative w-8 h-8 sm:w-8 sm:h-8 rounded-full shadow-md overflow-hidden flex items-center"
                    >
                      <Image
                        className="border-white"
                        src="/english.png"
                        fill={true}
                        sizes={16}
                        alt="language"
                      />
                    </button>
                    <label className="sm:block hidden">English</label>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            className="text-[var(--tutor-text)] flex flex-row items-center gap-2"
            onClick={() => {}}
          >
            <label className="sm:block hidden">Sign in</label>
            <FiLogIn size={20} />
          </button>
        </div>
        <div className="grow flex flex-col min-h-0 justify-center items-center">
          <ChatWindow messages={messages} />
        </div>
        <div className="shrink-0">
          <InputField language={language} onSubmit={handleSubmit} />
        </div>
      </div>
    </>
  );
}
