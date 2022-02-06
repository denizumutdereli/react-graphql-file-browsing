import gql from 'graphql-tag'

/* default tree permissions */

const GET_NESTED_FOLDERS = gql`
	query {
		getNestedFolders(rootPath: "./", depth: 1000) { 
			name
			path
			type
			children {
				name
				path
				type
				children {
					name
					path
					type
					children {
						name
						path
						type
						children {
							name
							path
							type
							children {
								name
								path
								type
								children {
									name
									path
									type
									children {
										name
										path
										type
										children {
											name
											path
											type
											children {
												name
												path
												type
												children {
													name
													path
													type
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
`

export default GET_NESTED_FOLDERS
