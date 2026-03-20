import type { QueryCtx, MutationCtx } from "./_generated/server";
import { query } from "./_generated/server";

/**
 * Get the authenticated user from Clerk JWT via Convex auth.
 * Returns a user-like object or null if not authenticated.
 */
export async function getAuthUser(ctx: QueryCtx | MutationCtx) {
	const identity = await ctx.auth.getUserIdentity();
	if (!identity) return null;

	return {
		_id: identity.subject,
		name: identity.name ?? null,
		email: identity.email ?? null,
		imageUrl: identity.pictureUrl ?? null,
	};
}

/**
 * Get the authenticated user or throw if not authenticated.
 */
export async function requireAuth(ctx: QueryCtx | MutationCtx) {
	const user = await getAuthUser(ctx);
	if (!user) {
		throw new Error("Authentication required");
	}
	return user;
}

/**
 * Query to get the current user from the client.
 * With Clerk, user info comes from the JWT — no database lookup needed.
 */
export const getCurrentUser = query({
	args: {},
	handler: async (ctx) => {
		return await getAuthUser(ctx);
	},
});
