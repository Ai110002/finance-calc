import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const KEY = "page_views";

export async function GET() {
  const views = (await redis.get<number>(KEY)) ?? 0;
  return Response.json({ views });
}

export async function POST() {
  const views = await redis.incr(KEY);
  return Response.json({ views });
}
