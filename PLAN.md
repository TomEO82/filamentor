# Filamentor - Master Project Plan

> **Purpose:** This document is the single source of truth for all technical specifications, architecture decisions, and feature requirements. All Claude Code agents should reference this file to understand the project context.

---

## Project Overview

**Filamentor** is a web app (PWA) for managing a 3D printing business, accessible from desktop and mobile.

### Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | Next.js 14 (App Router) with TypeScript |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth (email/password) |
| Styling | Tailwind CSS + shadcn/ui |
| Hosting | Vercel (frontend) + Supabase (backend/db) |
| PWA | next-pwa for installable mobile experience |

### Users

- 2 users: Owner and Partner
- Simple email/password authentication
- Both users have full access (no role-based restrictions for MVP)

---

## Feature Specifications

### Phase 1: Foundation (MVP Core)

#### 1.1 Project Setup

- Next.js 14 with App Router
- TypeScript strict mode
- Tailwind CSS with custom theme colors
- shadcn/ui component library
- PWA manifest and service worker
- ESLint + Prettier configuration

#### 1.2 Authentication

- Supabase Auth integration
- Login page with email/password
- Protected routes (redirect to login if not authenticated)
- User session persistence
- Logout functionality

#### 1.3 Navigation

- Responsive sidebar (collapsible on mobile)
- Navigation items:
  - Dashboard (home)
  - Filaments
  - Printers
  - Parts & Maintenance
  - Customers
  - Orders
  - Models (Phase 5)
  - Pricing (Phase 4)
  - Analytics (Phase 4)
- Current user display with logout option

#### 1.4 Dashboard Home

- Overview cards showing:
  - Active orders count
  - Printers status summary
  - Low stock alerts count
  - Recent activity feed
- Quick action buttons (New Order, Add Filament)

---

### Phase 2: Inventory Management

#### 2.1 Filament Inventory

**Fields:**

- Type (PLA, PETG, ABS, TPU, ASA, Nylon, Other)
- Brand (text)
- Color (text + color picker)
- Weight remaining (grams)
- Initial weight (grams, default 1000g)
- Purchase date
- Cost (currency)
- Supplier (text)
- Storage location (text)
- Low stock threshold (grams, default 200g)
- Notes (optional)

**Features:**

- List view with sorting/filtering
- Add/Edit/Delete operations
- Visual low stock indicator (yellow < threshold, red < 50g)
- Quick weight update (subtract used amount)
- Color preview in list

#### 2.2 Printer Inventory

**Fields:**

- Name (friendly name, e.g., "Printer 1")
- Model (e.g., "Prusa MK4")
- Serial number
- Purchase date
- Status (Idle, Printing, Maintenance, Offline)
- Usage hours (total)
- Initial hours (set once, for used printers)
- Notes (optional)

**Features:**

- List view with status indicators
- Status quick-toggle
- Usage hours tracking (manual update or auto from orders)
- Maintenance reminder indicator

#### 2.3 Replacement Parts Inventory

**Fields:**

- Name (e.g., "0.4mm Brass Nozzle")
- Type (Nozzle, Belt, Fan, Hotend, Extruder, Bed, Other)
- Quantity in stock
- Compatible printers (multi-select)
- Low stock threshold (default 2)
- Supplier (text)
- Cost per unit
- Notes (optional)

**Features:**

- List view with filtering by type
- Quick quantity update
- Low stock alerts

#### 2.4 Maintenance Logs

**Fields:**

- Printer (select)
- Date performed
- Type (Routine, Repair, Upgrade, Cleaning)
- Description (text)
- Parts used (multi-select from parts inventory, auto-decrements stock)
- Cost (labor + parts)
- Next maintenance due (optional date)

**Features:**

- Log history per printer
- Auto-create reminder for next maintenance
- Parts usage automatically updates inventory

#### 2.5 Low Stock Alerts System

- Dashboard widget showing all low stock items
- Visual indicators throughout the app
- Filter to show only low stock items
- Future: Shopping list generation (Phase 5)

---

### Phase 3: Orders & Customers

#### 3.1 Customer Database

**Fields:**

- Name (required)
- Email (optional)
- Phone (optional)
- Address (optional, text area)
- Preferred contact method (Email, Phone, WhatsApp)
- Notes (optional)
- Created date (auto)

**Features:**

- List view with search
- Customer detail page with order history
- Quick add from order creation

#### 3.2 Order Management

**Fields:**

