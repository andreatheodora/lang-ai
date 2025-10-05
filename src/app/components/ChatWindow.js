import InputField from "./InputField";

export default function ChatWindow({ messages }) {
  return (
    <div className="w-full grow flex flex-col overflow-y-hidden">
      <div className="sm:text-lg grow flex flex-col gap-4 sm:py-4 overflow-y-scroll py-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
    </div>
  );
}
