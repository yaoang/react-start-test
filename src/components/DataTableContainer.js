import DataTable from './DataTable.js'
import { connect } from 'react-redux'
import { getAllDatas } from '../actions/DataActions.js'

const mapStateToProps = state => {
    return {
        data: state.DataReducer.data,
        selectedColumns: state.DataReducer.selectedColumns,
        searchingValues: state.DataReducer.searchingValues,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllDatas: (dataSize) => dispatch(getAllDatas(dataSize)),
    }
}

const DataTableContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(DataTable)

export default DataTableContainer