// ─────────────────────────────────────────
// Mock Data — Single source of truth until DB is wired up
// Mirrors the Prisma schema from context/project-overview.md
// ─────────────────────────────────────────

// ─── Types ───────────────────────────────

export type AlertSeverity = "INFO" | "WARNING" | "CRITICAL";
export type AlertType =
  | "LOW_STOCK"
  | "MARGIN_BREACH"
  | "ORDER_DUE"
  | "PAYMENT_OVERDUE"
  | "PRICE_SPIKE"
  | "SYSTEM";

export type OrderStatus =
  | "NEW"
  | "CONFIRMED"
  | "IN_PRODUCTION"
  | "READY"
  | "DISPATCHED"
  | "DELIVERED"
  | "CANCELLED";

export type PaymentStatus = "UNPAID" | "PARTIAL" | "PAID" | "REFUNDED";

export type ProductCategory =
  | "CAKES"
  | "CUPCAKES"
  | "BROWNIES"
  | "COOKIES"
  | "BREADS"
  | "PASTRIES"
  | "DESSERTS"
  | "SAVOURY"
  | "BEVERAGES"
  | "OTHER";

export type IngredientCategory =
  | "DRY_GOODS"
  | "SUGARS"
  | "DAIRY_FATS"
  | "LEAVENERS_SPICES"
  | "CHOCOLATES"
  | "NUTS_DRIED_FRUITS"
  | "EXTRACTS_FLAVOURS"
  | "PACKAGING"
  | "OTHER";

export type RecipeStatus = "DRAFT" | "TESTED" | "ACTIVE" | "ARCHIVED";

// ─── Interfaces ──────────────────────────

export interface DashboardMetrics {
  pendingOrders: number;
  activeMenuItems: number;
  revenueMTD: number;
  avgMargin: number;
}

export interface Alert {
  id: string;
  type: AlertType;
  severity: AlertSeverity;
  title: string;
  message: string;
  relatedEntityId?: string;
  actionLabel: string;
  actionHref: string;
  isRead: boolean;
  isDismissed: boolean;
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  notes?: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  status: OrderStatus;
  dueDate: string;
  deliveryAddress?: string;
  deliveryFee: number;
  totalAmount: number;
  notes?: string;
  paymentStatus: PaymentStatus;
  items: OrderItem[];
  createdAt: string;
}

export interface Ingredient {
  id: string;
  name: string;
  category: IngredientCategory;
  currentStock: number;
  unit: string;
  costPerUnit: number;
  lowStockThreshold: number;
}

export interface Recipe {
  id: string;
  name: string;
  description?: string;
  baseYield: number;
  baseYieldUnit: string;
  bakeTimeMinutes?: number;
  bakeTemp?: number;
  allergens: string[];
  status: RecipeStatus;
  totalCost: number;
}

export interface Product {
  id: string;
  name: string;
  recipeId: string;
  category: ProductCategory;
  manufacturingCost: number;
  sellingPrice: number;
  targetMargin: number;
  isActive: boolean;
  imageUrl?: string;
}

// ─── Mock User ───────────────────────────

export const mockUser = {
  id: "user_01",
  name: "Priya",
  email: "priya@bake.in",
  businessName: "Sweet Kitchen",
  phone: "+91 98765 43210",
  currency: "INR",
  defaultMargin: 0.4,
};

// ─── Dashboard Metrics ───────────────────

export const dashboardMetrics: DashboardMetrics = {
  pendingOrders: 12,
  activeMenuItems: 24,
  revenueMTD: 45000,
  avgMargin: 0.42,
};

// ─── Alerts ──────────────────────────────

