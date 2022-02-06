import React from 'react'
import PropTypes from 'prop-types'
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu'
import { Context } from '../../../state/context'
import { Row, RowCell } from './styles'
import convertFileSize from '../../../utils/convertFileSize'
import useClick from '../../../utils/useClick'
import Capitalize from '../../../utils/capitalize'
import { InfoIcon } from '../../../assets/Icon'
import { v4 as uuidv4 } from 'uuid';

const TableRow = ({ name, type, size, path, createdAt }) => {
	
	const { dispatch } = React.useContext(Context)

	const [callSingleClick, callDoubleClick] = useClick()

	const openFolder = () =>
		dispatch({
			type: 'SET_CURRENT_FOLDER',
			payload: path.replace(process.env.REACT_APP_ROOT_FOLDER, ''),
		})

	const showPreview = () => {
		dispatch({
			type: 'SET_PREVIEW_DATA',
			payload: {
				name,
				type,
				size,
			},
		})
		dispatch({ type: 'TOGGLE_PREVIEW', payload: true })
	}

	const doubleClick = () => (type === 'file' ? showPreview() : openFolder())

	const generateId = `table__row__menu${uuidv4()}`

	return (
		<React.Fragment>
			<ContextMenuTrigger id={generateId}>
				<Row>
					<RowCell
						onClick={() => callSingleClick(showPreview)}
						onDoubleClick={() => callDoubleClick(doubleClick)}
						title={name}
					>
						{name.length > 20 ? name.slice(0, 20) + '...' : name}
					</RowCell>
					<RowCell>
						{new Intl.DateTimeFormat('en-US', {
							year: 'numeric',
							month: 'short',
							day: 'numeric',
							hour: 'numeric',
							minute: 'numeric',
						}).format(createdAt)}
					</RowCell>
					<RowCell>{Capitalize(type)}</RowCell>
					<RowCell>
						{type !== 'folder' &&
							size &&
							`${convertFileSize(size)}`}
					</RowCell>
					<RowCell withOptions className="item__options">
						<button onClick={() => showPreview()}>
							<InfoIcon color="#fff" />
						</button>
					</RowCell>
				</Row>
			</ContextMenuTrigger>
			<ContextMenu id={generateId}>
				{type === 'file' ? (
					<MenuItem onClick={() => showPreview()}>
						Preview File
					</MenuItem>
				) : (
					<MenuItem onClick={() => openFolder()}>
						Open Folder
					</MenuItem>
				)}
			</ContextMenu>
		</React.Fragment>
	)
}

TableRow.propTypes = {
	name: PropTypes.string,
	size: PropTypes.string,
	type: PropTypes.string,
	path: PropTypes.string,
}

export default TableRow
