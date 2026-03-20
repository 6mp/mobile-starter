import "@/global.css";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import * as SecureStore from "expo-secure-store";
import { Slot } from "expo-router";
import { type HeroUINativeConfig, HeroUINativeProvider } from "heroui-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";

import { AppThemeProvider } from "@/contexts/app-theme-context";
import { UserProvider } from "@/contexts/user-context";
import { RevenueCatProvider } from "@/providers/RevenueCatProvider";
import SplashScreenProvider from "@/providers/SplashScreenProvider";

const convex = new ConvexReactClient(
	process.env.EXPO_PUBLIC_CONVEX_URL as string,
	{
		unsavedChangesWarning: false,
	},
);

const tokenCache = {
	async getToken(key: string) {
		try {
			return await SecureStore.getItemAsync(key);
		} catch {
			return null;
		}
	},
	async saveToken(key: string, value: string) {
		try {
			await SecureStore.setItemAsync(key, value);
		} catch {}
	},
	async clearToken(key: string) {
		try {
			await SecureStore.deleteItemAsync(key);
		} catch {}
	},
};

const config: HeroUINativeConfig = {
	devInfo: {
		// Disable styling principles information message
		stylingPrinciples: false,
	},
};

/* ------------------------------- root layout ------------------------------ */
export default function Layout() {
	return (
		<GestureHandlerRootView className="flex-1">
			<KeyboardProvider>
				<AppThemeProvider>
					<HeroUINativeProvider config={config}>
						<ClerkProvider
							publishableKey={
								process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string
							}
							tokenCache={tokenCache}
						>
							<ConvexProviderWithClerk client={convex} useAuth={useAuth}>
								<UserProvider>
									<RevenueCatProvider>
										<SplashScreenProvider>
											<Slot />
										</SplashScreenProvider>
									</RevenueCatProvider>
								</UserProvider>
							</ConvexProviderWithClerk>
						</ClerkProvider>
					</HeroUINativeProvider>
				</AppThemeProvider>
			</KeyboardProvider>
		</GestureHandlerRootView>
	);
}
