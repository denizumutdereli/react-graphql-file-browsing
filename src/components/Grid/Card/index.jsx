import React from 'react'
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu'
import PropTypes from 'prop-types'
import { Context } from '../../../state/context'
import useClick from '../../../utils/useClick'
import { FolderCloseIcon, FileText } from '../../../assets/Icon'
import { CardWrapper, Thumb } from './styles'
import { v4 as uuidv4 } from 'uuid';

const Card = ({ item }) => {
	const { dispatch } = React.useContext(Context)
	const [callSingleClick, callDoubleClick] = useClick()

	const openFolder = () =>
		dispatch({
			type: 'SET_CURRENT_FOLDER',
			payload: item.path.replace(process.env.REACT_APP_ROOT_FOLDER, ''),
		})

	const singleClick = () => {
		dispatch({
			type: 'SET_PREVIEW_DATA',
			payload: {
				name: item.name,
				type: item.type,
				size: item.size,
			},
		})
		dispatch({ type: 'TOGGLE_PREVIEW', payload: true })
	}
	const doubleClick = () =>
		item.type === 'file' ? singleClick() : openFolder()

	const generateId = `table__row__menu${uuidv4()}`
	const CardMenu = () => (
		<ContextMenu id={generateId}>
			{item.type === 'file' ? (
				<MenuItem onClick={() => singleClick()}>Preview File</MenuItem>
			) : (
				<MenuItem onClick={() => openFolder()}>Open Folder</MenuItem>
			)}
		</ContextMenu>
	)

	return (
		<React.Fragment>
			<ContextMenuTrigger id={generateId}>
				<CardWrapper
					onClick={() => callSingleClick(singleClick)}
					onDoubleClick={() => callDoubleClick(doubleClick)}
					title={item.name}
				>
					<Thumb>
						{item.type === 'folder' ? (
							<FolderCloseIcon />
						) : (
							<FileText size={35} color="#6A91EE" />
						)}
					</Thumb>
					<span>
						{item.name.length > 12
							? item.name.slice(0, 12) + '...'
							: item.name}
					</span>
				</CardWrapper>
			</ContextMenuTrigger>
			<CardMenu />
		</React.Fragment>
	)
}

Card.propTypes = {
	name: PropTypes.string,
	path: PropTypes.string,
	type: PropTypes.string,
}

export default Card
