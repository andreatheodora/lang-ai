import { useEffect, useRef } from "react";
import TutorMsg from "./TutorMsg";
import ReactMarkdown from "react-markdown";

export default function ChatWindow({ messages }) {
  const bottomRef = useRef(null);

  const dummy = [
    {
      id: 1,
      sender: "model",
      text: `<incorrect_sentence>This is wrong</incorrect_sentence><corrected_sentence>Correction of the sentence</corrected_sentence><explanation>Explanation bla bla bla, you have to do this bla bla.</explanation><response>This text (text) is the AI's response. Dummy text, dummy text! Dummy text</response>`,
    },
  ];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div className="text-background w-full grow flex flex-col overflow-y-hidden">
      <div className="sm:text-lg grow flex flex-col gap-4 py-4 overflow-y-scroll">
        {messages.map((msg) =>
          msg.sender == "model" ? (
            <TutorMsg key={msg.id} text={msg.text} />
          ) : (
            <div key={msg.id} className={`${msg.sender}`}>
              {msg.text}
            </div>
          )
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
