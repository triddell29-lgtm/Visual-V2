# Decisions

## KEEP

- Seismic deformation driven by recent earthquake activity.
- Direct manipulation of the reflective surface.
- A fixed orb position so interaction changes orientation, not location.
- A restrained black atmosphere that keeps reflected light legible.
- Exactly two primary inputs: seismic input (API or manual) and direct interaction (drag). Every other control is a source or playback of one of those two.

## CUT

- Automatic orb movement unrelated to earthquake activity.
- Decorative background grid lines that competed with the surface.
- A dashboard-heavy information treatment.
- Treating MANUAL as a third input alongside API and drag; it is a second source on the seismic channel, not a separate control.
- "Gesture" language for what is pointer/touch drag, not tracked gesture input.

## TIGHTEN

- Ripple intensity is limited and smoothed so normal earthquake activity reads as fluid motion instead of noise.
- Earthquake data remains subordinate to the artwork through a compact readout.
- The seismic scale chart is labeled and highlighted against the category currently driving the orb, rather than reading as an unrelated stats panel.

## ASK

Can live seismic data make the surface feel physically responsive rather than simply visualize data?

## V2 — Focus: State Shift

### KEEP

- Exactly two inputs: seismic input (API or manual) and direct interaction.
- The shader-based ripple as the single mechanism for all seismic response, now driven by two axes (intensity, sharpness) instead of one.

### CUT

- The "Experience an Earthquake" scripted playback control. It let a viewer sample past events without touching either real input, functioning as an unofficial third control and standing in for a fix the intensity-only ripple actually needed.

### TIGHTEN

- Magnitude and depth now combine into a smoothed, weighted read of current activity rather than the strongest single event driving everything.
- System status names one of four states (DORMANT, MURMUR, TREMOR, RUPTURE) instead of a three-tier intensity label, so the same word never covers two visibly different surfaces.
- Manual input is deliberately restricted to a fixed, shallow coupling — it can reach DORMANT, TREMOR, and RUPTURE, but never MURMUR — so the full state range stays tied to real data.

### ASK (v3 question)

Can the system hold a state through a brief lull in matching data (a few minutes without a new event in that band) rather than snapping back to DORMANT the instant the driving event ages out of the smoothing window?
