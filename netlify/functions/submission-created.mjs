// netlify/functions/submission-created.mjs
// Fires after every Netlify Forms submission.
// Validates Cloudflare Turnstile token to audit bot submissions.
// TURNSTILE_SECRET_KEY must be set in Netlify environment variables.

export const handler = async (event) => {
  let payload;
  try {
    payload = JSON.parse(event.body ?? "{}");
  } catch {
    console.error("[submission-created] Failed to parse event body");
    return { statusCode: 400, body: "Bad request" };
  }

  const token = payload.data?.["cf-turnstile-response"];

  if (!token) {
    console.warn("[submission-created] No Turnstile token in submission");
    return { statusCode: 200, body: "No token — logged" };
  }

  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.error("[submission-created] TURNSTILE_SECRET_KEY not configured");
    return { statusCode: 200, body: "Secret not configured — logged" };
  }

  const formData = new URLSearchParams();
  formData.append("secret", secret);
  formData.append("response", token);

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
    });
    const result = await res.json();

    if (!result.success) {
      console.warn("[submission-created] Turnstile validation FAILED", {
        errorCodes: result["error-codes"],
      });
      return { statusCode: 400, body: "Turnstile verification failed" };
    }

    console.info("[submission-created] Turnstile validation PASSED");
    return { statusCode: 200 };
  } catch (err) {
    console.error("[submission-created] Siteverify fetch error", err);
    return { statusCode: 200, body: "Siteverify error — logged" };
  }
};
