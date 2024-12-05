import { Input } from "~/components/ui/input";
import { useForm } from "react-hook-form";
import { useToast } from "~/hooks/use-toast";
import { Button } from "~/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const registerSchema = z
	.object({
		name: z
			.string()
			.min(2, "Name must be at least 2 characters")
			.max(50, "Name must be less than 50 characters"),
		email: z.string().email("Invalid email address"),
		password: z
			.string()
			.min(8, "Password must be at least 8 characters")
			.regex(
				/[A-Z]/,
				"Password must contain at least one uppercase letter"
			)
			.regex(
				/[a-z]/,
				"Password must contain at least one lowercase letter"
			)
			.regex(/[0-9]/, "Password must contain at least one number"),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterForm({
	switchToLogin,
}: {
	switchToLogin: () => void;
}) {
	const { toast } = useToast();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	return (
		<form onSubmit={handleSubmit(switchToLogin)} className="space-y-5">
			<div className="space-y-4">
				<div className="space-y-2">
					<Input
						{...register("name")}
						type="text"
						placeholder="Full name"
						aria-invalid={!!errors.name}
					/>
					{errors.name && (
						<p className="text-sm text-red-500">
							{errors.name.message}
						</p>
					)}
				</div>

				<div className="space-y-2">
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
				</div>

				<div className="space-y-2">
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

				<div className="space-y-2">
					<Input
						{...register("confirmPassword")}
						type="password"
						placeholder="Confirm Password"
						aria-invalid={!!errors.confirmPassword}
					/>
					{errors.confirmPassword && (
						<p className="text-sm text-red-500">
							{errors.confirmPassword.message}
						</p>
					)}
				</div>
			</div>

			<Button className="w-full" type="submit" disabled={isSubmitting}>
				{isSubmitting ? <span className="loading !w-4" /> : "Register"}
			</Button>
		</form>
	);
}
