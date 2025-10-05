"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { FiLogIn, FiLogOut, FiArrowRight } from "react-icons/fi";
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

    const newInput = [
      {
        role: "user",
        parts: [{ text: input }],
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
      addMessage(res, "model");
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
  return (
    <>
      <div className="font-sans h-[100dvh] md:w-5xl mx-auto px-4 sm:px-16 py-4 sm:py-8 flex flex-col justify-between">
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
              className="relative w-8 h-8 w-8 h-8 shadow-sm border-2 border-white rounded-full overflow-hidden flex items-center justify-center"
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
                className="bg-foreground text-[var(--writing)] absolute w-[400px] left-10 top-10 z-50 px-6 py-4 bg-white w-auto rounded-xl text-center flex flex-col justify-center"
              >
                <h2 className="text-center text-[18px]">Select your level</h2>
                <div className="flex flex-col mt-2 gap-3 rounded-lg">
                  <div className="flex flex-row items-center gap-3">
                    <button
                      onClick={() => {
                        setShowLevelModal(false);
                        setLevel("A1");
                      }}
                      className="relative w-8 h-8 sm:w-8 sm:h-8 rounded-full shadow-md overflow-hidden flex items-center justify-center"
                    >
                      A1
                    </button>
                    <label>Beginner</label>
                  </div>

                  <div className="flex flex-row items-center gap-3">
                    <button
                      onClick={() => {
                        setShowLevelModal(false);
                        setLevel("A2");
                      }}
                      className="relative w-8 h-8 sm:w-8 sm:h-8 rounded-full shadow-md overflow-hidden flex items-center justify-center"
                    >
                      A2
                    </button>
                    <label>Elementary</label>
                  </div>

                  <div className="flex flex-row items-center gap-3">
                    <button
                      onClick={() => {
                        setShowLevelModal(false);
                        setLevel("B1");
                      }}
                      className="relative w-8 h-8 sm:w-8 sm:h-8 rounded-full shadow-md overflow-hidden flex items-center justify-center"
                    >
                      B1
                    </button>
                    <label>Intermediate</label>
                  </div>

                  <div className="flex flex-row items-center gap-3">
                    <button
                      onClick={() => {
                        setShowLevelModal(false);
                        setLevel("B2");
                      }}
                      className="relative w-8 h-8 sm:w-8 sm:h-8 rounded-full shadow-md overflow-hidden flex items-center justify-center"
                    >
                      B2
                    </button>
                    <label>Upper Intermediate</label>
                  </div>
                  <div className="flex flex-row items-center gap-3">
                    <button
                      onClick={() => {
                        setShowLevelModal(false);
                        setLevel("C1");
                      }}
                      className="relative w-8 h-8 sm:w-8 sm:h-8 rounded-full shadow-md overflow-hidden flex items-center justify-center"
                    >
                      C1
                    </button>
                    <label>Advanced</label>
                  </div>
                  <div className="flex flex-row items-center gap-3">
                    <button
                      onClick={() => {
                        setShowLevelModal(false);
                        setLevel("C2");
                      }}
                      className="relative w-8 h-8 sm:w-8 sm:h-8 rounded-full shadow-md overflow-hidden flex items-center justify-center"
                    >
                      C2
                    </button>
                    <label>Mastery</label>
                  </div>
                </div>
              </div>
            )}
            {/*LANGUAGE SELECTION MODAL */}
            {showModal && (
              <div
                ref={languageRef}
                className="bg-foreground text-[var(--writing)] absolute w-[400px] left-0 top-10 z-50 px-6 py-4 w-auto rounded-xl text-center flex flex-col justify-center"
              >
                <h2 className="text-center text-[18px]">Choose a language</h2>
                <div className="flex flex-col mt-2 gap-4 rounded-lg">
                  <div className="flex flex-row items-center gap-3">
                    <button
                      onClick={() => {
                        setShowModal(false);
                        setLanguage("Korean");
                      }}
                      className="relative w-8 h-8 sm:w-8 sm:h-8 rounded-full shadow-md overflow-hidden flex items-center justify-center"
                    >
                      <Image
                        className="border-white"
                        src="/korean.png"
                        fill={true}
                        alt="language"
                      />
                    </button>
                    <label>한국어</label>
                  </div>

                  <div className="flex flex-row items-center gap-3">
                    <button
                      onClick={() => {
                        setShowModal(false);
                        setLanguage("German");
                      }}
                      className="relative w-8 h-8 sm:w-8 sm:h-8 rounded-full shadow-md overflow-hidden flex items-center justify-center"
                    >
                      <Image
                        className="border-white"
                        src="/german.png"
                        fill={true}
                        alt="language"
                      />
                    </button>
                    <label>Deutsch</label>
                  </div>

                  <div className="flex flex-row items-center gap-3">
                    <button
                      onClick={() => {
                        setShowModal(false);
                        setLanguage("Mandarin");
                      }}
                      className="relative w-8 h-8 sm:w-8 sm:h-8 rounded-full shadow-md overflow-hidden flex items-center justify-center"
                    >
                      <Image
                        className="border-white"
                        src="/mandarin.png"
                        fill={true}
                        alt="language"
                      />
                    </button>
                    <label>中文</label>
                  </div>

                  <div className="flex flex-row items-center gap-3">
                    <button
                      onClick={() => {
                        setShowModal(false);
                        setLanguage("Japanese");
                      }}
                      className="relative w-8 h-8 sm:w-8 sm:h-8 rounded-full shadow-md overflow-hidden flex items-center justify-center"
                    >
                      <Image
                        className="border-white"
                        src="/japanese.png"
                        fill={true}
                        alt="language"
                      />
                    </button>
                    <label>日本語</label>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="text-[var(--writing)] flex flex-row gap-2">
            <label>Sign in</label>
            <button onClick={() => {}}>
              <FiLogIn size={20} />
            </button>
          </div>
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
