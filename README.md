3D Print Ops — Monorepo

Modern PWA + API scaffold for a small 3D‑printing business.

- Frontend: Next.js (App Router) + Tailwind CSS + PWA
- API: Fastify (TypeScript) + Prisma ORM
- Database: Postgres (Docker)
- Reverse proxy: Caddy (Docker) for simple routing

Quick start (Docker)

1) Prereqs: Docker Desktop
2) Start stack:

```bash
docker compose up --build
```

- Frontend: http://localhost:3000
- API: http://localhost:8000
- Postgres: localhost:5432 (user/pass: app/app, db: app)

Local dev (separate)

- API
```bash
cd api
npm i
npm run prisma:generate
npm run dev
```

- Frontend
```bash
cd app
npm i
npm run dev
```

Ensure Postgres is running (via Docker compose or local).

Environment variables

- API
  - `DATABASE_URL` (e.g., postgres://app:app@localhost:5432/app)
  - `PORT` (default 8000)
  - `JWT_SECRET` (placeholder for future auth)

- Frontend
  - `NEXT_PUBLIC_API_URL` (default http://localhost:8000)

Structure

```
/ (repo root)
  /api            # Fastify + Prisma API
    /src
    /prisma
  /app            # Next.js PWA
    /app
    /public
  docker-compose.yml
  Caddyfile
  README.md
```

Notes

- This is a functional starter. It stubs core endpoints and UI pages (Spools, Jobs, Requests, Alerts, Scan).
- Extend DB schema and API routes per the detailed requirements in `3_d_printing_business_app_requirements_features_draft.md`.
- Add real auth (JWT + refresh), role-based permissions, and file uploads as you progress.

License

MIT (change as you wish)

