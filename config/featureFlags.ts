/**
 * Typed, hardcoded feature flags. No existing flag mechanism was found in
 * the project (see Batch 0 audit), so this introduces the pattern fresh —
 * kept intentionally simple (no remote config, no per-user overrides) so a
 * flag flip is a one-line change with no new dependency.
 *
 * Every flag defaults to `false`. Flipping one to `true` is the only
 * action required to turn a feature on; nothing else in this file needs
 * to change for that.
 */
export const FEATURE_FLAGS = {
  /**
   * Persistent XP awarded on mission completion (see
   * lib/firestore/gamification.ts and lib/learn/gamification/xpCalculator.ts).
   * Activated in Batch 3 alongside minimal, non-intrusive XP display in
   * AcademyGrid (total XP badge) and the result screens (+XP earned badge).
   */
  gamificationXp: true,
} as const;

export type FeatureFlagKey = keyof typeof FEATURE_FLAGS;

export function isFeatureEnabled(key: FeatureFlagKey): boolean {
  return FEATURE_FLAGS[key];
}
