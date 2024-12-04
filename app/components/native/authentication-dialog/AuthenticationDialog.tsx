import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogTrigger,
	DialogTitle,
} from "~/components/ui/dialog";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegistermForm";

export default function AuthenticationDialog() {
	const [tab, setTab] = useState<"login" | "register" | "forcedLogin">(
		"login"
	);
	return (
		<Dialog>
			<DialogTrigger className="mt-5 border border-gray-200 p-2 rounded-xl relative overflow-hidden">
				Login / Register
			</DialogTrigger>
			<DialogContent className="">
				<DialogTitle>
					{tab === "login" ? "Login" : "Register"}
				</DialogTitle>

				{tab === "register" ? (
					<RegisterForm switchToLogin={() => setTab("forcedLogin")} />
				) : (
					<>
						{tab === "forcedLogin" && (
							<div className="space-y-1">
								<p>
									Registration is closed at the moment. In the
									meantime, you can login using the test
									account.
								</p>
							</div>
						)}
						<LoginForm
							showDefaultCredentials={tab === "forcedLogin"}
						/>
					</>
				)}

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
