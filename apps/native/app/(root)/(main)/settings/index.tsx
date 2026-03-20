import { useClerk } from "@clerk/clerk-expo";
import { Button, Card } from "heroui-native";
import { useState } from "react";
import { Alert, ScrollView } from "react-native";
import { SubscriptionStatusCard } from "@/components/subscription-status-card";
import { useUser } from "@/contexts/user-context";
import { useRevenueCat } from "@/providers/RevenueCatProvider";

export default function SettingsRoute() {
	const { user } = useUser();
	const { logOutUser } = useRevenueCat();
	const { user: clerkUser } = useClerk();

	const [isDeletingUser, setIsDeletingUser] = useState(false);

	if (!user) return null;

	const handleDeleteUser = async () => {
		setIsDeletingUser(true);
		try {
			await logOutUser();
		} catch (error) {
			console.warn("[RevenueCat] Failed to log out before delete:", error);
		}

		try {
			await clerkUser?.delete();
		} catch (err: any) {
			Alert.alert("Error", err?.message || "Failed to delete user");
		} finally {
			setIsDeletingUser(false);
		}
	};

	return (
		<ScrollView
			contentInsetAdjustmentBehavior="always"
			contentContainerClassName="flex-grow px-4 py-2 gap-4"
		>
			{/* User Info */}
			<Card variant="secondary">
				<Card.Body>
					<Card.Title>{user.name}</Card.Title>
					<Card.Description>{user.email}</Card.Description>
				</Card.Body>
			</Card>

			{/* Subscription Status - Real-time updates from Convex! */}
			<SubscriptionStatusCard />

			{/* Delete User */}
			<Button
				size="sm"
				variant="secondary"
				className="self-center"
				isDisabled={isDeletingUser}
				onPress={() => {
					Alert.alert(
						"Delete User",
						"Are you sure you want to delete your account?",
						[
							{ text: "Cancel", style: "cancel" },
							{
								text: "Delete",
								onPress: handleDeleteUser,
								style: "destructive",
							},
						],
					);
				}}
			>
				<Button.Label>
					{isDeletingUser ? "Deleting" : "Delete User"}
				</Button.Label>
			</Button>
		</ScrollView>
	);
}
