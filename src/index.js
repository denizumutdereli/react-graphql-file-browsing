import React from 'react'
import ReactDOM from 'react-dom'

// Apollo Client Imports
import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient } from 'apollo-client'
import {
	InMemoryCache,
	IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'
import { createUploadLink } from 'apollo-upload-client'
import App from './App'

const fragmentMatcher = new IntrospectionFragmentMatcher({
	introspectionQueryResultData: {
		__schema: {
			types: [],
		},
	},
})

const cache = new InMemoryCache({ fragmentMatcher })

const client = new ApolloClient({
	link: ApolloLink.from([
		onError(({ graphQLErrors, networkError }) => {
			if (graphQLErrors)
				graphQLErrors.map(({ message, locations, path }) =>
					console.log(
						`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
					)
				)
			if (networkError) console.log(`[Network error]: ${networkError}`)
		}),
		createUploadLink({
			uri: process.env.REACT_APP_GRAPHQL_URI,
		}),
	]),
	cache,
})

const Main = () => {
	return (
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	)
}

ReactDOM.render(<Main />, document.getElementById('root'))
