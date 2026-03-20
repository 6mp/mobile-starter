import { useSignIn } from "@clerk/clerk-expo";
import { Link, useLocalSearchParams } from "expo-router";
import { Button, InputGroup, Spinner, TextField } from "heroui-native";
import { useState } from "react";
import { Alert } from "react-native";
import FormHeader, { FormContainer } from "@/components/form";
import { Icon } from "@/components/icon";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function ResetPasswordRoute() {
	const { email } = useLocalSearchParams<{ email?: string }>();
	const { signIn, setActive, isLoaded } = useSignIn();
	const accentForeground = useThemeColor("accent-foreground");

	const [code, setCode] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleResetPassword = async () => {
		if (!isLoaded) return;

		if (!code) {
			Alert.alert("Error", "Please enter the reset code");
			return;
		}
		if (!password) {
			Alert.alert("Error", "Please enter your new password");
			return;
		}
		if (password !== confirmPassword) {
			Alert.alert("Error", "Passwords don't match");
			return;
		}
		if (password.length < 6) {
			Alert.alert("Error", "Password must be at least 6 characters");
			return;
		}

		setIsLoading(true);
		try {
			const result = await signIn.attemptFirstFactor({
				strategy: "reset_password_email_code",
				code,
				password,
			});

			if (result.status === "complete" && setActive) {
				await setActive({ session: result.createdSessionId });
				Alert.alert("Success", "Password reset successfully");
			}
		} catch (err: any) {
			const message =
				err?.errors?.[0]?.longMessage ||
				err?.errors?.[0]?.message ||
				"Failed to reset password";
			Alert.alert("Error", message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<FormContainer>
			<FormHeader
				title="Reset Password"
				description={`Enter the code sent to ${email || "your email"} and your new password`}
			/>
			{/* code */}
			<TextField isRequired>
				<InputGroup>
					<InputGroup.Prefix isDecorative className="pl-4">
						<Icon name="mail-outline" size={20} className="text-muted" />
					</InputGroup.Prefix>
					<InputGroup.Input
						placeholder="Enter reset code"
						keyboardType="number-pad"
						value={code}
						onChangeText={setCode}
					/>
				</InputGroup>
			</TextField>
			{/* new password */}
			<TextField isRequired>
				<InputGroup>
					<InputGroup.Prefix isDecorative className="pl-4">
						<Icon name="lock-closed-outline" size={20} className="text-muted" />
					</InputGroup.Prefix>
					<InputGroup.Input
						placeholder="Enter your new password"
						secureTextEntry
						value={password}
						onChangeText={setPassword}
					/>
					<InputGroup.Suffix isDecorative className="pr-4">
						<Icon name="eye-outline" size={20} className="text-muted" />
					</InputGroup.Suffix>
				</InputGroup>
			</TextField>
			{/* confirm password */}
			<TextField isRequired>
				<InputGroup>
					<InputGroup.Prefix isDecorative className="pl-4">
						<Icon name="lock-closed-outline" size={20} className="text-muted" />
					</InputGroup.Prefix>
					<InputGroup.Input
						placeholder="Confirm your new password"
						secureTextEntry
						value={confirmPassword}
						onChangeText={setConfirmPassword}
					/>
					<InputGroup.Suffix isDecorative className="pr-4">
						<Icon name="checkmark-outline" size={20} className="text-muted" />
					</InputGroup.Suffix>
				</InputGroup>
			</TextField>
			{/* submit */}
			<Button onPress={handleResetPassword} isDisabled={isLoading}>
				<Button.Label>
					{isLoading ? "Resetting..." : "Reset Password"}
				</Button.Label>
				{isLoading ? <Spinner size="sm" color={accentForeground} /> : null}
			</Button>
		</FormContainer>
	);
}
