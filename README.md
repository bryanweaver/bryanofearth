# bryanofearth.com

Personal site for Bryan Weaver — software developer in Houston, TX.

Static site (HTML / CSS / JS, no build step). Hosted on Cloudflare Pages.

## Structure

```
index.html              # Hero, terminal, contribution graph, projects
styles.css              # Theme (dark/light), layout, components
app.js                  # Terminal commands, fuzzy match, GitHub contributions
now.json                # Manual "current focus" data (building / reading / learning)
favicon.svg             # SVG favicon ($_ glyph)
apple-touch-icon.png    # 180x180 PNG fallback
og.png                  # 1200x630 social card
sitemap.xml             # SEO
robots.txt              # SEO
site.webmanifest        # PWA manifest
_headers                # Cloudflare Pages headers (security + caching)
```

## Local dev

```bash
python -m http.server 8765
# open http://localhost:8765/
```

## Updating `now`

Edit `now.json`. Bump the `updated` date. Done — no rebuild.

## License

Personal site. All rights reserved.
