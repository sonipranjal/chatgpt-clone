import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

import { Configuration, OpenAIApi } from "openai";
import { env } from "@/env.mjs";
// https://platform.openai.com/account/api-keys
const configuration = new Configuration({
  apiKey: env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const openaiRouter = createTRPCRouter({
  chatCompletion: publicProcedure
    .input(
      z.object({
        messageFromUser: z.string(),
      })
    )
    .mutation(async ({ input: { messageFromUser } }) => {
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        temperature: 0.8,
        messages: [{ role: "user", content: messageFromUser }],
      });

      console.log(response.data.choices);

      return response.data;
    }),
});
