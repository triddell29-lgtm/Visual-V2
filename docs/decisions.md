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
