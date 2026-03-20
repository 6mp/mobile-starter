import { useOAuth } from "@clerk/clerk-expo";
import { useState } from "react";

export const useGoogleAuth = () => {
	const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
	const [isLoading, setIsLoading] = useState(false);

	const signIn = async () => {
		setIsLoading(true);
		try {
			const { createdSessionId, setActive } = await startOAuthFlow();

			if (createdSessionId && setActive) {
				await setActive({ session: createdSessionId });
			}
		} catch (error) {
			console.error("Google sign in error:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return {
		signIn,
		isLoading,
	};
};
