import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.twtaxcalc.com";
  // Use a fixed date per deploy rather than new Date() on every request
  const lastDeploy = new Date("2026-03-29T19:00:00Z");

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
    {
      url: `${base}/severance-calculator`,
      lastModified: lastDeploy,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/salary-calculator`,
      lastModified: lastDeploy,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/bonus-calculator`,
      lastModified: lastDeploy,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/pension-calculator`,
      lastModified: lastDeploy,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/basic-living-deduction`,
      lastModified: lastDeploy,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/labor-insurance-rates`,
      lastModified: lastDeploy,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/income-tax-brackets`,
      lastModified: new Date("2026-03-30T08:00:00Z"),
      changeFrequency: "yearly",
      priority: 0.9,
    },
    {
      url: `${base}/dependent-deduction`,
      lastModified: new Date("2026-03-30T18:00:00Z"),
      changeFrequency: "yearly",
      priority: 0.9,
    },
    {
      url: `${base}/freelancer-tax-guide`,
      lastModified: new Date("2026-03-30T22:00:00Z"),
      changeFrequency: "yearly",
      priority: 0.9,
    },
  ];
}
