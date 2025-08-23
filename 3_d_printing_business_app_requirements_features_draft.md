# 3D Printing Business App — Requirements & Features (Draft)

> Purpose: A web/mobile (PWA) tool for a small 3D‑printing business (you + partner) to manage filament inventory, printers, jobs, pricing, customers, and operations.

---

## 1) Core Objectives

- Track **filament inventory**: what’s in storage vs. in use, remaining quantity per spool, and material condition (e.g., moisture).
- Provide a **single pipeline** for jobs: quote → approve → queue → print → post‑process → QC → pack/ship → invoice.
- Maintain **printer fleet** data, maintenance, and real‑time status.
- Offer **pricing/quoting** with clear cost breakdowns.
- Keep a basic **CRM** for customers and order history.
- Deliver **dashboards/alerts** for low stock, due dates, and maintenance.

---

## 2) Users & Roles

- **Owner/Admin**: full access, settings, billing.
- **Operator/Technician**: create jobs, assign printers, log prints, update inventory.
- **Sales/Front Desk**: create quotes, manage customers.
- **Client Portal (optional)**: view quotes, approve orders, pay, track status.
- **Permissions**: role‑based access control (RBAC) + audit log of critical changes.

---

## 3) Filament Inventory & Spool Management

- **Catalog**: material (PLA, PETG, ABS, ASA, TPU, PA, CF‑PA, PC, etc.), brand, series, color (with hex/RGB), diameter (1.75/2.85), **net spool weight**, **tare weight**, lot/batch, supplier, SKU, cost/kg, purchase price & date, expiration (if provided).
- **Spools**: unique ID per spool + **QR/Barcode** label; status: *in‑storage*, *in‑use*, *reserved*, *quarantine*, *scrap*.
- **Location**: storage bin/shelf; printer/AMS slot; off‑site.
- **Moisture tracking**: last dried at, drying profile, desiccant status, humidity notes.
- **Remaining amount** per spool, via:
  - Manual entry (g/%) or “used g” after print.
  - **By weight**: enter current gross weight → app computes remaining = gross − tare; support for **Bluetooth scale** integration (later).
  - **By usage log**: subtract material usage from each completed job (from slicer estimate or operator entry).
  - (Future) **Computer vision** estimate from spool side photo.
- **Reservations**: reserve specific spools for a job; enforce color/material compatibility.
- **Thresholds & alerts**: low remaining (by g/%), aging stock (no movement ≥ N days), soon‑to‑expire lots.
- **Batch/lot controls** for consistency and recall.
- **Multi‑spool handling**: track partial spools; link multi‑spool prints and spool swapping.
- **Labeling**: generate/print QR labels (Dymo/Zebra); quick scan to open spool record.
- **Inventory operations**: receive, adjust, transfer location, merge remnants, scrap with reason.

---

## 4) Printer Fleet & Workspace

- **Printers registry**: model (e.g., Bambu P1S/X1C, Prusa, Creality, Voron, etc.), serial, nozzle type/diameter, bed size/volume, enclosure, AMS/Palette slots.
- **Capabilities matrix**: compatible materials, max temp, nozzle/belt wear notes, surface types (PEI/PC/Glass).
- **Maintenance**: schedules (nozzle, belts, bearings, lubrication), print‑hours counters, parts history, reminders.
- **Profiles**: standard print profiles (layer height, speeds, infill, supports) per material/printer.
- **Live status (optional integrations)**: Bambu/PrusaLink/OctoPrint/Klipper; job progress, ETA, webcam snapshot links.
- **Calibration logs**: flow rate, input shaper, first‑layer tests, bed mesh history.
- **Consumables**: spare nozzles, glue sticks, tapes, sheets — tracked like inventory.

---

## 5) Jobs, Queue & Production Pipeline

- **Job object**: title, customer, due date, priority, SLA, attachments (STL/3MF/G‑code), quantity, variant options (color/material/finish), notes.
- **Statuses**: inquiry → quoted → approved → **Queued** → printing → post‑processing → QC → packed → delivered → invoiced.
- **Task breakdown**: print, support removal, sanding, assembly, painting, annealing, resin cure (if SLA), etc., with estimated & actual time.
- **Scheduling**: assign prints to specific printers/time windows; detect conflicts; suggest optimal queue order.
- **Checklists** per step; required photos (e.g., first layer, final part).
- **Failure handling**: record cause, % complete, recovered material, reprint decision, credits.
- **Attachments storage** with **versioning**; annotate slice settings per job.

---

## 6) Pricing & Quoting

