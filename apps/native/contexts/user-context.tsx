import { useUser as useClerkUser } from "@clerk/clerk-expo";
import type React from "react";
import { createContext, useContext, useMemo } from "react";

type User = {
	id: string;
	name: string | null;
	email: string | null;
	imageUrl: string | null;
};

type UserContextType = {
	/** The authenticated user, or null if not authenticated */
	user: User | null;
	/** Whether the user query is still loading */
	isLoading: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

/**
 * Access the current Clerk user.
 *
 * Use `!!user` for navigation guards instead of `isAuthenticated`.
 */
export function useUser() {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error("useUser must be used within UserProvider");
	}
	return context;
}

export function UserProvider({ children }: { children: React.ReactNode }) {
	const { user: clerkUser, isLoaded } = useClerkUser();

	const value = useMemo<UserContextType>(
		() => ({
			user: clerkUser
				? {
						id: clerkUser.id,
						name: clerkUser.fullName,
						email: clerkUser.primaryEmailAddress?.emailAddress ?? null,
						imageUrl: clerkUser.imageUrl,
					}
				: null,
			isLoading: !isLoaded,
		}),
		[clerkUser, isLoaded],
	);

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
