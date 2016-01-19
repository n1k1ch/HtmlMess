var actionsCell = Radium(
	React.createClass({
		displayName: 'ActionsCell',
		render: function(){
			var cells = [];

			for(var i = 0; i < this.props.actions.length; i++) {
				var iconClazz = iconClasses[this.props.actions[i]];
				cells.push(React.createElement('i', {key: _.uniqueId(), className: iconClazz}, null));
			}

			return React.createElement('div', {style: styles.cell}, cells);
		}
	})
);