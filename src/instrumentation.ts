export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { assertStripePriceEnv } = await import("@/lib/env");
    assertStripePriceEnv();
  }
}
