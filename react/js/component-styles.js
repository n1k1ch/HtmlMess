var styles = {
	high: {
		height: '100%'
	},
	box: {
		display: 'flex',
		flexDirection: 'column',
		height: '100%'
		// flexWrap: 'wrap'
	},
	bodyBox: {
		display: 'flex',
		flexDirection: 'column',
		overflowY: 'auto',
		flexGrow: 1,
		position: 'relative'
	},
	row: {
		display: 'flex',
		flexDirection: 'row',
		background: '#efefef',
		// flexGrow: 1,
		// border: '2px solid #900',
		'@media (max-width: 480px)':{
			flexDirection: 'column',
			marginBottom: '2.0em'
		}
	},
	cell: {
		display: 'flex',
		alignItems: 'center',
		flexGrow: 0.5,
		flexShrink: 1,
		flexWrap: 'wrap',
		flexBasis: 30,
		margin: '0.1em 0.1em',
		padding: '0.1em 0.1em',
		// color: '#eee',
		// backgroundColor: '#333',
		// outline: '2px solid #090',
		cursor: 'pointer',
		fontSize: '1.0em',
		wordBreak: 'break-word',
		':hover': {
			color: '#090'
		},
		'@media (max-width: 480px)':{
			flexBasis: 'auto',
		}
	},
	cellHideNarrow: {
		'@media (min-width: 480px) and (max-width: 740px)' : {
			display: 'none'
		}
	},
	headRow: {
		borderBottom: '1px solid #333',
		'@media (max-width: 480px)' : {
			display: 'none'
		}
	},
	headCell: {
		borderRight: '1px solid #333'
	}
};