// Flight Wall relay for Vercel (free Hobby plan).
// The page and this relay share one address, so the browser allows it.
// It only forwards requests to the free flight-data hosts listed below.
export const config = { runtime: "edge" };

const ALLOWED = ["api.adsb.lol", "api.airplanes.live", "opendata.adsb.fi", "api.adsbdb.com"];
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default async function handler(request) {
  if (request.method === "OPTIONS") return new Response(null, { headers: CORS });

  let target;
  try {
    target = new URL(new URL(request.url).searchParams.get("url"));
  } catch {
    return new Response("Flight Wall relay is running. Add ?url=...", { status: 400, headers: CORS });
  }
  if (target.protocol !== "https:" || !ALLOWED.includes(target.hostname)) {
    return new Response("Host not allowed", { status: 403, headers: CORS });
  }

  try {
    const upstream = await fetch(target.toString(), {
      method: request.method === "POST" ? "POST" : "GET",
      headers: { "Content-Type": "application/json", "User-Agent": "FlightWall-relay" },
      body: request.method === "POST" ? await request.text() : undefined,
    });
    const headers = new Headers(CORS);
    headers.set("Content-Type", upstream.headers.get("Content-Type") || "application/json");
    headers.set("Cache-Control", "no-store");
    return new Response(upstream.body, { status: upstream.status, headers });
  } catch (e) {
    return new Response("Upstream unreachable", { status: 502, headers: CORS });
  }
}
