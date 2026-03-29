"use client";

import { useState } from "react";

export function EmailCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "發生錯誤");
      }

      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "發生錯誤");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 p-5 text-center">
        <div className="text-2xl">✅</div>
        <p className="mt-2 font-semibold text-green-700">訂閱成功！</p>
        <p className="mt-1 text-sm text-green-600">
          報稅季最新省稅攻略會直接寄到你信箱
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-5">
      <div className="text-center">
        <p className="text-lg font-bold text-gray-800">
          📬 報稅季省稅攻略，免費訂閱
        </p>
        <p className="mt-1 text-sm text-gray-500">
          5 月報稅前，我們會寄給你最新的節稅技巧和注意事項
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          className="min-w-0 flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="whitespace-nowrap rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-50"
        >
          {status === "loading" ? "..." : "免費訂閱"}
        </button>
      </form>

      {status === "error" && (
        <p className="mt-2 text-center text-xs text-red-500">{errorMsg}</p>
      )}

      <p className="mt-3 text-center text-xs text-gray-400">
        不會發垃圾信，隨時可退訂
      </p>
    </div>
  );
}