- Order ID (auto-generated, format: ORD-YYYYMMDD-XXX)
- Customer (select or create new)
- Assigned to (Owner or Partner)
- Printer (select, optional until printing)
- Status (Pending, In Queue, Printing, Post-Processing, Ready, Delivered, Cancelled)
- Order items (see below)
- Total cost (calculated)
- Notes (optional)
- Created date (auto)
- Due date (optional)
- Completed date (auto when status = Delivered)

**Order Items:**

- Description (text, or select from Model Library)
- Quantity
- Filament used (select)
- Weight (grams)
- Print time (hours)
- Price (calculated or manual override)

**Features:**

- Create/Edit/View orders
- Status workflow with quick-change buttons
- Assign to printer when starting print
- Calculate total from items
- Link to customer

#### 3.3 Order History

- Searchable list of all orders
- Filters: Status, Date range, Customer, Printer, Assigned to
- Sort by: Date, Status, Customer, Total
- Export to CSV (future)

---

### Phase 4: Pricing & Analytics

#### 4.1 Pricing Configuration

**Global Settings:**

- Electricity cost per kWh
- Labor rate per hour
- Default printer power consumption (watts)
- Material markup percentage
- Failure rate buffer percentage
- Minimum order price

**Material Costs:**

- Cost per gram for each filament type (auto-calculated from inventory or manual)

#### 4.2 Dynamic Pricing Calculator

**Inputs:**

- Filament type (select)
- Weight (grams)
- Print time (hours)
- Post-processing time (hours, optional)

**Calculation:**

```
Material cost = weight_g * cost_per_gram * (1 + markup%)
Electricity cost = print_time_h * printer_watts * electricity_rate / 1000
Labor cost = (print_time_h + post_processing_h) * labor_rate
Subtotal = material + electricity + labor
Failure buffer = subtotal * failure_rate%
Total = subtotal + failure_buffer
```

**Output:**

- Itemized cost breakdown
- Suggested price
- Copy to order button

#### 4.3 Customer Quote Generator

- Same as pricing calculator
- Generate shareable quote (PDF or link)
- Quote reference number
- Validity period
- Convert quote to order button

#### 4.4 Invoice Generation

- Generate PDF invoice from order
- Include: Business name, customer info, items, total, payment terms
- Unique invoice number
- Download or email option

#### 4.5 Cost Analysis Dashboard

**Metrics:**

- Total revenue (by period)
- Total costs (materials, electricity, labor)
- Profit margin
- Orders by status
- Top customers
- Most printed models
- Material usage by type
- Printer utilization

**Visualizations:**

- Line chart: Revenue over time
- Pie chart: Costs breakdown
- Bar chart: Orders per month
- Table: Top 10 models/customers

---

### Phase 5: Advanced Features

#### 5.1 Model Library

**Fields:**

- Name
- Description
- Category (optional)
- File reference (filename, not stored in app)
- Default filament type
- Default color
- Estimated weight (grams)
- Estimated print time (hours)
- Suggested price (calculated or manual)
- Times printed (auto-count)
- Success rate (auto-calculated)
- Notes

**Features:**

- Searchable/filterable library
- Select model when creating order (auto-fills estimates)
- Track print success/failure

#### 5.2 Print Queue Management

- Kanban-style board: Queue, Printing, Post-Processing, Done
- Drag-drop to reorder queue
- Assign to printer
- Estimated completion time
- Calendar view (future)

#### 5.3 Failure Rate Tracking

- Log failed prints with reason
- Track by: Printer, Filament, Model
- Calculate success rates
- Identify problem areas

#### 5.4 Shopping List Generator

- Auto-generate list from low stock items
- Group by supplier
- Include quantity needed
- Manual add/remove items
- Mark as ordered

---

### Phase 6: Nice-to-Haves (Future)

- Photo Gallery (per order)
- Time Tracking (labor hours)
- Bulk Order Templates
- Print Settings Library
- Notifications (email/push)
- Multi-location support
- API for external integrations

---

## Database Schema

### Tables

