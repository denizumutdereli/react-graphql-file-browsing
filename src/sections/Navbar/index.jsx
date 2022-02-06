import React from 'react'
import { Context } from '../../state/context'
import { NavbarWrapper, Breadcrumbs, Search, SwitchView } from './styles'
import { HomeIcon, ChevronRightIcon, ListIcon, GridIcon } from '../../assets/Icon'

const Navbar = () => {
	const { state, dispatch } = React.useContext(Context)
	const [search, setSearch] = React.useState('')
	const [route, setRoute] = React.useState('')
	React.useEffect(() => {
		if (state.currentFolder) {
			setRoute(state.currentFolder)
		}
	}, [state.currentFolder])

	const goToFolder = async index => {
		const path = await route.split('/')
		const fullPath = await path.slice(0, index + 1).join('/')
		dispatch({
			type: 'SET_CURRENT_FOLDER',
			payload: fullPath,
		})
	}

	const searchFolder = e => {
		setSearch(e.target.value)
		dispatch({
			type: 'SET_SEARCH_TEXT',
			payload: e.target.value.toLowerCase(),
		})
	}

	return (
		<NavbarWrapper isSidebarVisible={state.isSidebarVisible}>
			<Breadcrumbs>
				{route
					.split('/')
					.slice(1)
					.map((breadcrumb, index) => (
						<React.Fragment key={index}>
							<li onClick={() => goToFolder(index)}>
								{index === 0 ? <HomeIcon color="#144767" />: breadcrumb}
							</li>
							{index ===
							route.split('/').slice(1).length - 1 ? null : (
								<span>
									<ChevronRightIcon color="#144767" />
								</span>
							)}
						</React.Fragment>
					))}
			</Breadcrumbs>
			<Search>
				<input
					type="text"
					placeholder="Search..."
					value={search}
					onChange={e => searchFolder(e)}
				/>
			</Search>
			<SwitchView>
				<button
					onClick={() =>
						dispatch({ type: 'TOGGLE_VIEW', payload: 'list' }) ||
						dispatch({ type: 'TOGGLE_PREVIEW', payload: false })
					}
				>
					<ListIcon />
				</button>
				<button
					onClick={() =>
						dispatch({ type: 'TOGGLE_VIEW', payload: 'grid' }) ||
						dispatch({ type: 'TOGGLE_PREVIEW', payload: false })
					}
				>
					<GridIcon />
				</button>
			</SwitchView>
		</NavbarWrapper>
	)
}

export default Navbar
