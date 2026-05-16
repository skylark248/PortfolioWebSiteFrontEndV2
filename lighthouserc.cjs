module.exports = {
  ci: {
    collect: {
      staticDistDir: "./dist",
      url: [
        "http://localhost/",
        "http://localhost/404.html",
        // Phase 2+ adds: /blog/, one blog post URL, /projects/, one project URL,
        //               /case-studies/, one case-study URL, /resume, /contact.
      ],
      numberOfRuns: 3,
      settings: {
        preset: "desktop",
        emulatedFormFactor: "mobile",
        throttlingMethod: "simulate",
        throttling: {
          rttMs: 150,
          throughputKbps: 1638.4,
          cpuSlowdownMultiplier: 4,
        },
      },
    },
    assert: {
      assertions: {
        // D-13 Tier 1: BLOCK PR on Performance or Accessibility drop
        "categories:performance": ["error", { minScore: 0.9 }],
        "categories:accessibility": ["error", { minScore: 0.9 }],
        // D-13 Tier 2: WARN only on Best Practices or SEO drop
        "categories:best-practices": ["warn", { minScore: 0.9 }],
        "categories:seo": ["warn", { minScore: 0.9 }],
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
