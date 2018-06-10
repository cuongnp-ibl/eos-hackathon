import { handleActions } from 'redux-actions'

import * as actions from './actions'

const defaultState = {
  returnMoneyHistory: [{
    amount: 1000,
    status: ''
  }, {
    amount: 1000,
    status: ''
  }, {
    amount: 1000,
    status: ''
  } ]
}

const handlers = {
  [actions.getReturnMoneyHistory]: (state, action) => ({
    ...state,
    ...{ returnMoneyHistory: action.payload }
  })
}

export default handleActions(handlers, defaultState)
