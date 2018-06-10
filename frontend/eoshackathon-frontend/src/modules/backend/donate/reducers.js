import { handleActions } from 'redux-actions'

import * as actions from './actions'

const defaultState = {
  tokenStatus: {
    'currentLending': 1000000,
    'availabe': 20000000
  },
  donateHistory: [{
    from: 'jeb',
    amount: '1000 EOS',
    note: 'hope for help',
    date: 1528530221618
  }, {
    from: 'alice',
    amount: '50 EOS',
    note: '',
    date: 1528530221618
  }, {
    from: 'donal',
    amount: '1000000 EOS',
    note: 'from donal with love',
    date: 1528530221618
  } ]
}

const handlers = {
  [actions.getDonationHistory]: (state, action) => ({
    ...state,
    ...{ donateHistory: action.payload }
  }),
  [actions.getTokenStatus]: (state, action) => ({
    ...state,
    ...{ tokenStatus: Object.assign({}, action.payload) }
  })
}

export default handleActions(handlers, defaultState)
