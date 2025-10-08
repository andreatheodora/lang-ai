"use client";

import { useState } from "react";

import {
  IoIosCloseCircleOutline,
  IoIosCheckmarkCircleOutline,
  IoIosAdd,
} from "react-icons/io";

export default function TutorMsg({ text }) {
  const [showTranslation, setShowTranslation] = useState(false);

  const obj = JSON.parse(text);
  const incorrect_sentence = obj.incorrect_sentence;
  //obj.match(/<incorrect_sentence>(.*?)<\/incorrect_sentence>/)[1] || "";
  const correction = obj.correction;
  // obj.match(/<corrected_sentence>(.*?)<\/corrected_sentence>/)[1] || "";
  const reply = obj.reply;
  const translation = obj.translation;

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

      <div className="text-[var(--tutor-text)] bg-white px-4 pt-1 pb-2 w-fit rounded-xl rounded-bl-none shadow-md">
        <span className="text-[12px]">TUTOR</span>
        <div>{reply}</div>
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
