# p4n4.com

Official landing page for **p4n4** — an open-source Docker Compose platform that wires together IoT, GenAI, and Edge ML into a single self-hosted stack.

![P4N4](https://img.shields.io/badge/p4n4-IoT%20%2B%20GenAI%20%2B%20Edge%20ML-f97316?style=for-the-badge)
![License](https://img.shields.io/badge/license-Apache%202.0-00a8ff?style=for-the-badge)
![Status](https://img.shields.io/badge/status-active-f97316?style=for-the-badge)

## Overview

Static marketing site for the p4n4 platform, built with plain HTML, CSS, and vanilla JS. No frameworks, no build step — open `index.html` in a browser or serve it from any static host.

The site covers:
- **Architecture** — MING stack (Mosquitto, InfluxDB, Node-RED, Grafana) extended with GenAI and Edge AI layers
- **Comparison** — p4n4 vs TIGUITTO / IoTStack
- **CLI** — interactive `p4n4 init` wizard and all subcommands
- **Template Registry** — Git-backed project templates with short-name resolution
- **Edge AI** — Edge Impulse TinyML inference + Ollama + Letta agent memory
- **Quickstart** — five-step install guide

**Live site:** [p4n4.com](https://p4n4.com)

## Style Guide

### Color Palette

```css
--bg:      #0a0a0a;   /* Page background */
--bg2:     #111111;   /* Section backgrounds */
--bg3:     #1a1a1a;   /* Card / elevated surfaces */
--accent:  #f97316;   /* Primary accent (orange) */
--accent2: #c2410c;   /* Accent hover */
--amber:   #fb923c;   /* Secondary highlight */
--blue:    #94a3b8;   /* Tertiary / info */
--red:     #f87171;   /* Error / fault */
--text:    #ececec;   /* Primary text */
--muted:   #a8a8a8;   /* Secondary text */
```

### Typography

- **Display font**: [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) (300–800) — headings and UI labels
- **Monospace font**: [JetBrains Mono](https://www.jetbrains.com/lp/mono/) (400, 500, 600) — terminal output, code, nav, tags

### Spacing

- Section padding: `100px 48px` (desktop) → `72px 32px` (tablet) → `48px 16px` (mobile)
- Max content width: `1200px` (sections), `800px` (install)

## Project Structure

```
p4n4.com/
├── index.html        # Main landing page
├── README.md         # This file
├── LICENSE           # Apache 2.0 License
└── public/
    ├── styles.css    # All styles and responsive breakpoints
    └── main.js       # Scroll reveal, CLI preview switcher, mobile nav, copy button
```

## Responsive Breakpoints

| Breakpoint | Target |
|---|---|
| `≤ 900px` | Tablet — hamburger nav, 2-col features grid, stacked hero |
| `≤ 640px` | Mobile — 2×2 stats grid, hidden CLI descriptions, scrollable code |
| `≤ 420px` | Small mobile — tighter padding, smaller type scale |

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'feat: add my feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request

## License

This project is licensed under the Apache 2.0 License - see the [LICENSE](LICENSE) file for details.
