import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

export default function ChatWindow({ messages }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div className="text-background w-full grow flex flex-col overflow-y-hidden">
      <div className="sm:text-lg grow flex flex-col gap-4 py-4 overflow-y-scroll">
        {messages.map((msg) =>
          msg.sender == "tutor" ? (
            <div key={msg.id} className="text-[var(--writing)] tutor">
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
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
