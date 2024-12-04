import { Input } from "~/components/ui/input";
import { useForm } from "react-hook-form";
import { useToast } from "~/hooks/use-toast";
import { Button } from "~/components/ui/button";

type RegisterFormData = {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
};

export default function RegisterForm() {
	const { toast } = useToast();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterFormData>();

	const onSubmit = (data: RegisterFormData) => {
		if (data.password !== data.confirmPassword) {
			toast({
				title: "Passwords do not match",
				description: "Please try again",
				variant: "destructive",
			});
			return;
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="space-y-3">
				<div>
					<Input
						{...register("name", { required: true })}
						type="text"
						placeholder="Full name"
					/>
					{errors.name && (
						<span className="text-xs text-red-600">
							This field is required
						</span>
					)}
				</div>

				<div>
					<Input
						{...register("email", { required: true })}
						type="email"
						placeholder="Email"
					/>
					{errors.email && (
						<span className="text-xs text-red-600">
							This field is required
						</span>
					)}
				</div>

				<div>
					<Input
						{...register("password", { required: true })}
						type="password"
						placeholder="Password"
					/>
					{errors.password && (
						<span className="text-xs text-red-600">
							This field is required
						</span>
					)}
				</div>

				<div>
					<Input
						{...register("confirmPassword", { required: true })}
						type="password"
						placeholder="Confirm Password"
					/>
					{errors.confirmPassword && (
						<span className="text-xs text-red-600">
							This field is required
						</span>
					)}
				</div>
			</div>

			<Button className="w-full mt-5" type="submit">
				Register
			</Button>
		</form>
	);
}