export const alerts: Alert[] = [
  {
    id: "alert_01",
    type: "LOW_STOCK",
    severity: "WARNING",
    title: "Low Inventory Alert",
    message:
      "Amul Butter is below 500g. You need 2kg for upcoming weekend orders.",
    relatedEntityId: "ing_02",
    actionLabel: "Restock Now",
    actionHref: "/inventory",
    isRead: false,
    isDismissed: false,
    createdAt: "2026-04-19T08:00:00Z",
  },
  {
    id: "alert_02",
    type: "MARGIN_BREACH",
    severity: "CRITICAL",
    title: "Margin Drop: Chocolate Truffle",
    message:
      "Cocoa powder price increased by 15%. Margin is now 28% (Target: 40%).",
    relatedEntityId: "prod_01",
    actionLabel: "Review Pricing",
    actionHref: "/recipes",
    isRead: false,
    isDismissed: false,
    createdAt: "2026-04-19T07:30:00Z",
  },
  {
    id: "alert_03",
    type: "PAYMENT_OVERDUE",
    severity: "WARNING",
    title: "Unpaid Invoice",
    message:
      "Neha Sharma hasn't paid ₹2,400 for the Spiderman Cake delivered yesterday.",
    relatedEntityId: "order_06",
    actionLabel: "Send Reminder",
    actionHref: "/orders",
    isRead: false,
    isDismissed: false,
    createdAt: "2026-04-19T06:00:00Z",
  },
];

// ─── Customers ───────────────────────────

export const customers: Customer[] = [
  {
    id: "cust_01",
    name: "Riya S.",
    phone: "+91 99887 11223",
    address: "Anna Nagar, Chennai",
  },
  {
    id: "cust_02",
    name: "Amit M.",
    phone: "+91 99887 44556",
    address: "T. Nagar, Chennai",
  },
  {
    id: "cust_03",
    name: "Sonia P.",
    phone: "+91 99887 77889",
    address: "Adyar, Chennai",
  },
  {
    id: "cust_04",
    name: "Neha Sharma",
    phone: "+91 99887 22334",
    address: "Velachery, Chennai",
  },
  {
    id: "cust_05",
    name: "Kavitha R.",
    phone: "+91 99887 55667",
    address: "Mylapore, Chennai",
  },
];

// ─── Products ────────────────────────────

export const products: Product[] = [
  {
    id: "prod_01",
    name: "Chocolate Truffle Cake",
    recipeId: "rec_01",
    category: "CAKES",
    manufacturingCost: 850,
    sellingPrice: 2100,
    targetMargin: 0.4,
    isActive: true,
  },
  {
    id: "prod_02",
    name: "Red Velvet Cake",
    recipeId: "rec_02",
    category: "CAKES",
    manufacturingCost: 920,
    sellingPrice: 2800,
    targetMargin: 0.4,
    isActive: true,
  },
  {
    id: "prod_03",
    name: "Box of 6 Brownies",
    recipeId: "rec_03",
    category: "BROWNIES",
    manufacturingCost: 340,
    sellingPrice: 850,
    targetMargin: 0.4,
    isActive: true,
  },
  {
    id: "prod_04",
    name: "Vanilla Cupcakes (12 pcs)",
    recipeId: "rec_04",
    category: "CUPCAKES",
    manufacturingCost: 480,
    sellingPrice: 1200,
    targetMargin: 0.4,
    isActive: true,
  },
  {
    id: "prod_05",
    name: "Spiderman Cake",
    recipeId: "rec_05",
    category: "CAKES",
    manufacturingCost: 960,
    sellingPrice: 2400,
    targetMargin: 0.4,
    isActive: true,
  },
];

// ─── Orders ──────────────────────────────

