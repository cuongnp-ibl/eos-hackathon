import { handleActions } from 'redux-actions'

import * as actions from './actions'

const defaultState = {
  borrowHistory: [{
    amount: 1000,
    start: 1528530221618,
    end: 1528530221618,
    status: 'INREVIEW' // INREVIEW, BORROWING, BACK, OVER
  }, {
    amount: 1000,
    start: 1528530221618,
    end: 1528530221618,
    status: 'INREVIEW' // INREVIEW, BORROWING, BACK, OVER
  }, {
    amount: 1000,
    start: 1528530221618,
    end: 1528530221618,
    status: 'INREVIEW' // INREVIEW, BORROWING, BACK, OVER
  } ]
}

const handlers = {
  [actions.getBorrowHistory]: (state, action) => ({
    ...state,
    ...{ borrowHistory: action.payload }
  })
}

export default handleActions(handlers, defaultState)