- **Cost model** (configurable):
  - Material cost = (grams used × cost/kg) / 1000.
  - Machine time = hours × hourly rate (base differs per printer).
  - **AMS/MMU surcharge** (if multi‑color), **rush** fees, support complexity multiplier, post‑processing time × labor rate.
  - Overheads (electricity, depreciation, failure rate factor), margin.
- **Quote builder**: wizard to input material, color, quality, strength, finish; instant estimate + range.
- **Import from slicer**: pull estimated grams & time from 3MF/Project or operator entry.
- **Price rules**: minimum order value, volume discounts, education/nonprofit pricing.
- **Quote → Order** conversion, e‑signature approval, deposit handling.

---

## 7) CRM & Contacts

- Customers & companies; addresses; tax/VAT fields; tags (repeat, VIP).
- Interaction timeline: quotes, orders, messages.
- **Customer portal (optional)**: upload files, approve quotes, pay, track status.

---

## 8) Post‑Processing & QC

- **Steps** library: support removal, sanding grits, filler/primer, painting, vapor smoothing, annealing, heat‑set inserts, assembly.
- **Time & materials** tracking: abrasives, paints, acetone, epoxy; cost rolled into job.
- **QC templates**: dimensional checks with tolerances, photo capture, pass/fail & defect codes; rework loop.

---

## 9) Packing, Shipping & Handover

- Packing checklist; include spare parts/fasteners.
- Shipping methods & costs; label printing; tracking URLs.
- Local pickup scheduling and delivery notes.

---

## 10) Dashboards & Analytics

- **Operations**: printer utilization %, on‑time delivery %, failure rate, average turnaround.
- **Inventory**: usage by material/color, burn rate, aging stock, low‑stock list.
- **Finance**: revenue, COGS, gross margin by job/material/customer; top customers; quote win rate.
- **Trend charts** and exports (CSV/XLSX).

---

## 11) Alerts & Notifications

- Low filament (by grams/%), stockouts, aging spools.
- Printer maintenance due, error events (if integrated), humidity warnings.
- Job due soon/overdue, quote expiring, payment reminders.
- Channels: in‑app, email, SMS, WhatsApp/Telegram/Discord (configurable).

---

## 12) Integrations (phase‑based)

- **Slicers/Printers**: Bambu Studio/Cloud (AMS mapping, job status), PrusaSlicer/PrusaLink, OctoPrint, Klipper/Mainsail.
- **Files**: Google Drive/Dropbox/OneDrive import; STL/3MF/G‑code parsing.
- **Payments**: Stripe/PayPal; invoices & receipts.
- **Accounting** (later): QuickBooks/Xero export.
- **Shipping**: Shippo/EasyPost labels.
- **Hardware**: Bluetooth scales, barcode/QR scanners, label printers.

---

## 13) Mobile & PWA

- **Scan mode**: use phone camera to scan QR codes on spools, shelves, job packets.
- **Offline** queue for warehouse; sync when online.
- Camera capture for QC photos and first‑layer checks.

---

## 14) Settings & Localization

- Currency, **VAT** %, time zone, units (metric/imperial).
- Working hours, default lead times, holidays.
- Allowed materials & safety notes.
- **Localization**: UI strings (e.g., Hebrew/English), date & number formats.

---

## 15) Security & Compliance

- Email/password + 2FA; SSO (Google/Microsoft) optional.
- Role‑based permissions; audit logs; immutable job history.
- Backups, export of all data (JSON/CSV), data retention policies.
- GDPR‑style privacy statements; media redaction on request.

---

## 16) Data Model (high‑level)

- **User**(role, permissions)
- **Customer**(contacts, company)
- **Job**(status, due, items, attachments, costs)
- **JobItem**(part, quantity, material, color, settings)
- **Printer**(capabilities, maintenance, metrics)
- **Material**(catalog entry)
- **Spool**(material\_id, lot, tare, remaining\_g, location, status, history)
- **Operation**(print/post‑process tasks)
- **Quote/Invoice/Payment**
- **Notification**
- **Attachment** (files, versions)

---

## 17) MVP Scope (recommended first release)

- Users & roles (Admin + Operator).
- Filament catalog + spools with QR; manual remaining + subtract usage per job; low‑stock alerts.
- Printers registry + maintenance reminders (manual counters).
- Job pipeline (quote → approved → queued → printing → done) + attachments.
- Simple pricing (material g + time h + fixed overheads); printable quote PDF.
- Basic dashboards (open jobs, low stock, printer status summary).
- PWA with mobile scan mode.

---

## 18) V1 Enhancements (next)

- Bluetooth scale + tare profiles; spool reservations; lot control.
- Live printer integrations (status, ETA, snapshot).
- Customer portal (approve & pay).
- Scheduling with conflict detection and auto‑queue suggestions.
- QC templates + photo capture.
- Shipping label integration.

---

