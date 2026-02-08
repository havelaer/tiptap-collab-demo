import type { TextBlock } from "@anthropic-ai/sdk/resources";
import { os } from "@orpc/server";
import { z } from "zod";
import { anthropic } from "../services/anthropic";
import { search } from "../services/wikipedia";

export const findSources = os
    .input(
        z.object({
            query: z.string().min(1),
        }),
    )
    .output(
        z.array(
            z.object({
                title: z.string(),
                snippet: z.string(),
                url: z.string(),
            }),
        ),
    )
    .handler(async ({ input }) => {
        const message = await anthropic.messages.create({
            model: "claude-haiku-4-5-20251001",
            max_tokens: 100,
            messages: [
                {
                    role: "user",
                    content: `Extract 1-2 key search terms from this text for finding reliable sources. Return only the terms, comma-separated:

                        "${input.query}"`,
                },
            ],
        });

        const terms = (message.content[0] as TextBlock).text.trim().split(",");

        return await search(terms.join(","));
    });

export const findSourcesMock = os
    .input(
        z.object({
            query: z.string(),
        }),
    )
    .output(
        z.array(
            z.object({
                title: z.string(),
                snippet: z.string(),
                url: z.string(),
            }),
        ),
    )
    .handler(async () => {
        return [
            {
                title: "Rampjaar 1672",
                snippet:
                    'Het jaar <span class="searchmatch">1672</span> staat in de Nederlandse geschiedenis bekend als het <span class="searchmatch">Rampjaar</span>. Volgens een Nederlands gezegde was &quot;de regering radeloos, het volk redeloos',
                url: "https://nl.wikipedia.org/wiki/Rampjaar_1672",
            },
            {
                title: "Moord op de gebroeders De Witt",
                snippet:
                    'gebroeders Johan en Cornelis de Witt werden op 20 augustus van het <span class="searchmatch">Rampjaar</span> <span class="searchmatch">1672</span> in &#039;s-Gravenhage vermoord door leden van plaatselijke schutterijen.',
                url: "https://nl.wikipedia.org/wiki/Moord_op_de_gebroeders_De_Witt",
            },
            {
                title: "1672",
                snippet:
                    '<span class="searchmatch">1672</span> is het 72e jaar in de 17e eeuw volgens de christelijke jaartelling en staat in Nederland bekend als het <span class="searchmatch">Rampjaar</span>. januari 26 - De Groninger kapitein',
                url: "https://nl.wikipedia.org/wiki/1672",
            },
            {
                title: "Beleg van Doesburg",
                snippet:
                    'inname van Doesburg vond plaats tijdens de Hollandse Oorlog en het <span class="searchmatch">Rampjaar</span> <span class="searchmatch">1672</span>. De Fransen waren begin juni via Lobith de republiek binnen gevallen',
                url: "https://nl.wikipedia.org/wiki/Beleg_van_Doesburg",
            },
        ];
    });
