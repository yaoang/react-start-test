import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {filter, startsWith, isNull, isEmpty} from 'lodash'

class DataTable extends Component {
  static propTypes = {
    data: PropTypes.array,
    selectedColumns: PropTypes.array,
    searchingValues: PropTypes.object,
    getAllDatas: PropTypes.func,
  }

  constructor(props){
    super(props)
    this.state = {
      datas: props.data,
      startIndex: 0,
      currentDatas: [],
      filterDatas: [],
      total: props.data.length,
      searchingValues: props.searchingValues,
      currentPageIndex: 1,
      pageSize: this.pageSize,
    }
  }
  pageSize = 10

  componentDidMount(){
    this.props.getAllDatas(500)
  }

  static getDerivedStateFromProps(props, state) {
    // datas changed, start from first page
    if (props.data.length != state.datas.length) {
      const { data } = props
      const { pageSize } = state
      const datas = []
      for (let index = 0; index < pageSize; index++) {
        if ( index >= data.length) {
          // console.log(index, data.length)
          break
        }
        datas.push(data[index])
      }
      return {
        startIndex: pageSize,
        filterDatas: data,
        currentDatas: datas,
        currentPageIndex: 1,

        datas: props.data,
      }
    }

    return null
  }

  generalPrePage = () => {
    const {startIndex, filterDatas, currentPageIndex} = this.state
    if(currentPageIndex <= 1) {
      return
    }
    const currentDatas = []
    for (let index = startIndex-1; index >= startIndex - this.pageSize; index--) {
      currentDatas.push(filterDatas[index])
      if(index >= filterDatas.length) {
        break
      }
    }

    this.setState({
      currentPageIndex: currentPageIndex-1,
      startIndex: startIndex - 10,
      currentDatas,
    })
  }

  generalNextPage = ()=>{
    const {startIndex, filterDatas, currentPageIndex} = this.state
    if(startIndex  + this.pageSize > filterDatas.length) {
      return
    }
    const currentDatas = []
    for (let index = startIndex; index < startIndex + this.pageSize; index++) {
      currentDatas.push(filterDatas[index])
      if(index >= filterDatas.length) {
        break
      }
    }

    this.setState({
      currentPageIndex: currentPageIndex+1,
      startIndex: startIndex + 10,
      currentDatas,
    })
  }

  handleSearch = ({column, val})=>{
    // const {searchingValues} = this.state
    const searchingValues = {}
    val = val.toUpperCase()
    searchingValues[column] = val
    // console.log(searchingValues)
    this.searchDatas(column, val)
    this.setState({
      currentPageIndex: 1,
      searchingValues,
    })
  }

  searchDatas = (column, val) => {
    const {data} = this.props
    let filterDatas = []
    if(isNull(val) || isEmpty(val)){
      filterDatas = data
    } else {
      filterDatas = filter(data, item=>{
        return startsWith(item[column], val)
      })
      // console.log(filterDatas.length)
    }
    
    this.setState({
      filterDatas,
    })
    this.generalCurrentDatas(filterDatas)
  }

  generalCurrentDatas = (filterDatas)=>{
    const {startIndex} = this.state
    const currentDatas = []
    for (let index = 0; index < startIndex; index++) {
      if(index < filterDatas.length){
        currentDatas.push(filterDatas[index])
      }
    }
    // console.log(startIndex)
    this.setState({
      currentDatas,
    })
  }

  render() {
    const {currentDatas, searchingValues, filterDatas, currentPageIndex} = this.state
    return (
      <div className="DataTable">
        <div className='table--container'>
          <div className='table--header'>
            {this.props.selectedColumns.map(selectedColumn => (
              <div className='table--th' key={`input_${selectedColumn}`}>
                {selectedColumn}
                {/*console.log(searchingValues)*/}
                <input 
                  type='text'
                  placeholder='type to search'
                  value={searchingValues[selectedColumn] || ''}
                  onChange={evt=>this.handleSearch({
                    column: selectedColumn,
                    val: evt.target.value,
                  })}
                />
              </div>
            ))}
          </div>
          <div className='table--body'>
          {currentDatas.map(row => (
            <div className='table--body-tr' key={row.base_id}>
              {this.props.selectedColumns.map(selectedColumn => (
                <div className='table--body-td' key={`td_${selectedColumn}`}>{row[selectedColumn]}</div>
              ))}
            </div>
          ))}
          </div>
          <div className='operation-buttons'>
            <div className='prepage'>
              <a onClick={this.generalPrePage}>&lt; &lt; Load Pre 10 Rows</a>
            </div>
            <div className='totals'>
              [{currentDatas.length * currentPageIndex} of {filterDatas.length} Rows]
            </div>
            <div className='nextpage'>
              <a onClick={this.generalNextPage}>Load Next 10 Rows &gt;&gt; </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DataTable;