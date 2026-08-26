# GROUND STATE

GROUND STATE is an interactive system translating live earthquake activity into movement and deformation. A reflective orb responds to seismic activity and direct manipulation.

## Controls

- Hold and drag across the surface to rotate it.
- Horizontal movement changes orientation.
- Vertical movement changes viewing angle.
- Switch from API to MANUAL and use the slider to increase seismic intensity.
- Use FULLSCREEN to expand only the orb and earthquake stats box.

## Rules

1. Recent and stronger earthquakes create deeper, faster ripples.
2. The system smooths seismic changes toward a resting state.
3. Dragging changes orientation without moving the orb's location.
4. Manual mode replaces API-driven intensity until API mode is restored.

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
# Visual-V2
