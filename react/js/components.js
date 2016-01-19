//require component-styles.js
//require column-descriptions.js
//require components/cell-actions.js

var cell = Radium(
	React.createClass({
		displayName: 'Cell',
		render: function(){
			var stylesToAppend = [styles.cell];
			if(this.props.addStyle != null) {
				stylesToAppend.push(this.props.addStyle);
			}

			return React.createElement('div', {style:stylesToAppend}, this.props.value);
		}
	})
);

var row = Radium(
	React.createClass({
		displayName: 'row',
		render: function(){
			if(this.props.cells !== undefined) {
				var cells = [];

				for(var i = 0; i < columnDescriptions.length; i++) {
					for(var prop in this.props.cells) {
						if(prop === columnDescriptions[i].name) {
							cells.push(React.createElement(cell, {key: _.uniqueId(),
								value: cellTextByType(columnDescriptions[i].type, this.props.cells[prop]),
								addStyle: cellAddStyle(columnDescriptions[i])
							}));
						}
					}
				}

				cells.push(React.createElement(actionsCell, {key: _.uniqueId(), actions: ['details', 'delete']}));

				return React.createElement('div', {style: styles.row}, cells);
			} else {
				return React.createElement('div', {style: styles.row}, 'loading');
			}
		}
	})
);

var headCell = Radium(
	React.createClass({
		displayName: 'HeadCell',
		render: function(){
		var stylesToAppend = [styles.cell, styles.headCell];
			if(this.props.addStyle != null) {
				stylesToAppend.push(this.props.addStyle);
			}

			return React.createElement('div', {style: stylesToAppend}, columnDescriptions[this.props.headKey].title);
		}
	})
);

var headRow = Radium(
	React.createClass({
		displayName: 'HeadRow',
		render: function(){
			var cells = [];

			for(var key in columnDescriptions) {
				cells.push(React.createElement(headCell, {key: _.uniqueId(), headKey: key, addStyle:cellAddStyle(columnDescriptions[key])}));
			}

			cells.push(React.createElement('div', {key: _.uniqueId(), style: [styles.cell, styles.headCell]}, 'Actions'));

			return React.createElement('div', {style: [styles.row, styles.headRow]}, cells);
		}
	})
);

var bodyBox = Radium(
	React.createClass({
		displayName: 'BodyBox',
		componentDidMount: function(){
			Ps.initialize(document.getElementsByClassName('bodyBox')[0]);
		},
		render: function() {
			var rows = [];

			if(this.props.elems.campaigns) {
				rows.push(this.props.elems.campaigns.map(function(el){
					return React.createElement(row, {key: _.uniqueId(), cells: el})
				}));
			}

			return React.createElement('div', {style: [styles.box, styles.bodyBox], className: classNames('bodyBox')}, rows);
		}
	})
);

var box = Radium(
	React.createClass({
		displayName: 'CellBox',
		getInitialState: function() {
			return {elems: {}};
		},
		componentDidMount: function() {
			var that = this;

			$.ajax({
				// url: 'http://localhost:8080/campaign-manager-web/api/campaign/list',
				url: 'http://localhost:8080/campaign-manager-web/api/campaign/listDetails',
				type: 'GET'
			})
			.done(function(data) {
				console.log("success");
				console.log(data);
				that.setState({elems: data});
			})
			.fail(function() {
				console.log("error");
			})
			.always(function() {
				console.log("complete");
			});
		},
		render: function() {
			var children = [];
			children.push(React.createElement(headRow, {key: _.uniqueId()}));
			children.push(React.createElement(bodyBox, {key: _.uniqueId(), elems: this.state.elems}));

			return React.createElement(Radium.StyleRoot, {style: styles.high}, 
				React.createElement('div', {style:[styles.box, styles.high]}, children)
			);
		}
	})
);