## 19) Future / Nice‑to‑Have

- **Computer vision** spool remaining via phone photo.
- **Auto‑slicing** presets & batch nesting; multi‑printer load balancing.
- AI pricing optimizer (learns true costs & failure likelihoods).
- Demand forecasting and purchase suggestions.
- Multi‑currency, multi‑warehouse.

---

## 20) Non‑Functional Requirements

- Responsive UI; fast search/filter; keyboard shortcuts.
- Reliability: autosave, versioning; conflict resolution on concurrent edits.
- Performance targets: <200ms common queries, <2s heavy reports.
- Observability: error tracking, uptime monitor.

---

## 21) Onboarding & Data Import

- Seed materials library (common brands/colors) import CSV.
- Bulk add spools with auto‑generated QR labels.
- Import customers from CSV; attach legacy job archives.

---

## 22) Hardware & Workspace Aids

- Recommended **label printer** model support; QR size templates.
- Suggested **scale** specs (min resolution, max capacity) & Bluetooth profiles.
- Shelf/bin labeling scheme; AMS slot mapping templates.

---

## 23) Open Questions / Decisions Log

- Exact pricing formula defaults (rates by printer?).
- Which printer integrations first (Bambu vs. OctoPrint)?
- Need client portal in MVP or later?
- Required languages at launch (Heb/Eng)?
- Accounting export targets (QuickBooks/Xero) and VAT layout.

---

### Next Steps

1. Confirm MVP features & integrations priority.
2. Define pricing defaults (hourly rates, overheads, AMS surcharge).
3. Sketch data schema + key screens (Spool card, Job board, Quote builder).
4. Choose tech stack (web/PWA) and identify hardware to buy (label printer, scale).


---

## 24) Deployment & Sync (Desktop + Phone, fully in‑sync)

### TL;DR

- Build a **PWA** (installable on iOS/Android/desktop) + a small API + Postgres.
- All clients talk to the same API/DB → instant sync.
- You can host **lightweight in cloud** (recommended) or **self‑host** on a PC/NAS with HTTPS.

### A) Lightweight Cloud (recommended for 2 people)

**What you get:** reliability, auto‑HTTPS, easy remote access, push notifications.

**Checklist**

1. **Repo**: mono‑repo or two repos (`/app` + `/api`).
2. **DB**: Neon/Supabase Postgres (db url + migration tool).
3. **API**: FastAPI/NestJS on Render/Fly/Railway; set env vars (DB URL, JWT secret).
4. **PWA**: Next.js/Vite app on Vercel/Netlify with `manifest.json` + service worker.
5. **Domain & HTTPS**: point `app.yourdomain.com` (frontend) and `api.yourdomain.com` (backend).
6. **Auth**: email/password + 2FA; set CORS (frontend origin).
7. **Realtime**: WebSocket/SSE for job/printer events.
8. **Backups**: daily Postgres backup + object storage for file uploads.
9. **Push**: Web Push (VAPID); iOS requires add‑to‑home‑screen.
10. **Monitoring**: uptime ping + error logging (Sentry/Logtail).

### B) Self‑Host at Home/Office (no monthly hosting, more DIY)

**What you get:** \$0 infra, but you manage uptime, certs, and remote access.

**Checklist**

1. **Docker Compose**: `api` (FastAPI), `db` (Postgres), `proxy` (Caddy/nginx) for HTTPS.
2. **Certificates**: Caddy auto‑TLS or Let’s Encrypt; must be valid for iOS camera.
3. **Access**: Tailscale or Cloudflare Tunnel for secure remote access.
4. **Backups**: nightly `pg_dump`; test restore monthly.
5. **PWA**: serve frontend via the same proxy (HTTPS), enable caching headers.
6. **Notifications**: Web Push works with valid HTTPS; optional Telegram/Email fallbacks.

### C) Hybrid Desktop + PWA

- Wrap the web app with **Tauri/Electron** for desktop convenience.
- Phones/tablets still use the PWA; same backend/database.

### Sync & Offline Behavior

- **Online‑first**: writes go to API; UI updates via WebSocket.
- **Offline**: service worker caches UI; queue lightweight actions (e.g., inventory adjustments) and retry when online.
- **Conflict policy**: server timestamps + last‑writer wins on non‑critical fields; protected ops (e.g., job status) require server checks.

### PWA Install & iOS Notes

- `manifest.json` with `display: "standalone"`, icons, name.
- `<meta name="apple-mobile-web-app-capable" content="yes">` for iOS.
- Serve over **HTTPS** to use camera/QR.
- iOS push requires the PWA to be **installed to Home Screen** (iOS 16.4+).

**Minimal service‑worker registration (client)**

```ts
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(console.error);
  });
}
```

