import {
	isRouteErrorResponse,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import stylesheet from "./app.css?url";

import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { AppSidebar } from "~/components/native/app-sidebar";

import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	concat,
	HttpLink,
	ApolloLink,
} from "@apollo/client/index";
import { Loading } from "./components/native/loading";
import { Toaster } from "./components/ui/toaster";
import { useUserStore } from "./storages/userStore";

const httpLink = new HttpLink({ uri: import.meta.env.VITE_API_URL });

const authMiddleware = new ApolloLink((operation, forward) => {
	// add the authorization to the headers
	operation.setContext(({ headers = {} }) => ({
		headers: {
			...headers,
			Authorization: localStorage.getItem("token")
				? `Bearer ${localStorage.getItem("token")}`
				: null,
		},
	}));

	return forward(operation);
});

const cache = new InMemoryCache({
	typePolicies: {
		Query: {
			fields: {
				posts: {
					keyArgs: [
						"spaceIds",
						"postTypeIds",
						"query",
						"filterBy",
						"orderByString",
					],
					merge(existing, incoming, { args }) {
						if (!existing) return incoming;
						if (!incoming) return existing;

						return {
							...incoming,
							nodes: [...existing.nodes, ...incoming.nodes],
							pageInfo: incoming.pageInfo,
						};
					},
				},
			},
		},
	},
});

const client = new ApolloClient({
	cache,
	link: concat(authMiddleware, httpLink),
});

export const links: Route.LinksFunction = () => [
	{ rel: "preconnect", href: "https://fonts.googleapis.com" },
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous",
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
	},
	{
		rel: "icon",
		href: "/ultimate-x-logo.png",
	},
	{ rel: "stylesheet", href: stylesheet },
];

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<Meta />
				<Links />
			</head>
			<body>
				{children}

				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	const { getToken } = useUserStore();
	const token = getToken(client);

	return (
		<ApolloProvider client={client}>
			{!token ? (
				<Loading />
			) : (
				<SidebarProvider className="">
					<AppSidebar />
					<main className="grow">
						<header className="w-full flex justify-between items-center">
							<SidebarTrigger className="lg:hidden w-[40px] h-[40px] ml-2 scale-150 mt-2" />
						</header>
						<Outlet />
						<Toaster />
					</main>
				</SidebarProvider>
			)}
		</ApolloProvider>
	);
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	let message = "Oops!";
	let details = "An unexpected error occurred.";
	let stack: string | undefined;

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "404" : "Error";
		details =
			error.status === 404
				? "The requested page could not be found."
				: error.statusText || details;
	} else if (import.meta.env.DEV && error && error instanceof Error) {
		details = error.message;
		stack = error.stack;
	}

	return (
		<main className="pt-16 p-4 container mx-auto">
			<h1>{message}</h1>
			<p>{details}</p>
			{stack && (
				<pre className="w-full p-4 overflow-x-auto">
					<code>{stack}</code>
				</pre>
			)}
		</main>
	);
}
