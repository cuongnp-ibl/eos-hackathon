import { handleActions } from 'redux-actions'

import * as actions from './actions'

const defaultState = {
  borrowHistory: [
    {'id': 1, 'borrower': 'a.borrower', 'quantity': 3}
  ]
}

const handlers = {
  [actions.getBorrowHistory]: (state, action) => ({
    ...state,
    ...{ borrowHistory: action.payload }
  })
}

export default handleActions(handlers, defaultState)
