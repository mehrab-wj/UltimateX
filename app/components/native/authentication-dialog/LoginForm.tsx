import { Input } from "~/components/ui/input";
import { useForm } from "react-hook-form";
import { useToast } from "~/hooks/use-toast";
import { Button } from "~/components/ui/button";

type LoginFormData = {
	email: string;
	password: string;
};

export default function LoginForm() {
	const { toast } = useToast();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>();

	const onSubmit = (data: LoginFormData) => {
		toast({
			title: "Login successful",
			description: "You are now logged in",
		});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="space-y-3">
				<Input
					{...register("email", { required: true })}
					type="email"
					placeholder="Email"
				/>
				<Input
					{...register("password", { required: true })}
					type="password"
					placeholder="Password"
				/>
			</div>

			<Button className="w-full mt-5" type="submit">
				Login
			</Button>
		</form>
	);
}