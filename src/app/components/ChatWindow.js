import InputField from "./InputField";
import ReactMarkdown from "react-markdown";

export default function ChatWindow({ messages }) {
  return (
    <div className="w-full grow flex flex-col overflow-y-hidden">
      <div className="sm:text-lg grow flex flex-col gap-4 sm:py-4 overflow-y-scroll py-4">
        {messages.map((msg) =>
          msg.sender == "tutor" ? (
            <ReactMarkdown key={msg.id}>{msg.text}</ReactMarkdown>
          ) : (
            <div key={msg.id} className={`${msg.sender}`}>
              {msg.text}
            </div>
          )
        )}
      </div>
    </div>
  );
}
