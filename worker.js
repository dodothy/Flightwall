// Flight Wall relay: a tiny Cloudflare Worker (free plan) that lets the
// Flight Wall page read free ADS-B flight data. The flight networks don't
// allow other websites to read them directly, so this adds the missing
// permission (CORS) header. It only talks to the hosts listed below.
const ALLOWED = [
  "api.adsb.lol",
  "api.airplanes.live",
  "opendata.adsb.fi",
  "api.adsbdb.com",
];
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default {
  async fetch(request) {
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

    const upstream = await fetch(target.toString(), {
      method: request.method === "POST" ? "POST" : "GET",
      headers: { "Content-Type": "application/json", "User-Agent": "FlightWall-relay" },
      body: request.method === "POST" ? await request.text() : undefined,
    });

    const headers = new Headers(CORS);
    headers.set("Content-Type", upstream.headers.get("Content-Type") || "application/json");
    headers.set("Cache-Control", "no-store");
    return new Response(upstream.body, { status: upstream.status, headers });
  },
};