export const orders: Order[] = [
  // New Intake
  {
    id: "order_01",
    orderNumber: "SK-20260420-001",
    customerId: "cust_01",
    customerName: "Riya S.",
    status: "NEW",
    dueDate: "2026-04-20T16:00:00Z",
    totalAmount: 2100,
    deliveryFee: 0,
    paymentStatus: "UNPAID",
    items: [
      {
        id: "oi_01",
        productId: "prod_01",
        productName: "1.5kg Chocolate Truffle",
        quantity: 1,
        unitPrice: 2100,
        lineTotal: 2100,
      },
    ],
    createdAt: "2026-04-19T10:00:00Z",
  },
  {
    id: "order_02",
    orderNumber: "SK-20260425-002",
    customerId: "cust_02",
    customerName: "Amit M.",
    status: "NEW",
    dueDate: "2026-04-25T10:00:00Z",
    totalAmount: 850,
    deliveryFee: 0,
    paymentStatus: "UNPAID",
    items: [
      {
        id: "oi_02",
        productId: "prod_03",
        productName: "Box of 6 Brownies",
        quantity: 1,
        unitPrice: 850,
        lineTotal: 850,
      },
    ],
    createdAt: "2026-04-19T11:00:00Z",
  },
  // In Production
  {
    id: "order_03",
    orderNumber: "SK-20260419-003",
    customerId: "cust_03",
    customerName: "Sonia P.",
    status: "IN_PRODUCTION",
    dueDate: "2026-04-19T18:00:00Z",
    totalAmount: 2800,
    deliveryFee: 0,
    paymentStatus: "UNPAID",
    items: [
      {
        id: "oi_03",
        productId: "prod_02",
        productName: "2kg Red Velvet",
        quantity: 1,
        unitPrice: 2800,
        lineTotal: 2800,
      },
    ],
    createdAt: "2026-04-17T09:00:00Z",
  },
  // Ready
  {
    id: "order_04",
    orderNumber: "SK-20260419-004",
    customerId: "cust_05",
    customerName: "Kavitha R.",
    status: "READY",
    dueDate: "2026-04-19T14:00:00Z",
    totalAmount: 1200,
    deliveryFee: 100,
    paymentStatus: "PAID",
    items: [
      {
        id: "oi_04",
        productId: "prod_04",
        productName: "Vanilla Cupcakes (12 pcs)",
        quantity: 1,
        unitPrice: 1200,
        lineTotal: 1200,
      },
    ],
    createdAt: "2026-04-16T15:00:00Z",
  },
  // Delivered
  {
    id: "order_05",
    orderNumber: "SK-20260418-005",
    customerId: "cust_01",
    customerName: "Riya S.",
    status: "DELIVERED",
    dueDate: "2026-04-18T17:00:00Z",
    totalAmount: 1700,
    deliveryFee: 0,
    paymentStatus: "PAID",
    items: [
      {
        id: "oi_05",
        productId: "prod_03",
        productName: "Box of 6 Brownies",
        quantity: 2,
        unitPrice: 850,
        lineTotal: 1700,
      },
    ],
    createdAt: "2026-04-15T12:00:00Z",
  },
  // Unpaid invoice (linked to alert_03)
  {
    id: "order_06",
    orderNumber: "SK-20260418-006",
    customerId: "cust_04",
    customerName: "Neha Sharma",
    status: "DELIVERED",
    dueDate: "2026-04-18T15:00:00Z",
    totalAmount: 2400,
    deliveryFee: 0,
    paymentStatus: "UNPAID",
    items: [
      {
        id: "oi_06",
        productId: "prod_05",
        productName: "Spiderman Cake",
        quantity: 1,
        unitPrice: 2400,
        lineTotal: 2400,
      },
    ],
    createdAt: "2026-04-14T10:00:00Z",
  },
];

// ─── Ingredients ─────────────────────────

