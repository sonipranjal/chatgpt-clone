import { api } from "@/utils/api";
import { Send } from "lucide-react";
import React, { useState } from "react";

const Home = () => {
  const [prompt, setPrompt] = useState("");
  const sendMessage = api.openai.chatCompletion.useMutation({
    onSuccess: (data) => {
      console.log(data);
      setPrompt("");
    },
  });

  return (
    <div className="flex h-screen w-screen">
      {/* sidebar */}
      <div className="flex h-full w-[15%] flex-col bg-neutral-800"></div>
      {/* main component */}
      <div className="relative w-[85%] bg-zinc-700">
        <div className="absolute bottom-2 flex w-full flex-col items-center justify-center">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!prompt) {
                alert("prompt is empty");
              }
              sendMessage.mutate({
                messageFromUser: prompt,
              });
            }}
            className="relative w-[600px]"
          >
            <input
              type="text"
              className="my-3 w-full rounded border-none bg-[#202123] px-4 py-2 text-sm text-white shadow-md outline-none"
              placeholder="Send a message..."
              onChange={(e) => setPrompt(e.target.value)}
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
