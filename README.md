# Asme

A media site about AI, tech and fintech, modeled on vc.ru: a feed with Latest, Popular and Saved tabs, sections, story formats (news, interviews, recaps, reviews), an article page and a most-read rail.

Stack: Vite, React 18, TypeScript, Tailwind CSS 3, lucide-react.

```bash
npm install
npm run dev      # dev server
npm run build    # typecheck + production build
```

## Where to change things

- `src/data/site.ts` — site name, sections and formats. A Crypto section is set up but disabled (`enabled: false`).
- `src/data/posts.ts` — stories. Currently demo content: all people, companies and events are fictional.
- `src/components/BackgroundVideo.tsx` — the masthead background video with its seamless fade loop.
