//require styles
function cellTextByType(type, value) {
	if(type === 'Date') {
		// return moment.unix(value / 1000).format('YYYY-MM-DD');
		return moment(value).format('YYYY-MM-DD');
	} else {
		return value;
	}
}

function cellAddStyle(key) {
	var toRet = [];
	if(key) {
		if(key.hideIfNarrow === true) {
			toRet.push(styles.cellHideNarrow);
		}

		if(key.grow) {
			toRet.push({flexGrow: key.grow});
		}
	}

	return toRet;
}