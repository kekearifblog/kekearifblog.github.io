import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import partytown from "@astrojs/partytown";
import react from "@astrojs/react";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://kekearif.com/",
  integrations: [
    tailwind({
      config: {
        applyBaseStyles: false
      }
    }),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
    react(), sitemap(),
  ],
  markdown: {
    remarkPlugins: [remarkToc, [remarkCollapse, {
      test: "Table of contents"
    }]],
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: false
    },
    extendDefaultPlugins: true
  }
});