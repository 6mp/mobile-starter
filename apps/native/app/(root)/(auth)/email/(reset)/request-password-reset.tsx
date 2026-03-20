import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Button, InputGroup, Spinner, TextField } from "heroui-native";
import { useState } from "react";
import { Alert } from "react-native";
import FormHeader, { FormContainer } from "@/components/form";
import { Icon } from "@/components/icon";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function RequestPasswordResetRoute() {
	const router = useRouter();
	const accentForeground = useThemeColor("accent-foreground");
	const { signIn, isLoaded } = useSignIn();
	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleRequestReset = async () => {
		if (!isLoaded) return;

		if (!email.trim()) {
			Alert.alert("Error", "Please enter your email");
			return;
		}

		setIsLoading(true);
		try {
			await signIn.create({
				strategy: "reset_password_email_code",
				identifier: email.trim(),
			});

			Alert.alert("Success", "Reset code sent to your email");
			router.push({
				pathname: "/(root)/(auth)/email/(reset)/reset-password",
				params: { email: email.trim() },
			});
		} catch (err: any) {
			const message =
				err?.errors?.[0]?.longMessage ||
				err?.errors?.[0]?.message ||
				"Failed to send reset code";
			Alert.alert("Error", message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<FormContainer>
			<FormHeader
				title="Reset Password"
				description="Enter your email to receive a password reset code"
			/>
			{/* email */}
			<TextField isRequired>
				<InputGroup>
					<InputGroup.Prefix isDecorative className="pl-4">
						<Icon name="mail-outline" size={20} className="text-muted" />
					</InputGroup.Prefix>
					<InputGroup.Input
						placeholder="Enter your email"
						keyboardType="email-address"
						autoCapitalize="none"
						value={email}
						onChangeText={setEmail}
					/>
				</InputGroup>
			</TextField>
			{/* submit */}
			<Button onPress={handleRequestReset} isDisabled={isLoading}>
				<Button.Label>
					{isLoading ? "Sending..." : "Send Reset Code"}
				</Button.Label>
				{isLoading ? <Spinner size="sm" color={accentForeground} /> : null}
			</Button>
		</FormContainer>
	);
}
