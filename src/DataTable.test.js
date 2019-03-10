import React from 'react';
import ReactDOM from 'react-dom';
import DataTable from './components/DataTable';
import {getRandomData} from './config'

it('renders DataTable with init datas', (done) => {
  const div = document.createElement('div');
  const datatable = ReactDOM.render(<DataTable
    data={getRandomData(500)}
    selectedColumns={['base_id', 'mo_id', 'who_id', 'country']}
    searchingValues={{}}
    getAllDatas={()=>{}}
    />, div);
  expect(datatable.props.data.length).toBe(500)
  datatable.handleSearch({
    column: 'bid_id',
    val: 'xxx',
  })
  setTimeout(()=>{
    expect(datatable.state.filterDatas.length).toBe(0)
    done()
  }, 1000)
  ReactDOM.unmountComponentAtNode(div);
});