```sql
-- Users (managed by Supabase Auth, extended with profile)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  name TEXT NOT NULL,
  role TEXT DEFAULT 'partner' CHECK (role IN ('owner', 'partner')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Filaments
CREATE TABLE filaments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL,
  brand TEXT,
  color TEXT NOT NULL,
  color_hex TEXT,
  weight_remaining_g DECIMAL NOT NULL DEFAULT 1000,
  initial_weight_g DECIMAL NOT NULL DEFAULT 1000,
  purchase_date DATE,
  cost DECIMAL,
  supplier TEXT,
  storage_location TEXT,
  low_stock_threshold_g DECIMAL DEFAULT 200,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Printers
CREATE TABLE printers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  model TEXT,
  serial_number TEXT,
  purchase_date DATE,
  status TEXT DEFAULT 'idle' CHECK (status IN ('idle', 'printing', 'maintenance', 'offline')),
  usage_hours DECIMAL DEFAULT 0,
  initial_hours DECIMAL DEFAULT 0,
  power_watts DECIMAL DEFAULT 200,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Parts
CREATE TABLE parts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 0,
  low_stock_threshold INTEGER DEFAULT 2,
  supplier TEXT,
  cost_per_unit DECIMAL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Parts to Printers (many-to-many)
CREATE TABLE parts_printers (
  part_id UUID REFERENCES parts(id) ON DELETE CASCADE,
  printer_id UUID REFERENCES printers(id) ON DELETE CASCADE,
  PRIMARY KEY (part_id, printer_id)
);

-- Maintenance Logs
CREATE TABLE maintenance_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  printer_id UUID REFERENCES printers(id) ON DELETE CASCADE,
  date_performed DATE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('routine', 'repair', 'upgrade', 'cleaning')),
  description TEXT,
  cost DECIMAL,
  next_maintenance_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Maintenance Parts Used (many-to-many)
CREATE TABLE maintenance_parts (
  maintenance_id UUID REFERENCES maintenance_logs(id) ON DELETE CASCADE,
  part_id UUID REFERENCES parts(id) ON DELETE SET NULL,
  quantity_used INTEGER DEFAULT 1,
  PRIMARY KEY (maintenance_id, part_id)
);

-- Customers
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  address TEXT,
  preferred_contact TEXT DEFAULT 'phone',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Models
CREATE TABLE models (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  file_reference TEXT,
  default_filament_type TEXT,
  default_color TEXT,
  estimated_weight_g DECIMAL,
  estimated_print_time_h DECIMAL,
  suggested_price DECIMAL,
  times_printed INTEGER DEFAULT 0,
  times_failed INTEGER DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE NOT NULL,
  customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
  assigned_to UUID REFERENCES profiles(id) ON DELETE SET NULL,
  printer_id UUID REFERENCES printers(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_queue', 'printing', 'post_processing', 'ready', 'delivered', 'cancelled')),
  total_cost DECIMAL,
  notes TEXT,
  due_date DATE,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Order Items
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  model_id UUID REFERENCES models(id) ON DELETE SET NULL,
  description TEXT NOT NULL,
  quantity INTEGER DEFAULT 1,
  filament_id UUID REFERENCES filaments(id) ON DELETE SET NULL,
  weight_g DECIMAL,
  print_time_h DECIMAL,
  price DECIMAL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Pricing Configuration
CREATE TABLE pricing_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  electricity_cost_per_kwh DECIMAL DEFAULT 0.12,
  labor_rate_per_hour DECIMAL DEFAULT 20,
  material_markup_percent DECIMAL DEFAULT 20,
  failure_rate_buffer_percent DECIMAL DEFAULT 10,
  minimum_order_price DECIMAL DEFAULT 10,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Print Failures (for tracking)
CREATE TABLE print_failures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_item_id UUID REFERENCES order_items(id) ON DELETE CASCADE,
  printer_id UUID REFERENCES printers(id) ON DELETE SET NULL,
  filament_id UUID REFERENCES filaments(id) ON DELETE SET NULL,
  model_id UUID REFERENCES models(id) ON DELETE SET NULL,
  reason TEXT,
  waste_g DECIMAL,
  occurred_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Row Level Security (RLS)

All tables will have RLS enabled. Policies will allow authenticated users to read/write all data (since both users have full access in MVP).

```sql
-- Example policy for filaments
ALTER TABLE filaments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users full access" ON filaments
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
```

---

## Project Structure

```
filamentor/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── (dashboard)/
│   │   ├── page.tsx                 # Dashboard home
│   │   ├── filaments/
│   │   │   ├── page.tsx             # List view
│   │   │   ├── new/page.tsx         # Create form
│   │   │   └── [id]/page.tsx        # Edit form
│   │   ├── printers/
│   │   │   ├── page.tsx
│   │   │   ├── new/page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── parts/
│   │   │   ├── page.tsx
│   │   │   ├── new/page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── maintenance/
│   │   │   ├── page.tsx
│   │   │   └── new/page.tsx
│   │   ├── customers/
│   │   │   ├── page.tsx
│   │   │   ├── new/page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── orders/
│   │   │   ├── page.tsx
│   │   │   ├── new/page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── models/
│   │   │   ├── page.tsx
│   │   │   ├── new/page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── pricing/
│   │   │   ├── page.tsx             # Calculator
│   │   │   └── settings/page.tsx    # Config
│   │   ├── analytics/
│   │   │   └── page.tsx
│   │   └── layout.tsx               # Dashboard layout with sidebar
│   ├── layout.tsx                   # Root layout
│   ├── globals.css
│   └── manifest.ts                  # PWA manifest
├── components/
│   ├── ui/                          # shadcn/ui components
│   ├── layout/
│   │   ├── sidebar.tsx
│   │   ├── header.tsx
│   │   └── mobile-nav.tsx
│   ├── forms/
│   │   ├── filament-form.tsx
│   │   ├── printer-form.tsx
│   │   ├── customer-form.tsx
│   │   └── order-form.tsx
│   └── features/
│       ├── dashboard/
│       │   ├── stats-cards.tsx
│       │   └── low-stock-alert.tsx
│       ├── inventory/
│       │   └── stock-indicator.tsx
│       └── orders/
│           └── status-badge.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts                # Browser client
│   │   ├── server.ts                # Server client
│   │   └── middleware.ts            # Auth middleware
│   ├── utils/
│   │   ├── pricing.ts               # Pricing calculations
│   │   ├── format.ts                # Date/currency formatting
│   │   └── order-number.ts          # Order ID generation
│   └── types/
│       ├── database.ts              # Supabase generated types
│       └── index.ts                  # Shared types
├── hooks/
│   ├── use-filaments.ts
│   ├── use-printers.ts
│   └── use-orders.ts
├── public/
│   ├── icons/                       # PWA icons
│   └── ...
├── PLAN.md                          # This file
├── TASKS.md                         # Task tracking
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Environment Variables

