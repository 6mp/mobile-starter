import { useSignUp } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { Button, InputGroup, Spinner, TextField } from "heroui-native";
import { useState } from "react";
import { Alert, Text } from "react-native";

import FormHeader, { FormContainer } from "@/components/form";
import { Icon } from "@/components/icon";

export default function SignUpRoute() {
	const { signUp, setActive, isLoaded } = useSignUp();
	/* ---------------------------------- state --------------------------------- */
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [pendingVerification, setPendingVerification] = useState(false);
	const [code, setCode] = useState("");

	/* ------------------------------ handle signup ----------------------------- */
	const handleSignUp = async () => {
		if (!isLoaded) return;

		if (!name.trim()) {
			Alert.alert("Error", "Please enter your name");
			return;
		}
		if (!email.trim()) {
			Alert.alert("Error", "Please enter your email");
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
			const [firstName, ...rest] = name.trim().split(" ");
			const lastName = rest.join(" ") || undefined;

			const result = await signUp.create({
				emailAddress: email.trim(),
				password,
				firstName,
				lastName,
			});

			if (result.status === "complete" && setActive) {
				await setActive({ session: result.createdSessionId });
			} else {
				// Email verification required
				await signUp.prepareEmailAddressVerification({
					strategy: "email_code",
				});
				setPendingVerification(true);
			}
		} catch (err: any) {
			const message =
				err?.errors?.[0]?.longMessage ||
				err?.errors?.[0]?.message ||
				"Failed to sign up";
			Alert.alert("Error", message);
		} finally {
			setIsLoading(false);
		}
	};

	const handleVerify = async () => {
		if (!isLoaded || !signUp) return;

		setIsLoading(true);
		try {
			const result = await signUp.attemptEmailAddressVerification({
				code,
			});

			if (result.status === "complete" && setActive) {
				await setActive({ session: result.createdSessionId });
			}
		} catch (err: any) {
			const message =
				err?.errors?.[0]?.longMessage ||
				err?.errors?.[0]?.message ||
				"Invalid verification code";
			Alert.alert("Error", message);
		} finally {
			setIsLoading(false);
		}
	};

	/* ----------------------------- verification UI ---------------------------- */
	if (pendingVerification) {
		return (
			<FormContainer>
				<FormHeader
					title="Verify Email"
					description="Enter the verification code sent to your email"
				/>
				<TextField isRequired>
					<InputGroup>
						<InputGroup.Prefix isDecorative className="pl-4">
							<Icon name="mail-outline" size={20} className="text-muted" />
						</InputGroup.Prefix>
						<InputGroup.Input
							placeholder="Enter verification code"
							keyboardType="number-pad"
							value={code}
							onChangeText={setCode}
						/>
					</InputGroup>
				</TextField>
				<Button onPress={handleVerify} isDisabled={isLoading}>
					<Button.Label>
						{isLoading ? "Verifying..." : "Verify Email"}
					</Button.Label>
					{isLoading ? <Spinner size="sm" /> : null}
				</Button>
			</FormContainer>
		);
	}

	/* --------------------------------- return --------------------------------- */
	return (
		<FormContainer>
			<FormHeader
				title="Sign Up"
				description="Create your account to get started"
			/>
			{/* name */}
			<TextField isRequired>
				<InputGroup>
					<InputGroup.Prefix isDecorative className="pl-4">
						<Icon name="person-outline" size={20} className="text-muted" />
					</InputGroup.Prefix>
					<InputGroup.Input
						placeholder="Enter your full name"
						autoCapitalize="words"
						value={name}
						onChangeText={setName}
						textContentType="oneTimeCode"
					/>
				</InputGroup>
			</TextField>
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
						textContentType="oneTimeCode"
					/>
				</InputGroup>
			</TextField>
			{/* password */}
			<TextField isRequired>
				<InputGroup>
					<InputGroup.Prefix isDecorative className="pl-4">
						<Icon name="lock-closed-outline" size={20} className="text-muted" />
					</InputGroup.Prefix>
					<InputGroup.Input
						placeholder="Enter your password"
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
						placeholder="Confirm your password"
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
			<Button onPress={handleSignUp} isDisabled={isLoading}>
				<Button.Label>
					{isLoading ? "Creating Account..." : "Sign Up"}
				</Button.Label>
				{isLoading ? <Spinner size="sm" /> : null}
			</Button>
			<Text className="px-14 text-center text-muted text-sm">
				by continuing you agree to our{" "}
				<Link href="https://convex.dev" className="text-foreground underline">
					terms of service
				</Link>{" "}
				and{" "}
				<Link href="https://convex.dev" className="text-foreground underline">
					privacy policy
				</Link>
			</Text>
		</FormContainer>
	);
}
