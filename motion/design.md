# Toronto Premium Glass motion update

Product truth: precision-fitted glass brings light and openness to a room.

Four key frames use the existing site photography, without changing its subjects:
1. Anticipation (0 s): clean off-white page, generous left-hand typography and a quiet shower photograph on the right.
2. Reveal (1.5 s): image panel settles from a 2-degree perspective tilt to a level frame, with a soft shadow.
3. Proof (8 s): close attention moves from the shower to a glass railing, matching the framing and image scale.
4. Resolve (16 s): mirror detail settles into the same card. The complete headline and quote action remain stationary and readable.

| Layer | Timing | Movement |
| --- | --- | --- |
| Headline | 0.9 s, phrase delays of 0.09 s | 24 px rise, ease (0.16,1,0.3,1) |
| Image panel | 1.5 s | Gentle tilt settles to level |
| Image detail | 8 s | 2–5% image scale; 0.8 s cross-dissolve |
| UI | 0.2–0.45 s | Color feedback and 2 px lift |
| Sections | 0.75 s | 28 px rise on entering viewport |

Materials and lighting: existing photographs retain their lighting; remove the previous dimming filter. Off-white surfaces, cool grey text, muted blue-grey actions, subtle shadows and rounded glass panels.

Type: native Apple system face where installed, then Inter/Helvetica/Arial. Hero 52–88 px desktop, 48–74 px mobile; paragraph 16–17 px; controls 14 px. Existing business copy retained.

Sound: none. Autoplay is silent. Pause control and reduced-motion fallback provided.

QA: inspect all five pages at desktop and 390 px widths; validate links, image loads, gallery filter/lightbox, native form fallback, AJAX acceptance, errors, duplicate prevention and reduced-motion behavior. Publish only to the existing public site after hosting access is established.
