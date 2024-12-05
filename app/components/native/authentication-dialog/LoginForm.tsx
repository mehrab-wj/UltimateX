import { Input } from "~/components/ui/input";
import { useForm } from "react-hook-form";
import { useToast } from "~/hooks/use-toast";
import { Button } from "~/components/ui/button";
import { LOGIN_NETWORK_MUTATION } from "~/api/queries/mutations/loginNetwork";
import { useMutation } from "@apollo/client/index";
import { useUserStore } from "~/storages/userStore";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Define validation schema
const loginSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm({
	showDefaultCredentials,
}: {
	showDefaultCredentials: boolean;
}) {
	const { toast } = useToast();
	const { setToken, setUser } = useUserStore();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
	});

	useEffect(() => {
		if (showDefaultCredentials) {
			setValue("email", "mehrab@forgelink.co");
			setValue("password", "UltimateX2024");
		}
	}, [showDefaultCredentials, setValue]);

	const [loginUser, { loading }] = useMutation(LOGIN_NETWORK_MUTATION, {
		onError: (error) => {
			toast({
				title: "Login failed",
				description: error.message,
				variant: "destructive",
			});
		},
		onCompleted: (data) => {
			setToken(data.loginNetwork.accessToken);
			setUser(data.loginNetwork.member);
			toast({
				title: "Login successful",
				description: "You are now logged in",
			});
			reset(); // Clear form after successful login
		},
	});

	const onSubmit = async (formData: LoginFormData) => {
		await loginUser({
			variables: {
				usernameOrEmail: formData.email,
				password: formData.password,
			},
		});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
			<div className="space-y-3">
				<Input
					{...register("email")}
					type="email"
					placeholder="Email"
					aria-invalid={!!errors.email}
				/>
				{errors.email && (
					<p className="text-sm text-red-500">
						{errors.email.message}
					</p>
				)}

				<Input
					{...register("password")}
					type="password"
					placeholder="Password"
					aria-invalid={!!errors.password}
				/>
				{errors.password && (
					<p className="text-sm text-red-500">
						{errors.password.message}
					</p>
				)}
			</div>

			<Button className="w-full" type="submit" disabled={loading}>
				{loading ? <span className="loading !w-4" /> : "Login"}
			</Button>
		</form>
	);
}
