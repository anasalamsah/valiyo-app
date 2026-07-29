import type { Timestamp } from "firebase/firestore";
import type { ProductId } from "./access";

export type OrderStatus = "pending" | "paid" | "failed" | "refunded";

/**
 * Mirrors a document in the `orders` collection. Designed to match what a
 * future Lynk.id webhook would write: a webhook handler (Admin SDK, server
 * only) creates/updates the order here and then upserts `user_access/{uid}`
 * once `status` becomes "paid". This app only reads orders.
 */
export type Order = {
  id: string;
  uid: string;
  productId: ProductId;
  status: OrderStatus;
  amount: number;
  currency: string;
  provider: "lynkid" | "manual";
  providerRef: string | null;
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
};
