console.log('Hie, me app2.js');

var IseSection = React.createClass({
	displayName: "IseSection",
	getInitialState: function(){
		return {data:[1]};
	},
	componentDidMount: function(){
		console.log('Component did mount');
	},
	render: function() {
		return React.createElement("div", null, this.state.data);
	}
});

//ReactDOM.render(React.createElement(IseSection, null), document.getElementById('container'));

var row = React.createClass({
	displayName: 'MyRow',
	getInitialState: function() {
		return {name: "", age: null};
	},
	render: function() {
		console.log("rendering row");
		
		return React.createElement("tr", /*{key:this.props.data.id}*/null, [
			// React.createElement('td', {key:"id"}, this.props.data.id),
			React.createElement('td', {key:"n"}, this.props.data.name),
			React.createElement('td', {key:"t"}, this.props.data.type),
			React.createElement('td', {key:"s"}, this.props.data.status),
			// React.createElement('td', {key:"owner"}, this.props.data.owner),
			React.createElement('td', {key:"d"}, moment.unix(this.props.data.distributed / 1000).format('YYYY-MM-DD')),
			React.createElement('td', {key:"updOn"}, moment.unix(this.props.data.lastUpdatedOn / 1000).format('YYYY-MM-DD')),
			// React.createElement('td', {key:"updBy"}, this.props.data.lastUpdatedBy)
		]);
	}
});

//ReactDOM.render(React.createElement(row, {data: {name: 'Valera', age: 26}}), document.getElementById('tbody'));

var MyTable = React.createClass({
	getInitialState: function(){
		return {elems:[]};
	},
	componentDidMount: function(){
		console.log('MyTable did mount');
		var loadedData = [];
		loadedData.push({name: 'Valera', age: 26});
		loadedData.push({name: 'Polina', age: 22});
		this.setState({elems: loadedData});

		var that = this;

		$.ajax({
			url: 'http://localhost:8080/campaign-manager-web/api/campaign/list',
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
	displayName: 'MyTable',
	render: function(){
		console.log('rendering MyTable');
		console.log(this.state);

		var headerTitles = ["Name", "Type", "Status", "Distributed", "Updated On"];

		var headers = headerTitles.map(function(el){
			return React.createElement('th', {key: 'th' + el}, el);
		});

		var rows = this.state.elems.map(function(elem){
			return React.createElement(row, {data: elem, key: elem.name});
		});

		var i = 0;

		return React.createElement('table', null, [
			React.createElement('thead', {key:'thead'},
				React.createElement('tr', null, headers)
				),
			React.createElement('tbody', {key:'tbody'}, rows)
			]
			);
	}
});

//ReactDOM.render(React.createElement(MyTable, null), document.getElementById('container'));