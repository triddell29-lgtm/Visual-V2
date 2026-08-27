# GROUND STATE

GROUND STATE is an interactive system translating live earthquake activity into movement and deformation. Two inputs drive it: seismic input (live API data or a manual override, one channel with two sources) and direct interaction (drag to rotate).

## Controls

**Seismic input** — sets ripple depth and speed.
- API pulls live magnitude and recency from USGS by default.
- Switch the toggle to MANUAL to override the feed with the slider instead. It is the same seismic channel, not a separate control.

**Interaction / rotate** — sets orientation only, never intensity.
- Hold and drag across the surface to rotate it.
- Horizontal movement changes orientation.
- Vertical movement changes viewing angle.

Use FULLSCREEN to expand only the orb and earthquake stats box.

## Rules

1. Two inputs drive the system: seismic input and direct interaction.
2. Recent and stronger earthquakes create deeper, faster ripples, whether the seismic input comes from the API or MANUAL.
3. The system smooths seismic changes toward a resting state.
4. Dragging changes orientation without moving the orb's location, and never affects ripple intensity.
5. Manual mode overrides API-driven intensity on the same seismic channel until API mode is restored.

## Technology and data

Built with Vite and Three.js. Earthquake data is provided by the USGS Earthquake Hazards Program through its all-day GeoJSON feed. The feed is polled every 60 seconds.

## Development

```bash
npm install
npm run dev
```

Build with `npm run build`.

## Credits

GROUND STATE / INTERACTIVE SYSTEM V1 / 2026  
Built by Tate.
