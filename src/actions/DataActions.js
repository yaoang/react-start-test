import { getDatas } from '../config'
export const ADD_FILTER = 'ADD_FILTER'
export const REMOVE_FILTER = 'REMOVE_FILTER'
export const ADD_COLUMN = 'ADD_COLUMN'
export const REMOVE_COLUMN = 'REMOVE_COLUMN'
export const GET_ALL_DATAS = 'GET_ALL_DATAS'

export function addColumn(column) {
	return {
		type: ADD_COLUMN,
		column: column
	}
}

export function removeColumn(column) {
	console.log(column)
	return {
		type: REMOVE_COLUMN,
		column: column
	}
}

export function getAllDatas(dataSize) {
	// console.log(dispatch)
	return dispatch => {
		getDatas(dataSize).then(datas => {
			dispatch({
				type: GET_ALL_DATAS,
				datas,
			})
		})
	}
}
