# Design Brief — Rakshak Web Security System

## Tone & Differentiation
Military-grade industrial aesthetic with glowing status indicators and pulsing animations. Dark mode only. Premium UX matching ADT Pulse, Ring, Ajax Security. Sharp geometry, electric accents, armed-state red pulse glow.

## Color Palette (OKLCH)
| Token | OKLCH | Hex | Purpose |
| --- | --- | --- | --- |
| Background | 0.063 0 0 | #0B0F1C | Ultra-dark navy base |
| Card | 0.088 0.01 0 | #141929 | Elevated card surface |
| Primary | 0.64 0.22 262 | #00A3FF | Electric blue, primary actions |
| Destructive | 0.53 0.23 15 | #FF3B3B | Armed red, alert state |
| Success | 0.73 0.23 142 | #00E676 | Safe green, active/armed zone |
| Amber | 0.69 0.22 51 | #FFA500 | Warning state, secondary alerts |
| Foreground | 0.93 0.02 0 | #F0EFE6 | Text, near-white |
| Muted | 0.35 0.02 0 | #565555 | Secondary labels, disabled |
| Border | 0.17 0.02 262 | #1E2A45 | Grid lines, borders, subtle dividers |

## Typography
| Tier | Font | Weight | Usage |
| --- | --- | --- | --- |
| Display | Rajdhani | 700 | Headings, status labels, nav, ALL CAPS |
| Body | Inter | 400 | Content, descriptions, body text |
| Mono | Geist Mono | 400 | Technical labels, device IDs |

## Elevation & Depth
- Background: `0.063 0 0` (floor)
- Card: `0.088 0.01 0` (elevated surface)
- Popover: `0.11 0.01 0` (modal overlay, slide-up)
- Depth via luminance gradient only, no shadow effects

## Structural Zones
| Zone | Surface | Border | Treatment |
| --- | --- | --- | --- |
| Header | Card | Border bottom | Device name, online/offline badge, status indicators |
| Hero | Card | Border | Central dual-zone shield icons with glow animation |
| Controls | Background | None | ARM/DISARM buttons in 2×2 grid, DISARM ALL full-width |
| Status | Card | Border top | AC Power, GSM Signal, Zone 1/2 state cards |
| Navigation | Card | Border top | Bottom tab bar (mobile), sidebar (desktop) |

## Shape Language
- Button radius: `0` (sharp corners, military aesthetic)
- Card radius: `0` (sharp corners)
- Input radius: `0` (sharp corners)
- Icon style: Filled shields, sensors, bell icons with glowing rings

## Motion & Animation
| Element | Animation | Duration | Trigger |
| --- | --- | --- | --- |
| Zone armed | glow-pulse-red | 1.2s ∞ | Red pulsing glow when ARMED |
| Zone safe | glow-pulse-green | 1.2s ∞ | Green pulsing glow when system safe |
| Glow default | glow-pulse | 2s ∞ | Blue pulsing glow (primary state) |
| Modal | slide-up | 0.4s | Confirm dialogs, overlay entry |
| Button tap | ripple-tap | 0.6s | Active state feedback |
| State change | transition-smooth | 0.3s | All interactive elements |

## Component Patterns
- **Zone shields**: Large circular, filled red + pulsing red glow when ARMED, grey outline when DISARMED
- **Status badges**: ALL CAPS text (`ARMED 1`, `DISARMED 2`), colored background matching state
- **Control buttons**: 2×2 grid (ARM 1, DISARM 1, ARM 2, DISARM 2), full-width DISARM ALL red button
- **System status cards**: 2×2 grid showing AC Power, GSM Signal, Zone 1, Zone 2 states
- **Confirm dialogs**: Slide-up modal, high-contrast red for destructive actions

## Anti-Patterns
- No gradients
- No soft shadows or blur effects
- No rounded corners
- No generic Tailwind defaults
- No hover-only states without active visual feedback

## Signature Detail
Dual-zone shield icons with independent pulse animations. Filled red glow when ARMED (1.2s cycle), grey calm when DISARMED. Confirms critical commands via slide-up modal before execution. System status visible at all times (online/offline, AC power, signal strength).
