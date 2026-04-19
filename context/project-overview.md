# 🐼 Baker-Os — Micro-ERP for Home Bakers

> **Project Overview v1.0** · Next.js Full-Stack SaaS Application
> **Repo**: `bakers-os`

---

## Table of Contents

1. [Problem Statement](#problem-statement)
2. [Target Users](#target-users)
3. [Core Modules](#core-modules)
4. [Data Model (Prisma)](#data-model-prisma)
5. [Tech Stack](#tech-stack)
6. [UI / UX Design System](#ui--ux-design-system)
7. [API Architecture](#api-architecture)
8. [Auth Flow](#auth-flow)
9. [AI Feature Architecture](#ai-feature-architecture)
10. [Development Workflow](#development-workflow)
11. [MVP Scope](#mvp-scope)
12. [Future Roadmap](#future-roadmap)
13. [Status Tracker](#status-tracker)

---

## Problem Statement (Core Idea)

Home bakers run their entire business from WhatsApp chats, handwritten notebooks, and mental math. There is **no affordable, purpose-built tool** that ties together inventory, recipes, costing, orders, and finances into a single workflow.

Enterprise ERPs are overkill. Spreadsheets break. Instagram DMs get lost.

**Baker-Os** is an AI-powered command center designed exclusively for home bakers — turning chaotic cottage-kitchen operations into a streamlined, profitable business. It connects the full lifecycle:

```
Buy Ingredients → Build Recipes → Price Products → Take Orders → Invoice & Get Paid
```

---

## Target Users

| Persona | Description |
| :--- | :--- |
| **Primary — Home Baker** | Solo or small-team operators selling via Instagram/WhatsApp in Indian cities. Non-technical, mobile-first, deals in ₹ (INR). Needs to move fast between baking and admin. |
| **Secondary — Small Bakery Owner** | 1–5 employee bakeries looking to professionalize without enterprise software. |
| **Future — End Customer** | The person ordering cakes. Interacts only through an exposed menu/catalog API or a lightweight storefront (Phase 2+). |

**Key assumptions**: Primarily mobile users. Communicate with customers on WhatsApp. Buy supplies from local vendors and e/q-commerce. Price in INR. Often self-taught bakers with limited accounting knowledge.

---

## Core Modules

### Module 1 — Smart Inventory & Intelligent Costing

- **Receipt Scanner (AI)** — Upload a photo/PDF of a supplier bill → AI extracts line items (item, qty, unit, price) into purchase history.
- **Master Ingredient Library** — Pre-loaded with ~150 common bakery items across categories (Dry Goods, Sugars, Dairy & Fats, Leaveners & Spices, Chocolates, Packaging). Zero-friction onboarding.
- **Smart Match (AI)** — Resolves scanned/typed terms (e.g. "Amul Butter", "1 tsp BS", "Maida") against the master library. Suggests matches, prevents duplicates, standardizes terminology.
- **Fractional Cost Calculator** — Automatic unit-cost math. 500 g butter @ ₹275 → 100 g = ₹55. Costs flow directly into recipe costing.
- **Custom Items** — Users add any specialty ingredient not in the master list.

### Module 2 — AI Recipe Lab

- **Web Scraper & Parser (AI)** — Paste a YouTube link or recipe blog URL → AI extracts structured recipe data (ingredients, quantities, units, method, bake time).
- **Handwritten Notes Vision (AI)** — Upload a photo of handwritten recipe notes → AI transcribes shorthand and maps to standardized ingredients.
- **Recipe Builder** — Manual recipe creation with ingredient linking from inventory.
- **Tweak / Scale Engine (AI)** — Type "Scale to 2.5 kg" → every ingredient and yield recalculates. Saved as a temporary "Event Batch" — master recipe stays untouched.
- **Auto-Allergen Tagging** — Cross-references ingredients against an allergen database to auto-tag recipes (Contains: Nuts, Gluten, Dairy, Eggs, etc.).
- **Label Generator** — Pulls batch-specific ingredients, allergens, nutrition estimates, "Best Before" date, and brand logo into a print-ready label.

### Module 3 — Product Pricing

- **Cost Aggregation Dashboard** — Pulls ingredient cost (from inventory), overhead cost (from Module 8), and labor/time estimates into a single manufacturing cost.
- **Margin Calculator** — Toggle a recipe from "In Development" → "Active Menu." Set a target profit margin (e.g. 40%) → system outputs the final selling price.
- **Pricing Formula**: `Selling Price = (Ingredient Cost + Overhead Cost + Packaging + Delivery) / (1 - Target Margin %)`

### Module 4 — Smart Menu & Catalog Creator

- **Active Menu Dashboard** — All products marked "Active" organized by category (Cakes, Cupcakes, Brownies, Cookies, etc.).
- **AI Caption Generator** — Takes recipe/ingredient notes and generates Instagram-ready product descriptions and captions.
- **Dual-Purpose Menu**:
  - *Display Mode* — Generate shareable menu images/cards for Instagram stories and WhatsApp catalogs.
  - *API Mode* — Expose the menu as a REST endpoint for future e-commerce integrations.

### Module 5 — CRM & Order Intake

- **Smart Order Parsing (AI)** — Paste a raw WhatsApp/Instagram DM → AI auto-fills an Order Ticket: customer name, item (linked to recipe), quantity, due date, delivery address, payment status.
- **Customer Database** — Track repeat customers, order history, preferences.
- **Order Lifecycle**: `New → Confirmed → In Production → Ready → Dispatched → Delivered → Paid`

### Module 6 — Purchase Orders & Predictive Inventory

- **Just-In-Time Procurement** — Calculates total ingredient requirements from upcoming confirmed orders, compares against current stock, generates a "Suggested Purchase Order."
- **Vendor Management** — Maintain supplier list with contact info. One-click to format a PO as a WhatsApp message.
- **Low-Stock Alerts** — Threshold-based notifications when any ingredient falls below user-defined minimum.

### Module 7 — Invoicing & Financials

- **Smart Invoice Generator** — Auto-generates a professional PDF invoice with line items, delivery fees, total, and a dynamic UPI QR code.
- **Payment Reconciliation (AI)** — Upload a UPI payment screenshot → AI reads the reference number and auto-marks the corresponding invoice as "Paid."
- **Revenue Dashboard** — Monthly/weekly revenue, expenses, and profit at a glance.

### Module 8 — Overhead & Crisis Tracking *(Phase 2)*

- **Dynamic Utility Costing** — Log recurring costs (LPG cylinder, electricity, packaging) with estimated usage hours/units. System calculates per-hour/per-unit overhead rate.
- **Auto-Apply to Recipes** — Bake time in a recipe automatically pulls in the corresponding fuel/electricity cost per batch.
- **Auto-Update** — When a new utility receipt is uploaded, all downstream recipe costs recalculate.

### Module 9 — Margin Monitor / AI Financial Advisor *(Phase 2)*

- **Threshold Alerts** — Set minimum acceptable margin per product/category. If ingredient price spikes push a product below threshold, a red alert fires.
- **Resolution Engine (AI)** — Presents three options: Increase Price (with exact new price), Shrink Yield (with percentage), or Absorb Cost (with impact analysis).

### Module 10 — Action-Oriented Admin Dashboard

- **Exception-Based UI** — Clean screen by default. Only surfaces items needing attention: low stock, margin alerts, pending orders, overdue payments.
- **Triage Alert Feed** — Prioritized cards (red/yellow/green) showing what's broken or needs action.
- **Key Metrics Bar** — Active menu items, average margin, pending orders, revenue this month.

---

## Data Model (Prisma)

> This schema is a starting point and **will evolve** as modules are built.

### Entity Relationship Overview

```
User (tenant root)
 ├── UserIngredient ──→ MasterIngredient (optional, system-seeded)
 │    └── PurchaseItem ──→ Vendor
 │    └── RecipeIngredient
 ├── Recipe
 │    ├── RecipeIngredient ──→ UserIngredient
 │    ├── EventBatch ──→ Order
 │    └── Product
 │         └── OrderItem
 ├── Customer
 │    └── Order
 │         ├── OrderItem ──→ Product
 │         ├── EventBatch ──→ Recipe
 │         └── Invoice
 ├── Vendor
 │    ├── PurchaseItem
 │    └── PurchaseOrder
 ├── Overhead
 └── Alert
```

### Schema

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─────────────────────────────────────────
// AUTH & USER
// ─────────────────────────────────────────

model User {
  id            String   @id @default(cuid())
  email         String   @unique
  name          String
  businessName  String?
  phone         String?
  logoUrl       String?
  currency      String   @default("INR")
  defaultMargin Float    @default(0.40)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  ingredients    UserIngredient[]
  recipes        Recipe[]
  products       Product[]
  orders         Order[]
  customers      Customer[]
  vendors        Vendor[]
  purchaseOrders PurchaseOrder[]
  invoices       Invoice[]
  overheads      Overhead[]
  alerts         Alert[]
}

// ─────────────────────────────────────────
// INVENTORY
// ─────────────────────────────────────────

model MasterIngredient {
  id           String             @id @default(cuid())
  name         String             @unique
  aliases      String[]           // e.g. ["Maida", "APF", "All Purpose Flour"]
  category     IngredientCategory
  defaultUnit  String             // "g", "ml", "piece"
  allergens    String[]           // e.g. ["gluten", "dairy"]
  isSystemItem Boolean            @default(true)

  userIngredients UserIngredient[]
}

model UserIngredient {
  id                 String    @id @default(cuid())
  userId             String
  masterIngredientId String?
  customName         String?   // only if not from master list
  currentStock       Float     @default(0)
  unit               String
  costPerUnit        Float     @default(0) // ₹ per 1 unit (gram, ml, etc.)
  lowStockThreshold  Float     @default(0)
  lastPurchasedAt    DateTime?
  createdAt          DateTime  @default(now())
  updatedAt          DateTime  @updatedAt

  user             User              @relation(fields: [userId], references: [id])
  masterIngredient MasterIngredient? @relation(fields: [masterIngredientId], references: [id])
  purchases        PurchaseItem[]
  recipeIngredients RecipeIngredient[]

  @@unique([userId, masterIngredientId])
}

enum IngredientCategory {
  DRY_GOODS
  SUGARS
  DAIRY_FATS
  LEAVENERS_SPICES
  CHOCOLATES
  NUTS_DRIED_FRUITS
  EXTRACTS_FLAVOURS
  PACKAGING
  OTHER
}

// ─────────────────────────────────────────
// PURCHASES
// ─────────────────────────────────────────

model PurchaseItem {
  id               String   @id @default(cuid())
  userId           String
  userIngredientId String
  vendorId         String?
  quantity         Float
  unit             String
  totalCost        Float
  costPerUnit      Float    // calculated: totalCost / quantity
  receiptImageUrl  String?
  purchasedAt      DateTime @default(now())

  userIngredient UserIngredient @relation(fields: [userIngredientId], references: [id])
  vendor         Vendor?        @relation(fields: [vendorId], references: [id])
}

// ─────────────────────────────────────────
// RECIPES
// ─────────────────────────────────────────

model Recipe {
  id              String       @id @default(cuid())
  userId          String
  name            String
  description     String?
  method          String?      // rich text / markdown steps
  baseYield       Float        // e.g. 1.0 (kg)
  baseYieldUnit   String       // "kg", "pieces", "dozen"
  bakeTimeMinutes Int?
  bakeTemp        Int?         // °C
  allergens       String[]     // auto-computed from ingredients
  sourceUrl       String?      // YouTube / blog link
  sourceType      RecipeSource @default(MANUAL)
  status          RecipeStatus @default(DRAFT)
  totalCost       Float        @default(0) // auto-calculated
  createdAt       DateTime     @default(now())
  updatedAt       DateTime     @updatedAt

  user         User               @relation(fields: [userId], references: [id])
  ingredients  RecipeIngredient[]
  products     Product[]
  eventBatches EventBatch[]
}

model RecipeIngredient {
  id               String @id @default(cuid())
  recipeId         String
  userIngredientId String
  quantity         Float
  unit             String
  costContribution Float  @default(0) // auto: quantity * costPerUnit

  recipe         Recipe         @relation(fields: [recipeId], references: [id], onDelete: Cascade)
  userIngredient UserIngredient @relation(fields: [userIngredientId], references: [id])
}

model EventBatch {
  id          String   @id @default(cuid())
  recipeId    String
  orderId     String?
  scaleFactor Float    // 2.5x, 0.5x, etc.
  scaledYield Float
  scaledCost  Float
  createdAt   DateTime @default(now())

  recipe Recipe @relation(fields: [recipeId], references: [id])
  order  Order? @relation(fields: [orderId], references: [id])
}

enum RecipeSource {
  MANUAL
  YOUTUBE
  BLOG
  HANDWRITTEN
  IMPORTED
}

enum RecipeStatus {
  DRAFT
  TESTED
  ACTIVE
  ARCHIVED
}

// ─────────────────────────────────────────
// PRODUCTS & MENU
// ─────────────────────────────────────────

model Product {
  id                String          @id @default(cuid())
  userId            String
  recipeId          String
  name              String
  description       String?         // AI-generated caption
  category          ProductCategory
  manufacturingCost Float           @default(0)
  overheadCost      Float           @default(0)
  sellingPrice      Float           @default(0)
  targetMargin      Float           @default(0.40)
  imageUrl          String?
  isActive          Boolean         @default(false)
  isPublic          Boolean         @default(false) // exposed via public API
  createdAt         DateTime        @default(now())
  updatedAt         DateTime        @updatedAt

  user       User        @relation(fields: [userId], references: [id])
  recipe     Recipe      @relation(fields: [recipeId], references: [id])
  orderItems OrderItem[]
}

enum ProductCategory {
  CAKES
  CUPCAKES
  BROWNIES
  COOKIES
  BREADS
  PASTRIES
  DESSERTS
  SAVOURY
  BEVERAGES
  OTHER
}

// ─────────────────────────────────────────
// CRM & ORDERS
// ─────────────────────────────────────────

model Customer {
  id        String   @id @default(cuid())
  userId    String
  name      String
  phone     String?
  email     String?
  address   String?
  notes     String?
  createdAt DateTime @default(now())

  user   User    @relation(fields: [userId], references: [id])
  orders Order[]
}

model Order {
  id              String        @id @default(cuid())
  userId          String
  customerId      String?
  orderNumber     String        @unique // auto-generated: PH-20260406-001
  status          OrderStatus   @default(NEW)
  dueDate         DateTime?
  deliveryAddress String?
  deliveryFee     Float         @default(0)
  totalAmount     Float         @default(0)
  notes           String?       // raw pasted message
  paymentStatus   PaymentStatus @default(UNPAID)
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt

  user         User         @relation(fields: [userId], references: [id])
  customer     Customer?    @relation(fields: [customerId], references: [id])
  items        OrderItem[]
  eventBatches EventBatch[]
  invoice      Invoice?
}

model OrderItem {
  id        String @id @default(cuid())
  orderId   String
  productId String
  quantity  Int
  unitPrice Float
  lineTotal Float

  order   Order   @relation(fields: [orderId], references: [id], onDelete: Cascade)
  product Product @relation(fields: [productId], references: [id])
}

enum OrderStatus {
  NEW
  CONFIRMED
  IN_PRODUCTION
  READY
  DISPATCHED
  DELIVERED
  CANCELLED
}

enum PaymentStatus {
  UNPAID
  PARTIAL
  PAID
  REFUNDED
}

// ─────────────────────────────────────────
// VENDORS & PURCHASE ORDERS
// ─────────────────────────────────────────

model Vendor {
  id        String   @id @default(cuid())
  userId    String
  name      String
  phone     String?
  address   String?
  notes     String?
  createdAt DateTime @default(now())

  user           User            @relation(fields: [userId], references: [id])
  purchases      PurchaseItem[]
  purchaseOrders PurchaseOrder[]
}

model PurchaseOrder {
  id            String   @id @default(cuid())
  userId        String
  vendorId      String?
  status        POStatus @default(SUGGESTED)
  items         Json     // [{ ingredientId, name, qty, unit }]
  totalEstimate Float    @default(0)
  createdAt     DateTime @default(now())

  user   User    @relation(fields: [userId], references: [id])
  vendor Vendor? @relation(fields: [vendorId], references: [id])
}

enum POStatus {
  SUGGESTED
  SENT
  CONFIRMED
  RECEIVED
  CANCELLED
}

// ─────────────────────────────────────────
// INVOICING
// ─────────────────────────────────────────

model Invoice {
  id            String        @id @default(cuid())
  userId        String
  orderId       String        @unique
  invoiceNumber String        @unique // INV-20260406-001
  totalAmount   Float
  pdfUrl        String?
  upiId         String?
  paymentStatus PaymentStatus @default(UNPAID)
  paidAt        DateTime?
  upiRef        String?       // extracted from screenshot
  createdAt     DateTime      @default(now())

  user  User  @relation(fields: [userId], references: [id])
  order Order @relation(fields: [orderId], references: [id])
}

// ─────────────────────────────────────────
// OVERHEADS (Phase 2)
// ─────────────────────────────────────────

model Overhead {
  id          String           @id @default(cuid())
  userId      String
  name        String           // "LPG Cylinder", "Electricity"
  category    OverheadCategory
  totalCost   Float            // e.g. ₹2,246
  totalUnits  Float            // e.g. 50 hours
  unitLabel   String           // "hour", "kWh"
  costPerUnit Float            // auto-calculated
  receiptUrl  String?
  loggedAt    DateTime         @default(now())

  user User @relation(fields: [userId], references: [id])
}

enum OverheadCategory {
  FUEL
  ELECTRICITY
  PACKAGING
  RENT
  EQUIPMENT
  TRANSPORT
  OTHER
}

// ─────────────────────────────────────────
// ALERTS / DASHBOARD
// ─────────────────────────────────────────

model Alert {
  id              String        @id @default(cuid())
  userId          String
  type            AlertType
  severity        AlertSeverity
  title           String
  message         String
  relatedEntityId String?
  isRead          Boolean       @default(false)
  isDismissed     Boolean       @default(false)
  createdAt       DateTime      @default(now())

  user User @relation(fields: [userId], references: [id])
}

enum AlertType {
  LOW_STOCK
  MARGIN_BREACH
  ORDER_DUE
  PAYMENT_OVERDUE
  PRICE_SPIKE
  SYSTEM
}

enum AlertSeverity {
  INFO
  WARNING
  CRITICAL
}
```

---

## Tech Stack

| Layer | Technology | Rationale | Links |
| :--- | :--- | :--- | :--- |
| **Framework** | Next.js 16 (App Router) | Full-stack React with SSR, API routes, server actions | [nextjs.org](https://nextjs.org) |
| **Language** | TypeScript | Type safety across front and back end | [typescriptlang.org](https://www.typescriptlang.org) |
| **Database** | PostgreSQL (Supabase or Neon) | Relational + JSON support; generous free tiers | [supabase.com](https://supabase.com) · [neon.tech](https://neon.tech) |
| **ORM** | Prisma | Type-safe queries, migrations, schema-as-docs | [prisma.io](https://www.prisma.io) |
| **Auth** | NextAuth.js v5 (Auth.js) | Google OAuth + email magic links; JWT sessions | [authjs.dev](https://authjs.dev) |
| **AI / LLM** | Anthropic Claude API (Sonnet) | Receipt parsing, recipe extraction, smart matching, captions, order parsing, payment OCR | [docs.anthropic.com](https://docs.anthropic.com) |
| **File Storage** | Supabase Storage or AWS S3 | Receipt images, label PDFs, product photos, logos | [supabase.com/storage](https://supabase.com/docs/guides/storage) |
| **Styling** | Tailwind CSS 4 + shadcn/ui | Utility-first CSS with polished, accessible components | [tailwindcss.com](https://tailwindcss.com) · [ui.shadcn.com](https://ui.shadcn.com) |
| **Charts** | Recharts | Lightweight React charting for financials | [recharts.org](https://recharts.org) |
| **PDF Generation** | `@react-pdf/renderer` or `pdf-lib` | Invoices and labels | [react-pdf.org](https://react-pdf.org) · [pdf-lib.js.org](https://pdf-lib.js.org) |
| **State** | React Server Components + TanStack Query | Server-first data fetching; client cache for interactive modules | [tanstack.com/query](https://tanstack.com/query) |
| **Validation** | Zod | Shared schemas for API + form validation | [zod.dev](https://zod.dev) |
| **Deployment** | Vercel | Zero-config Next.js hosting with edge functions | [vercel.com](https://vercel.com) |
| **Monorepo** | Turborepo *(if needed)* | Only if a separate public menu API or mobile app is added | [turbo.build](https://turbo.build) |

---

## UI / UX Design System

### Color Theme — shadcn/ui Design Tokens

CSS custom properties following the shadcn/ui convention. Each token has a light and dark mode value.

#### Base & Layout Colors

| Token | Light | Dark |
| :--- | :--- | :--- |
| `--background` | `#ffffff` | `oklch(0.145 0 0)` |
| `--foreground` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` |
| `--border` | `rgba(0, 0, 0, 0.1)` | `oklch(0.269 0 0)` |
| `--input` | `transparent` | `oklch(0.269 0 0)` |
| `--input-background` | `#f3f3f5` | — |
| `--switch-background` | `#cbced4` | — |
| `--ring` | `oklch(0.708 0 0)` | `oklch(0.439 0 0)` |

#### Component Colors

| Token | Light | Dark |
| :--- | :--- | :--- |
| `--primary` | `#030213` | `oklch(0.985 0 0)` |
| `--primary-foreground` | `oklch(1 0 0)` | `oklch(0.205 0 0)` |
| `--secondary` | `oklch(0.95 0.0058 264.53)` | `oklch(0.269 0 0)` |
| `--secondary-foreground` | `#030213` | `oklch(0.985 0 0)` |
| `--muted` | `#ececf0` | `oklch(0.269 0 0)` |
| `--muted-foreground` | `#717182` | `oklch(0.708 0 0)` |
| `--accent` | `#e9ebef` | `oklch(0.269 0 0)` |
| `--accent-foreground` | `#030213` | `oklch(0.985 0 0)` |
| `--destructive` | `#d4183d` | `oklch(0.396 0.141 25.723)` |
| `--destructive-foreground` | `#ffffff` | `oklch(0.637 0.237 25.331)` |

#### Surface & Container Colors

| Token | Light | Dark |
| :--- | :--- | :--- |
| `--card` | `#ffffff` | `oklch(0.145 0 0)` |
| `--card-foreground` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` |
| `--popover` | `oklch(1 0 0)` | `oklch(0.145 0 0)` |
| `--popover-foreground` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` |

#### Chart Colors

| Token | Light | Dark |
| :--- | :--- | :--- |
| `--chart-1` | `oklch(0.646 0.222 41.116)` | `oklch(0.488 0.243 264.376)` |
| `--chart-2` | `oklch(0.6 0.118 184.704)` | `oklch(0.696 0.17 162.48)` |
| `--chart-3` | `oklch(0.398 0.07 227.392)` | `oklch(0.769 0.188 70.08)` |
| `--chart-4` | `oklch(0.828 0.189 84.429)` | `oklch(0.627 0.265 303.9)` |
| `--chart-5` | `oklch(0.769 0.188 70.08)` | `oklch(0.645 0.246 16.439)` |

#### Sidebar Theme Colors

| Token | Light | Dark |
| :--- | :--- | :--- |
| `--sidebar` | `oklch(0.985 0 0)` | `oklch(0.205 0 0)` |
| `--sidebar-foreground` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` |
| `--sidebar-primary` | `#030213` | `oklch(0.488 0.243 264.376)` |
| `--sidebar-primary-foreground` | `oklch(0.985 0 0)` | `oklch(0.985 0 0)` |
| `--sidebar-accent` | `oklch(0.97 0 0)` | `oklch(0.269 0 0)` |
| `--sidebar-accent-foreground` | `oklch(0.205 0 0)` | `oklch(0.985 0 0)` |
| `--sidebar-border` | `oklch(0.922 0 0)` | `oklch(0.269 0 0)` |
| `--sidebar-ring` | `oklch(0.708 0 0)` | `oklch(0.439 0 0)` |

#### Typography

| Token | Value | Usage |
| :--- | :--- | :--- |
| `--font-display` | `'Playfair Display', serif` | Headings, hero text |
| `--font-body` | `'DM Sans', sans-serif` | Body copy, UI labels |
| `--font-mono` | `'JetBrains Mono', monospace` | Code, numbers, IDs |

**Google Fonts**: [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) · [DM Sans](https://fonts.google.com/specimen/DM+Sans) · [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)

#### Radii & Shadows

```css
--radius-sm:       6px;
--radius-md:       10px;
--radius-lg:       16px;

--shadow-card:     0 1px 3px rgba(44, 24, 16, 0.06),
                   0 4px 12px rgba(44, 24, 16, 0.04);
--shadow-elevated: 0 4px 6px rgba(44, 24, 16, 0.08),
                   0 12px 28px rgba(44, 24, 16, 0.06);
```
### Screenshots

Refer the screenshots below as a base for the Dashboard UI. It Does't have to be exact. use it for a referance.
@context\screenshots\dashboard.png
@context\screenshots\orders.png
@context\screenshots\modal.png

### Layout Principles

- **Sidebar navigation** — collapsible on desktop, bottom tab bar on mobile. Sections map to the 10 modules.
- **Dashboard-first** — Landing page is Module 10 (admin dashboard). Clean by default, showing only exception alerts.
- **Card-based content** — Consistent card components for recipes, products, orders, etc.
- **Slide-over panels** — Quick-create actions (add ingredient, parse order) without leaving the current page.
- **Command palette (⌘K)** — Quick-jump to any recipe, product, customer, or order.

### Responsive Breakpoints

| Breakpoint | Behavior |
| :--- | :--- |
| **Mobile (< 640px)** | Bottom tab bar with 5 key sections (Dashboard, Recipes, Orders, Menu, More). Cards stack vertically. AI inputs use full-screen slide-ups. **Primary experience.** |
| **Tablet (640–1024px)** | Collapsible sidebar. Two-column layouts where appropriate (e.g. recipe list + detail). |
| **Desktop (> 1024px)** | Persistent sidebar. Three-column layouts for power-user views (e.g. order list + detail + timeline). |

---

## API Architecture

Next.js App Router with **Route Handlers** (`app/api/...`) and **Server Actions** as the two API patterns.

### Route Handlers (REST-style)

Used for: external integrations, public menu API, webhook receivers, file uploads.

```
Public Menu
  GET  /api/menu                    → Public catalog (filterable by category)
  GET  /api/menu/:productId         → Single product detail

AI Endpoints
  POST /api/ai/parse-receipt        → Upload receipt image → extracted items
  POST /api/ai/parse-recipe         → URL or image → structured recipe
  POST /api/ai/parse-order          → Raw text → structured order ticket
  POST /api/ai/generate-caption     → Recipe data → caption variants
  POST /api/ai/match-ingredient     → Term → ranked matches from library
  POST /api/ai/reconcile-payment    → UPI screenshot → reference number

File Uploads
  POST /api/uploads/receipt         → File upload → URL
  POST /api/uploads/product-image   → File upload → URL

Reports
  GET  /api/reports/revenue         → Monthly/weekly financials
  GET  /api/reports/margins         → Per-product margin health
```

### Server Actions (co-located with pages)

Used for: all CRUD operations, form submissions, status transitions.

```
actions/
├── inventory.ts    → addIngredient, updateStock, logPurchase
├── recipes.ts      → createRecipe, updateRecipe, scaleRecipe, archiveRecipe
├── products.ts     → activateProduct, updatePricing, togglePublic
├── orders.ts       → createOrder, updateStatus, assignBatch
├── customers.ts    → upsertCustomer
├── vendors.ts      → upsertVendor, sendPO
├── invoices.ts     → generateInvoice, markPaid
├── overheads.ts    → logOverhead, recalculateCosts
└── alerts.ts       → dismissAlert, markRead
```

### Middleware

- **Auth check** on all `/api/*` except `/api/menu` (public).
- **Rate limiting** on AI endpoints (token-expensive).
- **File size validation** on upload endpoints (max 10 MB).

---

## Auth Flow

```
1. User visits app → redirected to /login
2. Login options:
   a. Google OAuth (primary — most home bakers have Google)
   b. Email magic link (fallback)
3. NextAuth.js v5 handles the flow:
   - Google: OAuth2 → callback → JWT session created
   - Email: Magic link sent → click → JWT session created
4. JWT contains: { userId, email, name }
5. On first login → onboarding wizard:
   - Business name, logo upload, phone number
   - Master Ingredient Library pre-loaded into user's inventory
6. All subsequent requests carry session cookie
7. Middleware checks session on every protected route
8. Session refresh handled automatically by NextAuth
```

**Authorization model**: Single-tenant. Each user sees only their own data. All queries scoped with `WHERE userId = session.user.id`. No roles/permissions needed in MVP.

---

## AI Feature Architecture

All AI features use the Anthropic Claude API (Sonnet) via server-side route handlers. No AI calls from the client.

### AI Endpoint Reference

| Endpoint | Input | Prompt Strategy | Output |
| :--- | :--- | :--- | :--- |
| **Parse Receipt** | Image (base64) | Vision: "Extract every line item as JSON: {name, qty, unit, totalPrice}" | `PurchaseItem[]` |
| **Smart Match** | Ingredient string | Few-shot: Given master list, find best match or flag as new | `{ matchId, confidence, isNew }` |
| **Parse Recipe (URL)** | YouTube/blog URL | Fetch transcript/content → "Extract structured recipe as JSON" | `Recipe` draft |
| **Parse Recipe (Image)** | Photo of handwritten notes | Vision: "Transcribe and structure this recipe" | `Recipe` draft |
| **Scale Recipe** | Recipe + target yield | Math prompt with ingredient list | `RecipeIngredient[]` scaled |
| **Generate Caption** | Product name + ingredients | "Write 3 Instagram captions for a Chennai home baker" | `string[3]` |
| **Parse Order** | Raw WhatsApp text | "Extract order details as JSON: {customer, item, qty, date, address, payment}" | `Order` draft |
| **Reconcile Payment** | UPI screenshot (base64) | Vision: "Extract UPI reference number and amount" | `{ upiRef, amount }` |
| **Margin Advisor** | Product + old/new cost | "Suggest 3 resolution options with exact numbers" | `Resolution[3]` |

### Error Handling

All AI endpoints return a standard envelope:

```json
{ "success": true, "data": {}, "error": null, "confidence": 0.92 }
```

If `confidence < 0.7`, the UI shows the result as a **suggestion requiring manual confirmation** rather than auto-applying.

---

## Development Workflow & Branch

Feature-branch Git workflow with trunk-based development.

```
main (production)
 └── dev (staging)
      ├── feat/module-1-inventory
      ├── feat/module-2-recipes
      ├── feat/module-5-orders
      ├── fix/receipt-parser-edge-case
      └── chore/seed-master-ingredients
```

## MVP Scope

The minimum viable product that a home baker can use end-to-end:

| Module | What's Included |
| :--- | :--- |
| **Auth** | Google OAuth login |
| **Module 1 — Inventory** |
| **Module 2 — Recipes** | 
| **Module 3 — Pricing** |
| **Module 4 — Menu** |
| **Module 5 — Orders** |
| **Module 7 — Invoicing** |
| **Module 10 — Dashboard** |

### Explicitly Excluded from MVP

All AI features (scanner, parser, smart match, captions), overhead tracking (Module 8), margin monitor (Module 9), predictive POs (Module 6), payment reconciliation, public API, label generator.

---

## Future Roadmap

| Enhancement | Phase | Description |
| :--- | :--- | :--- |
| AI Receipt Scanner | Post-MVP | Claude Vision for supplier bill extraction |
| AI Recipe Scraper | Post-MVP | YouTube transcript + blog content parsing |
| AI Smart Match | Post-MVP | Fuzzy ingredient matching against master library |
| AI Order Parser | Post-MVP | WhatsApp message → structured order |


> **Next step**: Set up the Next.js project, configure Prisma + PostgreSQL, implement auth, and seed the master ingredient library.
