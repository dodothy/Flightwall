# Flightwall

A browser version of [TheFlightWall](https://github.com/AxisNimble/TheFlightWall_OSS): live flights over your spot, shown as an LED wall with airline logos.

**Open it:** https://dodothy.github.io/Flightwall/flightwall.html

## If the status line says "Demo data"

The free flight networks don't let other websites read their data directly. The page tries free public relays automatically. If those are down, set up your own free relay (about 5 minutes, no payment details):

1. Sign up at dash.cloudflare.com (Free plan).
2. Go to **Workers & Pages** > **Create** > **Create Worker** (Hello World). Name it `flightwall-relay` and tap **Deploy**.
3. Tap **Edit code**, delete everything, paste the contents of `worker.js` from this repository, then tap **Deploy**.
4. Copy the Worker's address, e.g. `https://flightwall-relay.yourname.workers.dev`.
5. On the Flight Wall, tap the location button (◎), paste the address into **Live data relay**, and tap **Done**.

## Credits

- Font: Adafruit GFX classic 5x7 font
- Flight data: adsb.lol, airplanes.live, adsb.fi (community ADS-B networks); routes from adsbdb.com
- Logos: github.com/Jxck-S/airline-logos
