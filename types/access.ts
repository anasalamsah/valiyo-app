import type { Timestamp } from "firebase/firestore";

/** Product identifiers used across access, orders, and progress records. */
export type ProductId = "learn" | "discovery";

export const PRODUCT_IDS: ProductId[] = ["learn", "discovery"];

/**
 * Mirrors a document in the `user_access` collection, keyed by uid.
 * This app only ever reads it — it's written by the billing layer
 * (e.g. a Lynk.id webhook running with the Admin SDK) once an order for
 * a product is confirmed.
 */
export type UserAccess = {
  uid: string;
  products: ProductId[];
  updatedAt: Timestamp | null;
};
