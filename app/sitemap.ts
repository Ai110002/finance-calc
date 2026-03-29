import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.twtaxcalc.com";
  // Use a fixed date per deploy rather than new Date() on every request
  const lastDeploy = new Date("2026-03-29");

  return [
    {
      url: base,
      lastModified: lastDeploy,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/tax-calculator`,
      lastModified: lastDeploy,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/mortgage`,
      lastModified: lastDeploy,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/overtime-calculator`,
      lastModified: lastDeploy,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
