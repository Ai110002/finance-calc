import { Redis } from "@upstash/redis";

const KEY = "email_subscribers";

function getRedis() {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) throw new Error("Redis not configured");
  return new Redis({ url, token });
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body.email !== "string") {
      return Response.json({ error: "請輸入有效的 Email" }, { status: 400 });
    }

    const normalized = body.email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
      return Response.json({ error: "請輸入有效的 Email" }, { status: 400 });
    }

    const redis = getRedis();
    await redis.sadd(KEY, normalized);

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "系統錯誤，請稍後再試" }, { status: 500 });
  }
}
