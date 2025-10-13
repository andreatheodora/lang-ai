"use client";

import { useState, useEffect } from "react";

import {
  IoIosCloseCircleOutline,
  IoIosCheckmarkCircleOutline,
  IoIosAdd,
} from "react-icons/io";

export default function TutorMsg({ text }) {
  const [showTranslation, setShowTranslation] = useState(false);
  const [romanizationArr, setRomanizationArr] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipNumber, setTooltipNumber] = useState(null);

  const obj = JSON.parse(text);
  const incorrect_sentence = obj.incorrect_sentence;
  const correction = obj.correction;
  const reply = obj.reply;
  const translation = obj.translation;
  const romanization = obj.romanization ?? "";

  useEffect(() => {
    if (romanization) {
      const arr = romanization.split(/[.!?]/);
      setRomanizationArr(arr);
    }
  }, []);

  return (
    <div className="flex flex-col gap-2">
      {incorrect_sentence && (
        <div className=" flex flex-row items-center gap-2 w-fit bg-white px-4 py-3 rounded-xl shadow-md text-[15px] text-[var(--writing)]">
          <IoIosCloseCircleOutline size={20} color="red" />
          {incorrect_sentence}
        </div>
      )}
      {correction && (
        <div className="flex flex-row items-center gap-2 w-fit bg-white px-4 py-3 rounded-xl shadow-md text-[15px] text-[var(--writing)]">
          <IoIosCheckmarkCircleOutline size={20} color="green" />
          {correction}
        </div>
      )}

      <div className="text-[var(--writing)] bg-white px-4 pt-1 pb-2 w-fit rounded-xl rounded-bl-none shadow-md">
        <span className="text-[12px]">TUTOR</span>
        {romanizationArr ? (
          <div>
            {reply.split(/(?<=[.!?])\s+/).map((sentence, i) => (
              <div key={i} className="group relative inline-block h-[30px]">
                <div
                  className="mr-1 whitespace-normal break-words"
                  onClick={(e) => {
                    setShowTooltip((prev) => !prev);
                    setTooltipNumber(i);
                  }}
                >
                  {sentence}
                </div>

                {showTooltip && tooltipNumber == i && (
                  <div className="z-50 absolute pt-2">
                    {" "}
                    <div className="relative inline-block">
                      {/* Arrow */}
                      <div
                        className="absolute left-1/2 -translate-x-1/2 bottom-full w-0 h-0 
                      border-l-8 border-l-transparent 
                      border-r-8 border-r-transparent 
                      border-b-8 border-b-gray-800"
                      ></div>
                      {/* Tooltip box */}
                      <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded-lg">
                        {romanizationArr[i]}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div>{reply}</div>
        )}

        <button
          className="text-[12px]"
          onClick={() => {
            setShowTranslation((prev) => !prev);
          }}
        >
          {showTranslation ? "Hide translation" : "Show translation"}
        </button>
        {showTranslation && <div>{translation}</div>}
      </div>
    </div>
  );
}