```env
# .env.local (DO NOT COMMIT)
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

---

## Coding Standards

### TypeScript

- Strict mode enabled
- Prefer interfaces over types for objects
- Use proper typing for all Supabase queries

### Components

- Use `"use client"` only when necessary
- Prefer Server Components for data fetching
- Forms use React Hook Form + Zod validation

### Naming Conventions

- Files: kebab-case (e.g., `filament-form.tsx`)
- Components: PascalCase (e.g., `FilamentForm`)
- Functions: camelCase
- Database columns: snake_case
- TypeScript types: PascalCase

### Git Commits

- Use conventional commits: `feat:`, `fix:`, `chore:`, etc.
- Reference task IDs when applicable

---

## Multi-Agent Instructions

### Before Starting Work

1. Read this PLAN.md file to understand the project
2. Check TASKS.md for available tasks
3. Claim a task by marking it "In Progress" in TASKS.md

### While Working

1. Follow the coding standards above
2. Reference this file for feature specifications
3. Log significant progress in TASKS.md Event Log

### When Complete

1. Mark task as completed in TASKS.md
2. Note any deviations or decisions in TASKS.md Notes section
3. If blocked, add to Blocked section for human review

---

## Verification Checklist

### Phase 1 Complete When

- [ ] Can login with email/password
- [ ] Logout works
- [ ] Sidebar navigation works on desktop
- [ ] Mobile navigation works
- [ ] Dashboard shows (can be placeholder)
- [ ] PWA can be installed on phone
- [ ] Supabase connection works

### Phase 2 Complete When

- [ ] Can CRUD filaments
- [ ] Can CRUD printers
- [ ] Can CRUD parts
- [ ] Can log maintenance
- [ ] Low stock indicators show correctly

### Phase 3 Complete When

- [ ] Can CRUD customers
- [ ] Can create orders with items
- [ ] Can assign orders to partner
- [ ] Can filter order history
- [ ] Order status workflow works

### Phase 4 Complete When

- [ ] Pricing calculator works
- [ ] Can configure pricing settings
- [ ] Can generate quote
- [ ] Can generate invoice PDF
- [ ] Analytics dashboard shows data

### Phase 5 Complete When

- [ ] Can CRUD models
- [ ] Print queue board works
- [ ] Failure tracking works
- [ ] Shopping list generates

---

*Last updated: 2025-01-28*
