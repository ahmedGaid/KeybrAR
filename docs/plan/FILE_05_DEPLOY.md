# SESSION 5 — Deploy: VPS + Cloudflare Free + OAuth
# Files: docker-compose / .env (production), Cloudflare DNS config, no app-code changes expected

---

## Before You Start

1. Read `docker-compose.yaml` + Dockerfile + any `docs/` deploy notes in the repo. List every
   env var the server needs (DB creds, session secret, OAuth keys, public URL).
2. Confirm target VPS: Hostinger VPS (existing account). Needs Docker; ~2 GB RAM plenty for
   5k daily users. If no VPS exists yet, pick the cheapest KVM plan — decision point for Ahmed.
3. Decide domain (e.g. `keybrar.com` or a free subdomain to start). Cloudflare account ready.

Cloudflare-only hosting was ruled out in planning: keybr is a stateful Node server + database —
Workers/Pages free plan cannot run it. Cloudflare's free tier is used as DNS + CDN + SSL in
front of the VPS; static assets get cached at the edge, which absorbs most of the 5k-user load.

Do not change anything yet.

---

## Task A — VPS provisioning

1. Ubuntu LTS + Docker + docker compose plugin.
2. Clone the KeybrAR repo on the VPS (public repo — no deploy keys needed).
3. Create production `.env` from the list gathered in Before You Start #1. Generate strong
   secrets (`openssl rand -hex 32`). NEVER commit `.env`.
4. `docker compose up -d --build`; confirm the site answers on the VPS port.
5. Database persistence: confirm the compose file maps a volume for the DB; test
   `docker compose down && up` keeps data.

## Task B — Cloudflare in front

1. Add domain to Cloudflare free plan; point nameservers.
2. DNS A record → VPS IP, proxy ON (orange cloud).
3. SSL/TLS mode: Full (strict) — put a Cloudflare Origin Certificate on the VPS (or Let's
   Encrypt + Full). Never "Flexible".
4. Cache rule: cache static assets (`/assets/*`, js/css/fonts — match keybr's static paths)
   aggressively; bypass cache for API/auth/websocket paths.
5. WebSockets are ON by default on Cloudflare — multiplayer needs them; verify.

## Task C — OAuth sign-in

1. Google Cloud Console → OAuth client (web), authorized redirect = production callback URL
   (find exact path in server config/upstream docs).
2. Put client id/secret in `.env`; restart stack.
3. Any other providers upstream supports are optional — Google only is fine for v1.

Security note (normal prose): treat the `.env` file as the only place secrets live; restrict
file permissions (`chmod 600 .env`), and keep VPS SSH key-only (disable password auth).

## Task D — Ops minimum

1. `docker compose restart` policy `unless-stopped` on services.
2. DB backup: nightly cron dumping the database to a dated file + copy off-VPS (even a private
   GitHub release or rclone to free storage). Test one restore.
3. Uptime check: free UptimeRobot ping on the homepage.

---

## Smoke Test

- [ ] https://<domain> loads through Cloudflare (check `cf-cache-status` header on an asset)
- [ ] Arabic lesson works end-to-end in production
- [ ] Google sign-in works; profile persists after logout/login
- [ ] Multiplayer race connects (WebSocket through Cloudflare)
- [ ] `docker compose down && up -d` → data still there
- [ ] Backup cron ran once; restore tested
- [ ] Footer source link points to public KeybrAR repo (AGPL satisfied on the live site)

---

## After This Session

```
Smoke test passed?
→ Type /compact in Claude Code
→ Open FILE_06_ACCEPTANCE.md and continue
```
