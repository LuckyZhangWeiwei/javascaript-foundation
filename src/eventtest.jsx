import React from "react"

class EventTest extends React.Component {
	componentDidMount() {
		document.addEventListener('click', () => {
			alert('document click');
		})
	}

	outClick(e) {
		console.log(e.currentTarget);
		alert('outClick');
	}

	onClick(e) {
		console.log(e.currentTarget);
		alert('onClick');
		e.stopPropagation();
	}
	render() {
		return <div onClick={this.outClick}>
			<button onClick={this.onClick}> 测试click事件 </button>
		</div>
	}
}

export default EventTest