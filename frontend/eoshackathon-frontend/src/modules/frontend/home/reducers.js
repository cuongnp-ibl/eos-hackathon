import { handleActions } from 'redux-actions'

import * as actions from './actions'

const defaultState = {
  tokenStatus: {
    'currentLending': 1000000,
    'availabe': 20000000
  },
  balance: {
    eos: {
      balance: 1000
    },
    eth: {
      balance: 100
    },
    btc: {
      balance: 100
    }
  },
  donateHistory: [{
    'id': '1',
    'from': 'daicuong',
    'amount': '100',
    'type': 'EOS',
    'memo': 'Hope this help!',
    'donateDate': 1528553367201,
    'converToFiatDate': 1528553367201,
    'fiat': '2000',
    'status': 'donated'
  },
  {
    'id': '2',
    'from': 'daicuong',
    'amount': '100',
    'type': 'EOS',
    'memo': 'Hope this help!',
    'donateDate': 1528553367201,
    'converToFiatDate': 1528553367201,
    'fiat': '20000',
    'status': 'inreview'
  }]
}

const handlers = {
  [actions.getDonationHistory]: (state, action) => ({
    ...state,
    ...{ donateHistory: action.payload }
  }),
  [actions.getBalance]: (state, action) => ({
    ...state,
    ...{ balance: action.payload }
  }),
  [actions.getTokenStatus]: (state, action) => ({
    ...state,
    ...{ tokenStatus: action.payload }
  })
}

export default handleActions(handlers, defaultState)
