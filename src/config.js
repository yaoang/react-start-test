import {slice} from 'lodash'
export const CONFIGURES = {
  datas: [],
}

export function initDatas(dataSize) {
  return new Promise((resolve, reject) => {
    try {
      const datas = getRandomData(dataSize)
      resolve(datas)
    } catch (ex) {
      reject(ex)
    }
  })
}

export function setDatas(datas) {
  return new Promise(resolve=>{
    CONFIGURES.datas = datas
    resolve(true)
  })
}

export function getDatas(dataSize = 5000) {
  return new Promise((resolve)=>{
    setTimeout(()=>{
      // console.log('time out', CONFIGURES.datas.length)
      const arrays = slice(CONFIGURES.datas, 0, dataSize)
      resolve(arrays)
    }, 500)
  })
}

export const DEFAULT_DATAREDUCER = {
  data: [],
  allColumns: ['base_id', 'mo_id', 'dyna_id', 'who_id', 'clo_id', 'company', 'country', 'address', 'sr_ranking', 'pp_ranking'],
  selectedColumns: ['base_id', 'mo_id', 'who_id', 'country'],
  sortingColumn: 'base_id',
  orderBy: 'asc',
  searchingValues: {},
}

export function getRandomData(rows) {
  var randomData = []
  for (var i = 0; i < rows; i++) {
    randomData.push({
      base_id: 'BID' + getRandomInt(1000000, 9999999),
      mo_id: 'S' + getRandomInt(100000000, 999999999),
      dyna_id: 'SA' + getRandomInt(10000000, 99999999),
      who_id: 'WH' + getRandomInt(10000000, 99999999),
      clo_id: 'cl' + getRandomInt(100000, 999999),
      company: getRandomLengthString(),
      country: getRandomLengthString(),
      address: getRandomInt(1, 1500) + ' ' + getRandomLengthString() + ' ' + getRandomLengthString() + ' ' + getRandomLengthString().toUpperCase(),
      sr_ranking: i + 5,
      pp_ranking: i + 30
    })
  }
  return randomData
}

function getRandomLengthString() {
  let result = "";
  let stringLength = getRandomInt(5, 15)
  for (let i = 0; i < stringLength; i++) {
    result = result + 'X';
  }
  return result;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}