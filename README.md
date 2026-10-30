# Flightwall

A browser version of [TheFlightWall](https://github.com/AxisNimble/TheFlightWall_OSS): live flights over your spot, shown as an LED wall with airline logos.

**Open it:** https://dodothy.github.io/Flightwall/flightwall.html

## Easiest live setup: Vercel (free, sign in with GitHub)

1. Go to vercel.com/new and tap **Continue with GitHub**.
2. Find **Flightwall** in the list and tap **Import**, then **Deploy**.
3. Open the address Vercel gives you (e.g. `https://flightwall-xxxx.vercel.app`). The page uses its built-in relay at `/api/relay` automatically.

## If the status line says "Demo data"

The free flight networks don't let other websites read their data directly. The page tries free public relays automatically. If those are down, use the Vercel setup above, or set up your own free Cloudflare relay (about 5 minutes, no payment details):

1. Sign up at dash.cloudflare.com (Free plan).
2. Go to **Workers & Pages** > **Create** > **Create Worker** (Hello World). Name it `flightwall-relay` and tap **Deploy**.
3. Tap **Edit code**, delete everything, paste the contents of `worker.js` from this repository, then tap **Deploy**.
4. Copy the Worker's address, e.g. `https://flightwall-relay.yourname.workers.dev`.
5. On the Flight Wall, tap the location button (◎), paste the address into **Live data relay**, and tap **Done**.

## Credits

- Font: Adafruit GFX classic 5x7 font
- Flight data: adsb.lol, airplanes.live, adsb.fi (community ADS-B networks); routes from adsbdb.com
- Logos: github.com/Jxck-S/airline-logos
