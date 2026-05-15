module.exports = {
  rules: {
    "declaration-property-value-disallowed-list": {
      "/^(transition|animation)-duration$/": ["/^(?!.*var\\(--motion-duration-).*$/i"],
      "/^(transition|animation)$/": ["/^(?!.*var\\(--motion-).*\\d+m?s.*$/i"],
    },
  },
};
