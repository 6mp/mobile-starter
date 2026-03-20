import { useClerk } from "@clerk/clerk-expo";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, Text } from "react-native";

import { Icon } from "@/components/icon";
import { ThemeToggle } from "@/components/theme-toggle";
import { useNavigationOptions } from "@/hooks/useNavigationOptions";
import { useRevenueCat } from "@/providers/RevenueCatProvider";

export default function SettingsLayout() {
	const { standard } = useNavigationOptions();

	return (
		<Stack screenOptions={standard}>
			<Stack.Screen
				name="index"
				options={{
					title: "Settings",
					headerLargeTitle: true,
					headerLeft: () => <ThemeToggle />,
					headerRight: () => <SignOutButton />,
				}}
			/>
			<Stack.Screen
				name="upgrade"
				options={{
					title: "Upgrade",
					presentation: "formSheet",
					sheetGrabberVisible: true,
					headerLeft: () => <CloseButton />,
				}}
			/>
		</Stack>
	);
}

const CloseButton = () => {
	const router = useRouter();

	return (
		<Pressable className="justify-center p-1" onPress={() => router.back()}>
			<Icon name="close" size={24} className="text-foreground" />
		</Pressable>
	);
};

const SignOutButton = () => {
	const [isSigningOut, setIsSigningOut] = useState(false);
	const { logOutUser } = useRevenueCat();
	const { signOut } = useClerk();

	const handleSignOut = async () => {
		setIsSigningOut(true);
		try {
			await logOutUser();
		} catch (error) {
			console.warn("[RevenueCat] Failed to log out before sign out:", error);
		}

		try {
			await signOut();
		} catch (err: any) {
			Alert.alert("Error", err?.message || "Failed to sign out");
		} finally {
			setIsSigningOut(false);
		}
	};

	return (
		<Pressable
			className="justify-center px-3 py-2"
			disabled={isSigningOut}
			onPress={() => {
				Alert.alert("Sign Out", "Are you sure you want to sign out?", [
					{ text: "Cancel", style: "cancel" },
					{ text: "Sign Out", onPress: handleSignOut },
				]);
			}}
		>
			<Text className="font-semibold text-foreground">Sign Out</Text>
		</Pressable>
	);
};
