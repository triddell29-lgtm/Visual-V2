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
2. Recent, stronger, and shallower earthquakes create deeper, faster, sharper ripples, whether the seismic input comes from the API or MANUAL.
3. The system smooths seismic changes toward a resting state.
4. Dragging changes orientation without moving the orb's location, and never affects ripple intensity.
5. Manual mode overrides API-driven intensity on the same seismic channel until API mode is restored.
6. Magnitude and depth together resolve into one of four named states — DORMANT, MURMUR, TREMOR, RUPTURE — instead of one continuous intensity value.

## V2 — Focus: state shift

V1 could vary how fast and how far the surface moved, but two earthquakes of the same magnitude still read as the same event at a different speed. V2 folds earthquake depth into the ripple as a second axis (sharpness): shallow, strong activity now buckles the surface into a sharp RUPTURE, while deep activity swells slowly as a diffuse MURMUR, with TREMOR and DORMANT filling the range between. The "Experience an Earthquake" scripted playback from V1 was cut — it was a demo of intensity that stood in for a fix the system actually needed. Manual mode keeps a single slider but is fixed to a shallow coupling, so it can reach DORMANT, TREMOR, and RUPTURE but never MURMUR; only live data can produce the full range of states. See [docs/decisions.md](docs/decisions.md) for the full V1 and V2 keep/cut/tighten notes and [process/changelog.md](process/changelog.md) for the build history.

## Technology and data

Built with Vite and Three.js. Earthquake data is provided by the USGS Earthquake Hazards Program through its all-day GeoJSON feed. The feed is polled every 60 seconds.

## Development

```bash
npm install
npm run dev
```

Build with `npm run build`.

## Credits

GROUND STATE / INTERACTIVE SYSTEM V2 / 2026  
Built by Tate.
