import gql from 'graphql-tag'

const GET_FOLDER = gql`
query getFolderWithFiles($path: String!) {
		getFolderWithFiles(rootPath: $path, depth: 1000) {
		  name
		  type
		  size
		  path
		  children {
			name
			type
			size
			path
		  }
		}
	  }
`

export default GET_FOLDER
