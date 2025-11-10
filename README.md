# Lunar Wolf Atelier

Design bespoke wolf illustrations directly in the browser. Adjust palette, atmosphere, fur detail, and luminous accents, then export a crisp SVG ready for prints, apparel, or inspiration boards.

## 🚀 Quick Start

```bash
npm install
npm run dev
# open http://localhost:3000
```

## 🖌️ Features

- Four hand-crafted wolf palettes with dynamic gradients and glassmorphic UI.
- Atmospheric presets with aurora, ember, and frost lighting options.
- Live SVG preview rendered with layered geometry for a stylized wolf bust.
- Controls for fur detail, pattern intensity, moon halo, and glow filtering.
- Instant SVG export for high-resolution artwork.

## 🧱 Tech Stack

- Next.js 14 (App Router) + React 18
- Tailwind CSS for styling and glassmorphism
- TypeScript with strict mode

## 📂 Project Structure

```
app/
  layout.tsx      # Root metadata and layout shell
  page.tsx        # Wolf builder UI + SVG renderer
  globals.css     # Tailwind layers + custom utilities
```

## 🧪 Scripts

- `npm run dev` – Start the development server
- `npm run build` – Production build
- `npm run start` – Serve the production build
- `npm run lint` – ESLint via `next lint`

## 📤 Deployment

Optimized for Vercel. Build locally before deploying:

```bash
npm run build
vercel deploy --prod --yes --token $VERCEL_TOKEN --name agentic-38095864
```

Verify after DNS propagation:

```bash
curl https://agentic-38095864.vercel.app
```

---

Created with ❤️ for lupine creatives.
