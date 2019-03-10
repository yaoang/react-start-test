import React, { Component } from 'react';

class ColumnSelector extends Component {
	constructor(props){
		super(props)

		this.state = {
			maxSize: 500,
		}
	}

	handleToggleColumn = column => {
		if (this.props.selectedColumns.indexOf(column) == -1) {
			this.props.addColumn(column)
		} else {
			this.props.removeColumn(column)
		}
	}

	handleChangeMaxSize = (evt)=>{
		const newSize = evt.target.value
		this.setState({
			maxSize: newSize,
		})
	}

	handleSearch = ()=>{
		let {maxSize} = this.state
		maxSize = maxSize < 100 ? 100 : (maxSize > 5000? 5000 : maxSize)
		this.setState({
			maxSize,
		})
		const {getAllDatas} = this.props
		getAllDatas(maxSize)
	}

	render() {
		const {maxSize} = this.state
		return (
			<div className="ColumnSelector">
				<h2>Conditions Selector</h2>
				<div className='selectors'>
					<div className='Selector'>Columns: </div>
					{this.props.allColumns.map(column => (
						<div className="Selector" key={column}>
							<label>
								<input type="checkbox"
									onChange={() => this.handleToggleColumn(column)}
									checked={this.props.selectedColumns.indexOf(column) != -1} />{column}
							</label>
						</div>
					))}
				</div>
				<div className='selectors'>
					<div className='Selector'>Max Rows:</div>
					<div className='Selector'>
						<input 
							min={100}
							max={5000}
							type='number' 
							value={maxSize} 
							onBlur={this.handleSearch}
							onChange={this.handleChangeMaxSize} />
					</div>
					<div className='Selector'>
					(100 - 5000)
					</div>
				</div>
			</div>
		);
	}
}

export default ColumnSelector;