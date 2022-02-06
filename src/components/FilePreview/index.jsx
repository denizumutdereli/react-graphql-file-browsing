import React from 'react'
import PropTypes from 'prop-types'
import { Context } from '../../state/context'
import { FilePreviewWrapper, Header, Details, Thumbnail } from './styles'
import convertFileSize from '../../utils/convertFileSize'
import Capitalize from '../../utils/capitalize'
import { CloseIcon } from '../../assets/Icon'

const FilePreview = ({ name, size, type }) => {
	const { dispatch } = React.useContext(Context)

	return (
		<FilePreviewWrapper>
			<Header>
				<span>{name}</span>
				<button
					onClick={() =>
						dispatch({ type: 'TOGGLE_PREVIEW', payload: false })
					}
				>
					<CloseIcon />
				</button>
			</Header>
			<Thumbnail>
				{type === 'file' ? (
					<span>File Preview</span>
				) : (
					<span>No preview</span>
				)}
			</Thumbnail>
			<Details>
				<div>
					<span>Type</span>
					<span>{Capitalize(type)}</span>
				</div>
				<div>
					<span>File size</span>
					<span>
						{type !== 'folder' &&
							size &&
							`${convertFileSize(size)}`}
					</span>
				</div>
			</Details>
		</FilePreviewWrapper>
	)
}

FilePreview.propTypes = {
	name: PropTypes.string,
	size: PropTypes.string,
	type: PropTypes.string,
}

export default FilePreview