**Minimal ****`manifest.json`**

```json
{
  "name": "3D Print Ops",
  "short_name": "3DPrintOps",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#0ea5e9",
  "background_color": "#ffffff",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

### iOS QR Scanning Fallback (since BarcodeDetector isn’t on iOS Safari)

Use `html5-qrcode` when `BarcodeDetector` isn’t available.

```ts
// npm i html5-qrcode
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect } from 'react';

export function IOSQrScanner({ onScan }:{ onScan:(text:string)=>void }) {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner('qr-root', { fps: 10, qrbox: 260 }, false);
    scanner.render((text) => {
      onScan(text);
      // optionally: scanner.clear();
    }, (_err) => {});
    return () => { scanner.clear().catch(() => {}); };
  }, [onScan]);
  return <div id="qr-root" style={{ width: 320, height: 320 }} />;
}
```

**Scan handler example**

```ts
function handleQR(value:string) {
  const url = new URL(value, window.location.origin);
  // Expected payload: spool:SPL_...;sig=...;v=1  OR  https://app/scan?payload=...
  // If plain payload, redirect into your app’s scan route:
  if (!/^https?:\/\//.test(value)) {
    window.location.href = `/scan?payload=${encodeURIComponent(value)}`;
    return;
  }
  window.location.href = value;
}
```

### Security & Backups (quick policy)

- **HTTPS everywhere**, strong JWT secrets, per‑role permissions.
- **Daily DB backups**, 30–90 day retention; quarterly restore test.
- Export tools for CSV/JSON.

### Tiny Decision Tree

- Want **zero ops** and push? → **A) Cloud**.
- Want **\$0 hosting** and OK managing certs/backups? → **B) Self‑host**.
- Want a **native desktop feel**? → **C) Hybrid** (still needs A or B).



---

## 25) Notification & Alert Center (Unified)

**Goal:** One place to triage everything—inventory warnings, printer/HMS errors, maintenance due, job/quote SLA breaches, request updates—so nothing slips.

**Sources**
- Inventory: low/empty spools, aging stock, moisture/drying reminders.
- Printers: HMS/error events, maintenance due by hours/date, temperature/humidity alerts.
- Jobs & Quotes: due‑soon/overdue, failed print, quote expiring, payment overdue.
- Requests: approvals needed, order delays, delivery/receiving pending.

**Notification model**
- Fields: `id, time, severity(info/warn/critical), category(inventory/printer/job/maintenance/billing/request), source_type, source_id, title, body, actions[], status(open/ack/muted/resolved/auto‑resolved), assignee, dedupe_key, tags[]`.
- Status lifecycle: **Open → Acknowledged → Resolved** (or **Muted** for N days). Auto‑resolve when upstream condition clears.

**Inbox & triage**
- Views: *All, My queue, Inventory, Printers, Jobs, Maintenance, Requests*.
- Filters: severity, category, assignee, printer, material, customer, date.
- Grouping: by source (e.g., all alerts for Spool #SPL‑123), by job, or by printer.
- **Deduplication**: collapse repeats with same `dedupe_key` inside a time window.
- **Bulk actions**: acknowledge, assign, mute, resolve.
- **Quick actions** per alert: “Create restock request”, “Open job”, “Schedule maintenance”, “Adjust threshold”.

**Routing & subscriptions**
- Per‑user/channel matrix: in‑app, email, push, Telegram/WhatsApp/Discord.
- Quiet hours + daily/weekly digest. Escalation rules (e.g., critical un‑acked after 2h → ping Admin).

**SLA clocks**
- Countdown on due‑soon items (jobs, quotes, approvals). Visual badges (🟢 on track / 🟠 risk / 🔴 breached).

**Audit & retention**
- Every state change logged with user/time. Keep 90 days in “Active”, archive beyond; CSV export.

---

## 26) Requests & Purchasing (Restock Center)

**Purpose:** Central hub to request, approve, order, receive, and track anything—filament spools, consumables (nozzles, bulbs), parts, or equipment.

**Request types**
- *Restock Filament*, *Consumables/Tools*, *Spare Parts*, *Equipment/Upgrade*, *Service/Maintenance*.

**Workflow**
- **Draft → Submitted → Approved → Ordered → Received → Stocked → Closed** (side paths: Rejected, On‑hold, Partially received, Backordered).

**Request fields**
- `id, requester, type, priority, justification, items[] (item_id/desc, qty, unit, target_location), linked_alert_id?, attachments (quotes/photos), budget_code, notes`.

**Vendors & POs**
- `vendors(id, name, contact, lead_time_days, terms)`.
- `purchase_orders(id, vendor_id, request_id?, status, ordered_at, expected_at, total, currency)` and `po_items(po_id, item_id, desc, qty, unit_price, received_qty)`.
- Multi‑vendor price compare; preferred vendor per material; pack sizes.

**Approvals**
- Rules: auto‑approve under X ₪; two‑person rule above Y; specific approver for equipment.
- Mobile approve/deny with comment.

**Receiving**
- Scan PO/QR to receive; partial receipt support; discrepancy capture (short/over/defect); auto‑create inventory adjustments.

**Views & analytics**
- Kanban: *Submitted, Approved, Ordered, In transit, Receiving, Done*.
- Metrics: monthly spend by category/vendor, lead time distribution, forecast vs. actual usage.

**Integration**
- Export POs/receipts to accounting (QuickBooks/Xero) later.
- Links back to the originating alert and to inventory.

---

## 27) Automations & Policies (Alerts → Requests)

**Restock policies**
- Per **Material** (and optionally color): `reorder_point_g`, `reorder_qty_g` or `par_level_g`, `preferred_vendor`, `pack_size`.
- **Formula (configurable):** `ROP = avg_daily_usage × lead_time_days + safety_stock`.
- Projected depletion: use print schedule + historical burn to forecast **depletion_date**; raise warning → auto‑create **Restock Request**.

**Examples**
- Low spool < 150g triggers: create Restock Request for +1kg, assign to “Purchasing”, link to all jobs dependent on that material.
- Maintenance due in < 20h of print time: raise alert + create Request for spare nozzles.
- Quote approved for large PETG run: auto‑reserve material; if short, open Restock Request.

**Rules engine**
- Trigger (event/cron) → Conditions (filters, thresholds) → Actions (create request, assign, escalate, notify, adjust status).
- “Simulate” mode to preview impact before enabling.

---

## 28) UI Sketch (Notification & Requests)

- **Top‑bar bell** opens the **Alert Drawer** with tabs (*All, Inventory, Printers, Jobs, Requests*), search & filters.
- **Requests** module: table + Kanban; quick “+ New Request”; convert alert → request in one click.
- Spool/Printer/Job pages show their **local timeline** of alerts/requests.

---

## 29) Data Model Additions

- **Notification**(id, category, severity, source_type, source_id, dedupe_key, status, assignee, created_at, resolved_at)
- **Subscription**(user_id, category, severity_min, channels[])
- **Request**(id, type, requester_id, priority, status, justification, budget_code, linked_alert_id)
- **RequestItem**(request_id, item_id, desc, qty, unit, target_location)
- **Vendor**, **PurchaseOrder**, **POItem**
- **RestockPolicy**(material_id, color?, reorder_point_g, reorder_qty_g|par_level_g, preferred_vendor, lead_time_days, safety_stock_g)

---

## 30) MVP/V1 impact

- **MVP add‑ons:**
  - Notification Inbox (inventory low, printer maintenance due, job due‑soon) with acknowledge/assign/resolve.
  - Basic **Requests**: create restock requests manually; mark as ordered/received; simple vendor field.
- **V1:**
  - Automations from RestockPolicy; PO/receiving workflow; vendor management; escalation rules; digest emails/push.



---

# Cursor Starter Pack (Scaffold)

> Copy-paste friendly starting point for DB, API, types, Docker, and Next.js PWA routing. Minimal but real; extend as you build.

## A) Database (Prisma on Postgres)

```prisma
// prisma/schema.prisma
generator client { provider = "prisma-client-js" }
datasource db { provider = "postgresql" url = env("DATABASE_URL") }

