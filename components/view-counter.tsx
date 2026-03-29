"use client";

import { useEffect, useState } from "react";

export function ViewCounter() {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/views", { method: "POST" })
      .then((r) => r.json())
      .then((d) => setViews(d.views))
      .catch(() => {});
  }, []);

  if (views === null) return null;

  return (
    <p className="text-center text-xs text-gray-400 py-4">
      👀 已有 <span className="font-semibold text-gray-600">{views.toLocaleString()}</span> 人次瀏覽
    </p>
  );
}
