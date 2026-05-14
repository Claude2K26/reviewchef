import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard/", "/reviews/", "/settings/", "/api/", "/checkout/", "/auth/"],
    },
    sitemap: "https://reviewchef.vercel.app/sitemap.xml",
  };
}