enum Role { ADMIN OPERATOR SALES }
enum SpoolStatus { IN_STORAGE IN_USE RESERVED QUARANTINE SCRAP }
enum JobStatus { INQUIRY QUOTED APPROVED QUEUED PRINTING POST_PROCESS QC PACKED DELIVERED INVOICED }
enum Severity { INFO WARN CRITICAL }
enum AlertCategory { INVENTORY PRINTER JOB MAINTENANCE BILLING REQUEST }
enum RequestStatus { DRAFT SUBMITTED APPROVED ORDERED RECEIVED STOCKED CLOSED REJECTED ON_HOLD PARTIAL BACKORDERED }

model User {
  id        String @id @default(cuid())
  email     String @unique
  name      String?
  role      Role   @default(OPERATOR)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Customer {
  id        String @id @default(cuid())
  name      String
  contact   String?
  email     String?
  phone     String?
  createdAt DateTime @default(now())
}

model Material { // catalog entry per brand/series/color/diameter
  id        String @id @default(cuid())
  name      String  // e.g., "PLA - eSun - Black"
  brand     String?
  series    String?
  color     String? // human name
  hex       String? // #RRGGBB
  diameter  String  // "1.75" or "2.85"
  costPerKg Int     // in agorot/cents; avoid floats
  sku       String?
  createdAt DateTime @default(now())
  spools    Spool[]
}

model Spool {
  id          String @id @default(cuid())
  materialId  String
  material    Material @relation(fields: [materialId], references: [id])
  lot         String?
  tareG       Int     // grams
  netG        Int?    // nominal net
  remainingG  Int     // current remaining
  status      SpoolStatus @default(IN_STORAGE)
  location    String?
  sig         String? // HMAC signature for QR
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  links       JobSpoolLink[]
}

model Printer {
  id        String @id @default(cuid())
  name      String
  model     String?
  volume    String? // e.g., 256x256x256
  nozzle    String? // type/diameter
  slots     Int?    // AMS/MMU slots
  createdAt DateTime @default(now())
}

model Product { // printable SKU/template
  id        String @id @default(cuid())
  name      String
  defaults  Json?
  createdAt DateTime @default(now())
}

model Job {
  id         String @id @default(cuid())
  customerId String?
  customer   Customer? @relation(fields: [customerId], references: [id])
  title      String
  status     JobStatus @default(INQUIRY)
  dueAt      DateTime?
  priority   Int @default(0)
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
  items      JobItem[]
}

model JobItem {
  id         String @id @default(cuid())
  jobId      String
  job        Job @relation(fields: [jobId], references: [id])
  productId  String?
  product    Product? @relation(fields: [productId], references: [id])
  qty        Int @default(1)
  materialId String?
  color      String?
  gramsPlanned Int? // from slicer
  secondsPlanned Int?
  links      JobSpoolLink[]
}

model JobSpoolLink { // reservations/usage by spool per job item
  id         String @id @default(cuid())
  jobItemId  String
  jobItem    JobItem @relation(fields: [jobItemId], references: [id])
  spoolId    String
  spool      Spool @relation(fields: [spoolId], references: [id])
  reservedG  Int
  usedG      Int @default(0)
}

model Notification {
  id         String @id @default(cuid())
  category   AlertCategory
  severity   Severity
  sourceType String
  sourceId   String
  dedupeKey  String?
  title      String
  body       String?
  status     String @default("OPEN") // OPEN/ACK/MUTED/RESOLVED
  assigneeId String?
  createdAt  DateTime @default(now())
  resolvedAt DateTime?
}

model Subscription {
  id        String @id @default(cuid())
  userId    String
  user      User @relation(fields: [userId], references: [id])
  category  AlertCategory
  severityMin Severity @default(INFO)
  channels  Json // ["inapp","email","push"]
}

model Request {
  id          String @id @default(cuid())
  type        String // RESTOCK/CONSUMABLE/PART/EQUIPMENT/SERVICE
  requesterId String
  requester   User @relation(fields: [requesterId], references: [id])
  priority    Int @default(0)
  status      RequestStatus @default(DRAFT)
  justification String?
  budgetCode  String?
  linkedAlertId String?
  createdAt   DateTime @default(now())
  items       RequestItem[]
  po          PurchaseOrder?
}

model RequestItem {
  id         String @id @default(cuid())
  requestId  String
  request    Request @relation(fields: [requestId], references: [id])
  itemId     String?
  desc       String
  qty        Int
  unit       String? // pcs, kg, etc.
  targetLocation String?
}

model Vendor {
  id      String @id @default(cuid())
  name    String
  contact String?
  leadTimeDays Int? 
}

model PurchaseOrder {
  id        String @id @default(cuid())
  vendorId  String
  vendor    Vendor @relation(fields: [vendorId], references: [id])
  requestId String?
  request   Request? @relation(fields: [requestId], references: [id])
  status    String @default("ORDERED")
  orderedAt DateTime @default(now())
  expectedAt DateTime?
  currency  String @default("ILS")
  items     POItem[]
}

model POItem {
  id        String @id @default(cuid())
  poId      String
  po        PurchaseOrder @relation(fields: [poId], references: [id])
  itemId    String?
  desc      String
  qty       Int
  unitPrice Int // in agorot/cents
  receivedQty Int @default(0)
}

model RestockPolicy {
  id           String @id @default(cuid())
  materialId   String
  material     Material @relation(fields: [materialId], references: [id])
  color        String?
  reorderPointG Int @default(0)
  reorderQtyG   Int?
  parLevelG     Int?
  preferredVendorId String?
  leadTimeDays Int? @default(0)
  safetyStockG Int? @default(0)
}

model Attachment {
  id       String @id @default(cuid())
  jobId    String?
  job      Job? @relation(fields: [jobId], references: [id])
  url      String
  meta     Json?
  createdAt DateTime @default(now())
}

model AuditLog {
  id        String @id @default(cuid())
  actorId   String?
  actor     User? @relation(fields: [actorId], references: [id])
  entity    String
  entityId  String
  action    String
  diff      Json?
  createdAt DateTime @default(now())
}
```

**Seed idea**: preload common materials (PLA/PETG/ABS/ASA/TPU; brands/colors) and a demo printer.

---

## B) REST API (OpenAPI summary)

```yaml
openapi: 3.0.3
info:
  title: 3D Print Ops API
  version: 0.1.0
servers:
  - url: https://api.example.com
paths:
  /auth/login:
    post:
      summary: Email/password login
      requestBody: { required: true, content: { application/json: { schema: { type: object, properties: { email: {type: string}, password:{type: string} }, required: [email,password] } } } }
      responses: { '200': { description: OK } }

  /materials:
    get: { summary: List materials }
    post: { summary: Create material }
  /spools:
    get: { summary: List spools (filters: status, materialId, q) }
    post: { summary: Create spool }
  /spools/{id}:
    get: { summary: Get spool }
    patch: { summary: Update spool }
  /spools/{id}/events:
    post:
      summary: Append spool event (reserve/use/move/dry/adjust)
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                type: { type: string, enum: [reserve,use,move,dry,adjust] }
                grams: { type: integer }
                jobItemId: { type: string }
                location: { type: string }
                note: { type: string }
              required: [type]

  /printers:
    get: { summary: List printers }
    post: { summary: Create printer }

  /products:
    get: { summary: List product templates }
    post: { summary: Create product }

  /jobs:
    get: { summary: List jobs }
    post: { summary: Create job }
  /jobs/{id}:
    get: { summary: Get job }
    patch: { summary: Update job (status/assignments) }

  /notifications:
    get: { summary: List notifications, params: [status,category,severity] }
    post: { summary: Create (manual) }
  /notifications/{id}:
    patch: { summary: Acknowledge/assign/mute/resolve }

  /requests:
    get: { summary: List requests }
    post: { summary: Create request }
  /requests/{id}:
    get: { summary: Get request }
    patch: { summary: Update status }

  /vendors:
    get: { summary: List vendors }
    post: { summary: Create vendor }

  /pos:
    get: { summary: List purchase orders }
    post: { summary: Create PO }
  /pos/{id}:
    patch: { summary: Update PO (receive items) }
```

**Auth**: JWT bearer (short-lived) + refresh flow. All write endpoints require RBAC.

---

## C) Frontend Types (TS)

```ts
// types.ts
export type ID = string;
export type Role = 'ADMIN'|'OPERATOR'|'SALES';
export type SpoolStatus = 'IN_STORAGE'|'IN_USE'|'RESERVED'|'QUARANTINE'|'SCRAP';
export type JobStatus = 'INQUIRY'|'QUOTED'|'APPROVED'|'QUEUED'|'PRINTING'|'POST_PROCESS'|'QC'|'PACKED'|'DELIVERED'|'INVOICED';
export type Severity = 'INFO'|'WARN'|'CRITICAL';
export type AlertCategory = 'INVENTORY'|'PRINTER'|'JOB'|'MAINTENANCE'|'BILLING'|'REQUEST';

export interface Material { id:ID; name:string; brand?:string; series?:string; color?:string; hex?:string; diameter:'1.75'|'2.85'; costPerKg:number; sku?:string; }
export interface Spool { id:ID; materialId:ID; lot?:string; tareG:number; netG?:number; remainingG:number; status:SpoolStatus; location?:string; sig?:string; }
export interface Printer { id:ID; name:string; model?:string; volume?:string; nozzle?:string; slots?:number }
export interface Product { id:ID; name:string; defaults?:any }
export interface Job { id:ID; customerId?:ID; title:string; status:JobStatus; dueAt?:string; priority:number }
export interface JobItem { id:ID; jobId:ID; productId?:ID; qty:number; materialId?:ID; color?:string; gramsPlanned?:number; secondsPlanned?:number }
export interface Notification { id:ID; category:AlertCategory; severity:Severity; sourceType:string; sourceId:ID; title:string; body?:string; status:'OPEN'|'ACK'|'MUTED'|'RESOLVED'; assigneeId?:ID; createdAt:string }
export interface RequestItem { id:ID; requestId:ID; desc:string; qty:number; unit?:string; targetLocation?:string }
export interface Request { id:ID; type:string; requesterId:ID; priority:number; status:string; justification?:string; budgetCode?:string; linkedAlertId?:ID; createdAt:string; items:RequestItem[] }
```

---

## D) Docker (dev-friendly)

```yaml
# docker-compose.yml
version: '3.8'
services:
  db:
    image: postgres:16
    environment:
      POSTGRES_USER: app
      POSTGRES_PASSWORD: app
      POSTGRES_DB: app
    ports: ["5432:5432"]
    volumes: [db:/var/lib/postgresql/data]

  api:
    build: ./api
    environment:
      DATABASE_URL: postgres://app:app@db:5432/app
      JWT_SECRET: change_me
    depends_on: [db]
    ports: ["8000:8000"]

  frontend:
    build: ./app
    environment:
      NEXT_PUBLIC_API_URL: http://localhost:8000
    ports: ["3000:3000"]

  proxy:
    image: caddy:2
    ports: ["80:80", "443:443"]
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile
      - caddy:/data
      - caddy_config:/config
    depends_on: [frontend, api]

volumes:
  db:
  caddy:
  caddy_config:
```

**Caddyfile (example)**
```caddy
:80 {
  encode gzip
  handle_path /api/* {
    reverse_proxy api:8000
  }
  reverse_proxy frontend:3000
}
```

> For local dev on phones, use `ngrok http 80` or Cloudflare Tunnel and set `NEXT_PUBLIC_API_URL` to the external URL.

---

## E) Next.js PWA scaffold

**Folders**
```
/app
  /app
    /(routes)
      /dashboard/page.tsx
      /spools/page.tsx
      /spools/[id]/page.tsx
      /scan/page.tsx
      /jobs/page.tsx
      /jobs/[id]/page.tsx
      /requests/page.tsx
      /alerts/page.tsx
  /public/manifest.json
  /public/icons/icon-192.png
  /public/icons/icon-512.png
  next.config.js
  package.json
```

**next.config.js (PWA minimal)**
```js
const withPWA = require('next-pwa')({ dest: 'public', disable: process.env.NODE_ENV === 'development' });
module.exports = withPWA({ reactStrictMode: true });
```

**public/manifest.json**
```json
{ "name": "3D Print Ops", "short_name": "3DPrintOps", "start_url": "/", "display": "standalone", "theme_color": "#0ea5e9", "background_color": "#ffffff", "icons": [{"src":"/icons/icon-192.png","sizes":"192x192","type":"image/png"},{"src":"/icons/icon-512.png","sizes":"512x512","type":"image/png"}] }
```

**/app/scan/page.tsx (skeleton with iOS fallback hook)**
```tsx
'use client';
import { useEffect, useRef } from 'react';

export default function ScanPage(){
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const run = async () => {
      const hasBD = 'BarcodeDetector' in window;
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) { videoRef.current.srcObject = stream; await videoRef.current.play(); }
      if (hasBD) {
        const det = new (window as any).BarcodeDetector({ formats:['qr_code'] });
        const tick = async () => {
          if (videoRef.current) {
            const codes = await det.detect(videoRef.current);
            if (codes[0]) handleScan(codes[0].rawValue);
          }
          requestAnimationFrame(tick);
        };
        tick();
      } else {
        // fallback: dynamically import html5-qrcode or a wasm decoder
        // (keep this minimal to stay sample-sized)
      }
    };
    run();
    return () => { if (videoRef.current?.srcObject) (videoRef.current.srcObject as MediaStream).getTracks().forEach(t=>t.stop()); };
  }, []);

  function handleScan(value:string){
    const isUrl = /^https?:\/\//.test(value);
    window.location.href = isUrl ? value : `/scan?payload=${encodeURIComponent(value)}`;
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Scan</h1>
      <video ref={videoRef} className="w-full rounded" playsInline muted />
      <p className="text-sm opacity-70 mt-2">Point at a spool QR to reserve or update.</p>
    </div>
  );
}
```

**Route stubs to add quickly**
- `/spools` list + filters; `/spools/[id]` detail (quick actions: Reserve, Use grams, Move)
- `/jobs` board; `/jobs/[id]` timeline + attachments
- `/requests` Kanban (Submitted, Approved, Ordered, Receiving, Done)
- `/alerts` inbox with tabs + ack/assign/mute/resolve

**API client**: set `NEXT_PUBLIC_API_URL`, create a tiny fetch wrapper with JWT, and RTK Query/Zustand slices for cache.

---

## F) Example Workflows

**Reserve spools for a job**
1) Create Job → add JobItems.
2) Open JobItem → tap *Reserve spools* → scan 1–N spools.
3) Backend validates grams & status → creates `JobSpoolLink` rows → emits `Notification` (INFO: reservations placed).

**Low stock alert → Request**
1) Background cron computes projected depletion; finds Material below ROP.
2) Creates `Notification{category: INVENTORY, severity: WARN}`.
3) Rule auto-creates `Request(type: RESTOCK)` with suggested qty/vendor; assign to “Purchasing”.
```

