import {
	ApolloClient,
	InMemoryCache,
	concat,
	HttpLink,
	ApolloLink,
} from "@apollo/client/index";

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

export const client = new ApolloClient({
	cache,
	link: concat(authMiddleware, httpLink),
});