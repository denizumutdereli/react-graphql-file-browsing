import React from 'react'
import Head from './Head'
import Body from './Body'
import { TableWrapper } from './styles'

const Table = ({ items }) => {

	return (
		<TableWrapper>
			<Head />
			<Body items={items} />
		</TableWrapper>
	)
}

export default Table