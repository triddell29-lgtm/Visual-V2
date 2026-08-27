# Critique Notes

## V1 review

The strongest part of the system is the connection between reflective light, surface deformation, and direct dragging. The orb feels like an object that can be handled while still remaining anchored in place. The live readout clarifies what the system is responding to without turning the page into a dashboard.

The main risk is that high activity can still read as generic intensity when the surface moves quickly. The current manual control helps test that range, but the next pass should make location and distance matter more. The fullscreen box, explicit interaction labeling, and visible live status make the relationship between interaction and system behavior easier to understand.

## V1.1 revision

Four issues came out of a second review. First, the page did not state its 1-2 primary inputs plainly; a reader had to infer them from scattered controls. Second, MANUAL read as a third, independent control sitting next to API and drag, when it is actually a second source on the same seismic channel. Third, the controls block was labeled "GESTURE / ROTATE" even though the system only tracks pointer/touch drag, not real gesture input. Fourth, the "SEISMIC SCALE" magnitude chart sat at the bottom of the page as a self-contained stats panel with no visible tie back to the orb's behavior.

The fix: the intro, rules, and README now name the two inputs directly (seismic input; interaction). The seismic-controls section was given its own "SEISMIC INPUT / SOURCE" label wrapping both the API/MANUAL toggle and the slider, with copy stating they are one channel, two sources; the stray "Manual" row was removed from the interaction controls list. "GESTURE / ROTATE" became "INTERACTION / ROTATE". The seismic scale chart now highlights the magnitude category currently driving the orb and prints a live "Driving the orb: …" line, whether the source is the API feed, the manual slider, or the "Experience an Earthquake" playback, so it reads as an instrument panel for the orb rather than an adjacent dashboard.
