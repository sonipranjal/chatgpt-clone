import { api } from "@/utils/api";
import { Loader2, Send } from "lucide-react";
import React, { useState } from "react";

type messageType = { role: "user" | "assistant"; content: string };

const Home = () => {
  const [messages, setMessages] = useState<messageType[]>([]);

  const [prompt, setPrompt] = useState("");
  const sendMessage = api.openai.chatCompletion.useMutation({
    onSuccess: (data) => {
      setPrompt("");
      const assistantContent = data.choices[0]?.message?.content;
      if (assistantContent) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: assistantContent,
          },
        ]);
      }
    },
  });

  return (
    <div className="flex h-screen w-screen">
      {/* sidebar */}
      <div className="flex h-full w-[15%] flex-col bg-neutral-800"></div>
      {/* main component */}
      <div className="relative h-full w-[85%] bg-zinc-700">
        <div className="h-full w-full overflow-y-scroll pb-52">
          {messages.map((obj, i) => (
            <div key={i}>
              {/* user message */}
              {obj.role === "user" && (
                <div className="flex items-center justify-center bg-[#444654] p-6 text-sm text-white">
                  <div className="flex w-full max-w-xl items-center justify-center space-x-4">
                    <div className="h-8 w-8 flex-none rounded-full bg-black/50"></div>
                    <div className="w-full">{obj.content}</div>
                  </div>
                </div>
              )}
              {/* the chatgpt message */}
              {obj.role === "assistant" && (
                <div className="flex items-center justify-center space-x-4 bg-[#343541] p-6 px-52 text-sm text-white">
                  <div className="flex w-full max-w-xl items-start justify-center space-x-4">
                    <div className="h-8 w-8 flex-none rounded-full bg-black/50">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/2048px-ChatGPT_logo.svg.png"
                        alt="chatgpt-logo"
                      />
                    </div>
                    <div className="w-full">{obj.content}</div>
                  </div>
                </div>
              )}
              {messages.length - 1 === i && sendMessage.isLoading && (
                <div className="flex items-center justify-center space-x-4 bg-[#343541] p-6 px-52 text-sm text-white">
                  <Loader2 className="h-5 w-5 animate-spin text-white" />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 flex w-full flex-col items-center justify-center bg-gray-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!prompt) {
                alert("prompt is empty");
              }
              const copyMessages: messageType[] = [
                ...messages,
                {
                  role: "user",
                  content: prompt,
                },
              ];
              setMessages(copyMessages);
              sendMessage.mutate({
                messages: copyMessages,
              });
            }}
            className="relative w-[600px]"
          >
            <input
              type="text"
              className="my-3 w-full rounded border-none bg-[#202123] px-4 py-2 text-sm text-white shadow-xl outline-none"
              placeholder="Send a message..."
              onChange={(e) => {
                setPrompt(e.target.value);
              }}
              value={prompt}
            />
            <button
              type="submit"
              className="absolute right-2 top-0 flex h-full items-center justify-center"
            >
              <Send className="h-4 w-4 text-white" />
            </button>
          </form>
          <div className="mb-1 text-[10px] text-white/50">
            <span className="underline">ChatGPT Mar 23 Version.</span> ChatGPT
            may produce inaccurate information about people, places, or facts
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
