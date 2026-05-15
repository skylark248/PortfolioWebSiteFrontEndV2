// lighthouserc.cjs — Plan 04 fills in full assertion config; this is the scaffold
module.exports = {
  ci: {
    collect: {
      staticDistDir: "./dist",
      url: ["http://localhost/", "http://localhost/404"],
      numberOfRuns: 1, // overridden to 3 in Plan 04
    },
    assert: { assertions: {} }, // populated in Plan 04 per D-13
    upload: { target: "temporary-public-storage" },
  },
};
