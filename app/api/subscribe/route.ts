import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const KEY = "email_subscribers";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "請輸入有效的 Email" }, { status: 400 });
  }

  // Store as a Redis set to avoid duplicates
  await redis.sadd(KEY, email);
  const count = await redis.scard(KEY);

  return Response.json({ success: true, count });
}

export async function GET() {
  const count = await redis.scard(KEY);
  return Response.json({ count });
}
