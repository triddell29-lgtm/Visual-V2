# Changelog

## INIT

Created the Vite and Three.js baseline with a reflective orb.

## SIGIL

Established the reflective chrome surface, orbital ring, and fixed-position composition.

## BEHAVIOR

Connected earthquake magnitude and recent activity to surface deformation and ripple speed.

## GESTURE

Added drag interaction for orb orientation while keeping its location fixed.

## ATMOSPHERE

Added reflective light, room reflections, and a restrained black background treatment.

## V1

Integrated the live USGS earthquake feed, manual seismic mode, fullscreen orb box, live status, and project documentation.

## V1.1

Responded to a second review pass. Named the two primary inputs (seismic input, interaction) in the intro, rules, and README. Regrouped MANUAL under a single "SEISMIC INPUT / SOURCE" section alongside API instead of listing it as a third control. Renamed "GESTURE / ROTATE" to "INTERACTION / ROTATE" to match the actual pointer/touch drag implementation. Linked the seismic scale chart to live orb behavior with a "Driving the orb" readout and a highlighted magnitude category.

## V2 — Focus: State Shift

Removed the "Experience an Earthquake" scripted playback control; it functioned as an unofficial third input and demoed intensity without addressing the actual gap the V1 reflection named. In its place, earthquake depth now drives a second shader axis (sharpness) alongside magnitude: shallow, strong activity buckles the surface into a sharp ripple, while deep activity reads as a slow, diffuse swell. System status resolves into one of four named states — DORMANT, MURMUR, TREMOR, RUPTURE — computed from combined magnitude and depth, replacing the old three-tier CALM / ELEVATED / HIGH TENSION label that tracked intensity alone. Manual mode keeps a fixed, shallow coupling (it can reach DORMANT, TREMOR, and RUPTURE but never MURMUR), so only live data can produce the full range of states. Added "07 / V2 REFLECTION" and "08 / END-OF-BUILD REFLECTION" sections to the page, updated the rules and status copy, and renumbered the seismic scale section to 09. Bumped visible version labels from V1 to V2.
