import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogTrigger,
} from "~/components/ui/dialog";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegistermForm";

export default function AuthenticationDialog() {
	const [tab, setTab] = useState<"login" | "register">("login");
	return (
		<Dialog>
			<DialogTrigger className="mt-5 border border-gray-200 p-2 rounded-xl relative overflow-hidden">
				Login
			</DialogTrigger>
			<DialogContent className="pt-12">
				{tab === "login" ? <LoginForm /> : <RegisterForm />}
				<Button
					variant="ghost"
					className="text-sm"
					onClick={() =>
						setTab(tab === "login" ? "register" : "login")
					}
				>
					{tab === "login"
						? "Don't have an account? Register"
						: "Already have an account? Login"}
				</Button>
			</DialogContent>
		</Dialog>
	);
}