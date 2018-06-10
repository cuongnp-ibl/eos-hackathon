import { handleActions } from 'redux-actions'

import * as actions from './actions'

const defaultState = {
  user: {
    '_id': '5b1c79b503f07210e0bb8974', 'email': 'bob@pen.com', 'eosAccountName': 'a.borrower'
  }
}

const handlers = {
  [actions.login]: (state, action) => ({
    ...state,
    ...{ user: Object.assign({}, action.payload) }
  })
}

export default handleActions(handlers, defaultState)
