(() => {
  const input = document.getElementById("input");
  const output = document.getElementById("output");
  const body = document.getElementById("term-body");
  const themeToggle = document.getElementById("theme-toggle");
  const yearEl = document.getElementById("year");

  yearEl.textContent = new Date().getFullYear();

  const links = {
    resume: "https://bryanweaver.github.io/resume/",
    github: "https://github.com/bryanweaver",
    linkedin: "https://www.linkedin.com/in/bryanofearth/",
    stackoverflow: "https://stackoverflow.com/users/2059365/bryanofearth",
    email: "mailto:weaverb9@gmail.com",
    bulletproof: "https://bulletprooftestprep.com",
    mewscast: "https://github.com/bryanweaver/mewscast",
    voteout: "https://voteouteveryone.com",
    cak: "https://github.com/bryanweaver/claude-agent-kit",
  };

  const commands = {
    help: {
      desc: "list available commands",
      run: () => {
        const rows = Object.entries(commands)
          .map(([k, v]) => `  <span class="cmd">${k.padEnd(14)}</span><span class="dim">${v.desc}</span>`)
          .join("\n");
        return `<span class="hdr">Available commands</span>\n${rows}\n\n<span class="dim">tip: ↑/↓ for history · tab to autocomplete · click chips above</span>`;
      },
    },
    about: {
      desc: "who is bryan",
      run: () =>
        `<span class="hdr">about</span>
Senior software developer in Houston, TX with ~12 years in production.
Currently at <span class="ok">Pennymac</span>, shipping developer tooling and leading LLM
adoption org-wide. On the side, I've founded or co-founded ventures
spanning <span class="ok">civic tech</span>, <span class="ok">ed-tech</span>, and <span class="ok">AI agents</span>.

type <span class="cmd">projects</span> to see what I'm working on
type <span class="cmd">resume</span> for the long version`,
    },
    bulletproof: {
      desc: "open Bulletproof Test Prep",
      run: () => {
        open(links.bulletproof);
        return `<span class="hdr">Bulletproof Test Prep</span> <span class="dim">— co-founder, Sep 2025–present</span>
Adaptive learning SaaS that helps aspiring home inspectors pass the NHIE.
Multi-tenant <span class="ok">Next.js</span> + <span class="ok">Supabase</span> platform with an intelligent quiz
engine, taxonomy-based mastery tracking, Stripe-powered subscriptions,
and AI-driven customer support built on Claude.
<span class="ok">→ opening</span> bulletprooftestprep.com`;
      },
    },
    voteout: {
      desc: "open VoteOut",
      run: () => {
        open(links.voteout);
        return `<span class="hdr">VoteOut</span> <span class="dim">— founder, Apr 2026–present</span>
Nonpartisan civic platform. Address-based ballot lookup that identifies
every federal and state incumbent. Printable pocket card plus a
<span class="ok">Stripe + Lob</span>–powered postcard product that ships paper ballots to
voters. Integrates Google Civic, OpenFEC, and OpenStates APIs.
<span class="ok">→ opening</span> voteouteveryone.com`;
      },
    },
    cak: {
      desc: "open Claude Agent Kit",
      run: () => {
        open(links.cak);
        return `<span class="hdr">Claude Agent Kit</span> <span class="dim">— published plugin</span>
Claude Code plugin that coordinates <span class="ok">7 specialized AI agents</span> and
<span class="ok">12 workflow skills</span> for parallel feature shipping, testing, and
deployment.
<span class="ok">→ opening</span> github.com/bryanweaver/claude-agent-kit`;
      },
    },
    mewscast: {
      desc: "open Mewscast",
      run: () => {
        open(links.mewscast);
        return `<span class="hdr">Mewscast</span> <span class="dim">— live AI agent</span>
Autonomous AI journalism bot. End-to-end agent that researches, drafts,
and publishes news posts to X and Bluesky without human intervention.
Walter Croncat persona. <span class="ok">Grok</span> for image gen; <span class="ok">Claude</span> for research,
drafting, and editorial reasoning.
<span class="dim">live at <a href="https://bsky.app/profile/mewscast.bsky.social" target="_blank" rel="noopener">@mewscast on Bluesky</a></span>
<span class="ok">→ opening</span> github.com/bryanweaver/mewscast`;
      },
    },
    resume: {
      desc: "open my resume",
      run: () => {
        open(links.resume);
        return `<span class="ok">→ opening</span> resume`;
      },
    },
    contact: {
      desc: "ways to reach me",
      run: () =>
        `<span class="hdr">contact</span>
  email          <a href="mailto:weaverb9@gmail.com">weaverb9@gmail.com</a>
  linkedin       <a href="${links.linkedin}" target="_blank" rel="noopener">linkedin.com/in/bryanofearth</a>
  github         <a href="${links.github}" target="_blank" rel="noopener">github.com/bryanweaver</a>
  stackoverflow  <a href="${links.stackoverflow}" target="_blank" rel="noopener">stackoverflow.com/users/2059365</a>`,
    },
    github: {
      desc: "open GitHub",
      run: () => { open(links.github); return `<span class="ok">→ opening</span> GitHub`; },
    },
    linkedin: {
      desc: "open LinkedIn",
      run: () => { open(links.linkedin); return `<span class="ok">→ opening</span> LinkedIn`; },
    },
    stackoverflow: {
      desc: "open Stack Overflow",
      run: () => { open(links.stackoverflow); return `<span class="ok">→ opening</span> Stack Overflow`; },
    },
    email: {
      desc: "email me",
      run: () => { window.location.href = links.email; return `<span class="ok">→ launching</span> mail client → weaverb9@gmail.com`; },
    },
    now: {
      desc: "current focus (manual)",
      run: async () => {
        try {
          const res = await fetch("/now.json", { cache: "no-cache" });
          if (!res.ok) throw new Error("HTTP " + res.status);
          const d = await res.json();
          const rows = [];
          if (d.building) rows.push(`  <span class="dim">building</span>    ${escape(d.building)}`);
          if (d.reading)  rows.push(`  <span class="dim">reading</span>     ${escape(d.reading)}`);
          if (d.learning) rows.push(`  <span class="dim">learning</span>    ${escape(d.learning)}`);
          const stamp = d.updated ? `<span class="dim">last updated ${escape(d.updated)} (${relTime(d.updated + "T12:00:00Z")})</span>` : "";
          return `<span class="hdr">now</span>\n${rows.join("\n")}\n\n${stamp}`;
        } catch (e) {
          return `<span class="err">couldn't load now data</span> <span class="dim">— ${escape(e.message)}</span>`;
        }
      },
    },
    skills: {
      desc: "show core stack",
      run: () =>
        `<span class="hdr">skills</span>
  <span class="dim">languages</span>     TypeScript · JavaScript · Python · SQL · C#
  <span class="dim">frontend</span>      React · Next.js (App Router) · Tailwind · shadcn/ui
  <span class="dim">backend</span>       Node.js · Next.js API routes · serverless
  <span class="dim">data</span>          PostgreSQL · Supabase
  <span class="dim">cloud</span>         AWS · Vercel · Cloudflare
  <span class="dim">ai</span>            Claude API · Grok API · agent orchestration
  <span class="dim">payments/ops</span>  Stripe · Lob

<span class="dim">~12 years in production · 8 yrs React · 6 yrs TypeScript</span>`,
    },
    clear: {
      desc: "clear the terminal",
      run: () => { output.innerHTML = ""; return ""; },
    },
  };

  // Aliases
  const aliases = {
    "?": "help",
    "-help": "help",
    "h": "help",
    "cv": "resume",
    "exit": "clear",
    "claude-agent-kit": "cak",
    "btp": "bulletproof",
    "status": "now",
  };

  // ---- IO ----
  function open(url) {
    const w = window.open(url, "_blank", "noopener");
    if (!w) window.location.href = url;
  }

  function print(html, opts = {}) {
    const line = document.createElement("div");
    line.className = "line";
    line.innerHTML = html;
    output.appendChild(line);
    if (!opts.noScroll) body.scrollTop = body.scrollHeight;
    return line;
  }

  // Relative time formatter (e.g. "3d ago", "5h ago")
  function relTime(iso) {
    const t = new Date(iso).getTime();
    if (Number.isNaN(t)) return "";
    const s = Math.max(0, Math.floor((Date.now() - t) / 1000));
    if (s < 60) return "just now";
    if (s < 3600) return Math.floor(s / 60) + "m ago";
    if (s < 86400) return Math.floor(s / 3600) + "h ago";
    if (s < 86400 * 7) return Math.floor(s / 86400) + "d ago";
    if (s < 86400 * 30) return Math.floor(s / (86400 * 7)) + "w ago";
    if (s < 86400 * 365) return Math.floor(s / (86400 * 30)) + "mo ago";
    return Math.floor(s / (86400 * 365)) + "y ago";
  }

  function printPrompt(cmd) {
    print(`<span class="prompt">$</span> <span class="cmd">${escape(cmd)}</span>`);
  }

  function escape(s) {
    return s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
  }

  // Levenshtein distance (small, iterative)
  function levenshtein(a, b) {
    if (a === b) return 0;
    if (!a.length) return b.length;
    if (!b.length) return a.length;
    const prev = new Array(b.length + 1);
    for (let j = 0; j <= b.length; j++) prev[j] = j;
    for (let i = 1; i <= a.length; i++) {
      let cur = [i];
      for (let j = 1; j <= b.length; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        cur[j] = Math.min(
          cur[j - 1] + 1,
          prev[j] + 1,
          prev[j - 1] + cost
        );
      }
      for (let j = 0; j <= b.length; j++) prev[j] = cur[j];
    }
    return prev[b.length];
  }

  function suggest(input) {
    const candidates = [...Object.keys(commands), ...Object.keys(aliases)];
    let best = null;
    let bestDist = Infinity;
    for (const c of candidates) {
      // substring boost: if input is a prefix or substring, treat as very close
      let d = levenshtein(input, c);
      if (c.includes(input) || input.includes(c)) d = Math.min(d, 1);
      if (d < bestDist) { bestDist = d; best = c; }
    }
    // Tolerance scales with length; keep tight to avoid silly suggestions
    const threshold = Math.max(2, Math.floor(input.length / 2));
    if (best && bestDist <= threshold) {
      const resolved = aliases[best] || best;
      return { suggestion: best, resolved };
    }
    return null;
  }

  async function run(raw) {
    const cmd = (raw || "").trim();
    if (!cmd) return;
    printPrompt(cmd);
    const lower = cmd.toLowerCase();
    const key = aliases[lower] || lower;
    const c = commands[key];
    if (!c) {
      const hit = suggest(lower);
      if (hit) {
        print(
          `<span class="err">command not found:</span> ${escape(cmd)}
<span class="dim">did you mean</span> <button class="inline-suggest" data-run="${escape(hit.suggestion)}"><span class="cmd">${escape(hit.suggestion)}</span></button><span class="dim">? — or type</span> <span class="cmd">help</span>`
        );
      } else {
        print(`<span class="err">command not found:</span> ${escape(cmd)} <span class="dim">— type</span> <span class="cmd">help</span>`);
      }
      return;
    }
    let out = c.run();
    if (out && typeof out.then === "function") {
      const placeholder = print(`<span class="dim">… loading</span>`);
      try { out = await out; } finally { placeholder.remove(); }
    }
    if (out) print(out);
  }

  // ---- History ----
  const HIST_KEY = "boe.history";
  let history = JSON.parse(localStorage.getItem(HIST_KEY) || "[]");
  let histIdx = history.length;
  function pushHistory(cmd) {
    if (!cmd) return;
    if (history[history.length - 1] !== cmd) history.push(cmd);
    if (history.length > 50) history = history.slice(-50);
    localStorage.setItem(HIST_KEY, JSON.stringify(history));
    histIdx = history.length;
  }

  // ---- Theme ----
  const THEME_KEY = "boe.theme";
  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") || "dark";
  }
  function setTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    localStorage.setItem(THEME_KEY, t);
  }
  function toggleTheme() {
    setTheme(currentTheme() === "dark" ? "light" : "dark");
  }
  setTheme(localStorage.getItem(THEME_KEY) || "dark");
  themeToggle.addEventListener("click", toggleTheme);

  // ---- Input handling ----
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const v = input.value;
      input.value = "";
      pushHistory(v.trim());
      run(v);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (histIdx > 0) { histIdx--; input.value = history[histIdx] || ""; }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx < history.length) { histIdx++; input.value = history[histIdx] || ""; }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const v = input.value.trim().toLowerCase();
      if (!v) return;
      const match = Object.keys(commands).find((k) => k.startsWith(v));
      if (match) input.value = match;
    } else if (e.key === "l" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      commands.clear.run();
    }
  });

  // ---- Chip buttons ----
  document.querySelectorAll(".chip").forEach((btn) => {
    btn.addEventListener("click", () => {
      run(btn.dataset.cmd);
      input.focus();
    });
  });

  // Focus input when clicking anywhere in the terminal
  document.getElementById("terminal").addEventListener("click", (e) => {
    if (e.target.tagName !== "A" && e.target.tagName !== "BUTTON") input.focus();
  });

  // Delegated handler for inline "did you mean?" suggestion clicks
  output.addEventListener("click", (e) => {
    const btn = e.target.closest("button.inline-suggest");
    if (!btn) return;
    e.preventDefault();
    run(btn.dataset.run);
    input.focus();
  });

  // Inline link inside cards (cards are themselves anchors, so we need to
  // intercept clicks on these spans and open their data-href in a new tab)
  document.querySelectorAll(".card-inline-link").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const url = el.dataset.href;
      if (url) window.open(url, "_blank", "noopener");
    });
  });

  // ---- Contributions (cached) ----
  const CONTRIB_CACHE_KEY = "boe.gh.contrib";
  const CONTRIB_TTL_MS = 60 * 60 * 1000; // 1 hour

  async function getContributions() {
    try {
      const cached = JSON.parse(localStorage.getItem(CONTRIB_CACHE_KEY) || "null");
      if (cached && Date.now() - cached.at < CONTRIB_TTL_MS) return cached.data;
    } catch {}
    const res = await fetch("https://github-contributions-api.jogruber.de/v4/bryanweaver?y=last");
    if (!res.ok) throw new Error("HTTP " + res.status);
    const json = await res.json();
    try { localStorage.setItem(CONTRIB_CACHE_KEY, JSON.stringify({ at: Date.now(), data: json })); } catch {}
    return json;
  }

  function computeLevelThresholds(contribs) {
    // Use quartiles of the user's own active-day counts.
    // The upstream API ships every non-zero day as level:1, so we recompute.
    const counts = contribs.map(c => c.count || 0).filter(n => n > 0).sort((a, b) => a - b);
    if (!counts.length) return { p25: 1, p50: 1, p75: 1 };
    const pick = (q) => counts[Math.min(counts.length - 1, Math.floor(counts.length * q))];
    return { p25: pick(0.25), p50: pick(0.50), p75: pick(0.75) };
  }

  function levelFor(count, t) {
    if (count <= 0) return 0;
    if (count <= t.p25) return 1;
    if (count <= t.p50) return 2;
    if (count <= t.p75) return 3;
    return 4;
  }

  function renderContributionsSVG(contribs) {
    const thresh = computeLevelThresholds(contribs);
    // Group by week (Sun→Sat columns). Sized to fit the 832px content area without scroll.
    const cell = 11, gap = 2, pad = { left: 26, top: 18 };
    // Pad contribs so the grid starts on a Sunday
    const first = new Date(contribs[0].date + "T00:00:00Z");
    const firstWeekday = first.getUTCDay(); // 0 = Sun
    const padded = [];
    for (let i = 0; i < firstWeekday; i++) padded.push(null);
    padded.push(...contribs);
    // Tail pad to fill a 7-row column
    while (padded.length % 7 !== 0) padded.push(null);
    const weeks = padded.length / 7;
    const width = pad.left + weeks * (cell + gap);
    const height = pad.top + 7 * (cell + gap);

    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const monthLabels = [];
    let lastMonth = -1;
    for (let w = 0; w < weeks; w++) {
      const day = padded[w * 7];
      if (!day) continue;
      const m = new Date(day.date + "T00:00:00Z").getUTCMonth();
      if (m !== lastMonth) {
        monthLabels.push({ x: pad.left + w * (cell + gap), text: months[m] });
        lastMonth = m;
      }
    }

    const cells = [];
    for (let w = 0; w < weeks; w++) {
      for (let d = 0; d < 7; d++) {
        const item = padded[w * 7 + d];
        if (!item) continue;
        const x = pad.left + w * (cell + gap);
        const y = pad.top + d * (cell + gap);
        const level = levelFor(item.count || 0, thresh);
        const cls = `cell l${level}`;
        const title = `${item.count} contribution${item.count === 1 ? "" : "s"} on ${item.date}`;
        cells.push(
          `<rect class="${cls}" x="${x}" y="${y}" width="${cell}" height="${cell}" rx="2"><title>${title}</title></rect>`
        );
      }
    }

    const dayTicks = [
      { y: pad.top + (1 * (cell + gap)) + 9, text: "Mon" },
      { y: pad.top + (3 * (cell + gap)) + 9, text: "Wed" },
      { y: pad.top + (5 * (cell + gap)) + 9, text: "Fri" },
    ];

    return `<svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMinYMid meet" role="img" aria-label="GitHub contributions over the last year">
      ${monthLabels.map(m => `<text class="month" x="${m.x}" y="12">${m.text}</text>`).join("")}
      ${dayTicks.map(d => `<text class="day" x="0" y="${d.y}">${d.text}</text>`).join("")}
      ${cells.join("")}
    </svg>`;
  }

  async function loadActivityWidget() {
    const graph = document.getElementById("contrib-graph");
    const total = document.getElementById("contrib-total");
    if (!graph) return;
    graph.innerHTML = `<div class="contrib-skeleton"></div>`;
    try {
      const data = await getContributions();
      const all = data.contributions || [];
      const totalCount = data.total?.lastYear ?? all.reduce((a, b) => a + (b.count || 0), 0);
      if (total) total.innerHTML = `<span class="num">${totalCount.toLocaleString()}</span> contributions in the last year`;
      graph.innerHTML = renderContributionsSVG(all);
    } catch (e) {
      if (total) total.textContent = "";
      graph.innerHTML = `<div class="contrib-error">couldn't load contributions — ${escape(e.message)}<br><a href="https://github.com/bryanweaver" target="_blank" rel="noopener">view on github →</a></div>`;
    }
  }

  // ---- Boot sequence ----
  function boot() {
    print(`<span class="hdr">welcome</span> — type <span class="cmd">help</span> or click a chip above to get started.`);
    print(commands.help.run());
    // Focus the terminal input without auto-scrolling past the hero
    try { input.focus({ preventScroll: true }); } catch { /* older browsers ignore */ }
    loadActivityWidget();
  }
  boot();
})();