export const ingredients: Ingredient[] = [
  {
    id: "ing_01",
    name: "All Purpose Flour (Maida)",
    category: "DRY_GOODS",
    currentStock: 5000,
    unit: "g",
    costPerUnit: 0.06,
    lowStockThreshold: 1000,
  },
  {
    id: "ing_02",
    name: "Amul Butter",
    category: "DAIRY_FATS",
    currentStock: 450,
    unit: "g",
    costPerUnit: 0.55,
    lowStockThreshold: 500,
  },
  {
    id: "ing_03",
    name: "Cocoa Powder",
    category: "CHOCOLATES",
    currentStock: 800,
    unit: "g",
    costPerUnit: 1.2,
    lowStockThreshold: 300,
  },
  {
    id: "ing_04",
    name: "Castor Sugar",
    category: "SUGARS",
    currentStock: 3000,
    unit: "g",
    costPerUnit: 0.08,
    lowStockThreshold: 500,
  },
  {
    id: "ing_05",
    name: "Eggs",
    category: "DAIRY_FATS",
    currentStock: 24,
    unit: "piece",
    costPerUnit: 8,
    lowStockThreshold: 6,
  },
  {
    id: "ing_06",
    name: "Cream Cheese",
    category: "DAIRY_FATS",
    currentStock: 400,
    unit: "g",
    costPerUnit: 1.6,
    lowStockThreshold: 200,
  },
  {
    id: "ing_07",
    name: "Vanilla Extract",
    category: "EXTRACTS_FLAVOURS",
    currentStock: 100,
    unit: "ml",
    costPerUnit: 4.5,
    lowStockThreshold: 30,
  },
  {
    id: "ing_08",
    name: "Red Food Colour",
    category: "EXTRACTS_FLAVOURS",
    currentStock: 50,
    unit: "ml",
    costPerUnit: 6.0,
    lowStockThreshold: 15,
  },
  {
    id: "ing_09",
    name: "Dark Chocolate",
    category: "CHOCOLATES",
    currentStock: 1200,
    unit: "g",
    costPerUnit: 1.8,
    lowStockThreshold: 500,
  },
  {
    id: "ing_10",
    name: "Baking Powder",
    category: "LEAVENERS_SPICES",
    currentStock: 200,
    unit: "g",
    costPerUnit: 0.8,
    lowStockThreshold: 50,
  },
];

// ─── Recipes ─────────────────────────────

export const recipes: Recipe[] = [
  {
    id: "rec_01",
    name: "Chocolate Truffle Cake",
    description: "Rich, fudgy chocolate cake with ganache frosting",
    baseYield: 1.5,
    baseYieldUnit: "kg",
    bakeTimeMinutes: 45,
    bakeTemp: 180,
    allergens: ["gluten", "dairy", "eggs"],
    status: "ACTIVE",
    totalCost: 850,
  },
  {
    id: "rec_02",
    name: "Red Velvet Cake",
    description: "Classic red velvet with cream cheese frosting",
    baseYield: 2,
    baseYieldUnit: "kg",
    bakeTimeMinutes: 40,
    bakeTemp: 175,
    allergens: ["gluten", "dairy", "eggs"],
    status: "ACTIVE",
    totalCost: 920,
  },
  {
    id: "rec_03",
    name: "Fudge Brownies",
    description: "Dense, chewy brownies with dark chocolate chunks",
    baseYield: 6,
    baseYieldUnit: "pieces",
    bakeTimeMinutes: 25,
    bakeTemp: 180,
    allergens: ["gluten", "dairy", "eggs"],
    status: "ACTIVE",
    totalCost: 340,
  },
  {
    id: "rec_04",
    name: "Vanilla Cupcakes",
    description: "Fluffy vanilla cupcakes with buttercream",
    baseYield: 12,
    baseYieldUnit: "pieces",
    bakeTimeMinutes: 20,
    bakeTemp: 170,
    allergens: ["gluten", "dairy", "eggs"],
    status: "ACTIVE",
    totalCost: 480,
  },
  {
    id: "rec_05",
    name: "Spiderman Theme Cake",
    description: "Vanilla sponge with fondant Spiderman decoration",
    baseYield: 2,
    baseYieldUnit: "kg",
    bakeTimeMinutes: 50,
    bakeTemp: 170,
    allergens: ["gluten", "dairy", "eggs"],
    status: "ACTIVE",
    totalCost: 960,
  },
];

// ─── Helper: filter orders by status ─────

export function getOrdersByStatus(status: OrderStatus): Order[] {
  return orders.filter((o) => o.status === status);
}

export function getActiveAlerts(): Alert[] {
  return alerts.filter((a) => !a.isDismissed);
}

export function getLowStockIngredients(): Ingredient[] {
  return ingredients.filter((i) => i.currentStock <= i.lowStockThreshold);
}
