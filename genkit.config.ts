module.exports = {
  // Specify the entry points for your AI flows
  entry: ['src/ai/dev.ts'],
  // Optional: Configure providers if needed
  providers: {
    mistral: {
      apiKey: process.env.MISTRAL_API_KEY,
    },
  },
};
