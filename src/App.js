import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers/reducer.js'
import thunk from 'redux-thunk'

import DataTableContainer from './components/DataTableContainer.js';
import ColumnSelectorContainer from './components/ColumnSelectorContainer.js';

import './App.scss';

const store = createStore(reducer, applyMiddleware(thunk))

class App extends Component {
  render() {
    return (
      <div className="App">

        <Provider store={store}>
          <header>
            <div className='title'>
              Big Data System
            </div>
          </header>
          <div className="Content">
            <ColumnSelectorContainer />
            <DataTableContainer />
          </div>
        </Provider>


      </div>
    );
  }
}

export default App;
