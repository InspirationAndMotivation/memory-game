import type { Config } from "@netlify/functions";
import { db } from "../../db/index.js";
import { scores } from "../../db/schema.js";
import { eq, desc, sql } from "drizzle-orm";

export default async (req: Request) => {
  if (req.method === "GET") {
    const url = new URL(req.url);
    const difficulty = url.searchParams.get("difficulty") ?? "easy";

    const rows = await db
      .select()
      .from(scores)
      .where(eq(scores.difficulty, difficulty.toLowerCase()))
      .orderBy(desc(scores.score))
      .limit(20);

    const ranked = rows.map((row, index) => ({ ...row, rank: index + 1 }));
    return Response.json(ranked);
  }

  if (req.method === "POST") {
    const body = await req.json();
    const { name, score, turns, time, mode, difficulty } = body;

    if (!name || score === undefined || turns === undefined || !time || !mode || !difficulty) {
      return new Response("Missing required fields", { status: 400 });
    }

    const [inserted] = await db
      .insert(scores)
      .values({ name, score, turns, time, mode, difficulty: difficulty.toLowerCase() })
      .returning();

    return Response.json(inserted, { status: 201 });
  }

  return new Response("Method not allowed", { status: 405 });
};

export const config: Config = {
  path: "/api/scores",
};
