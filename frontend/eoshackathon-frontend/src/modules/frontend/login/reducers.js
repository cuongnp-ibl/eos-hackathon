import { handleActions } from 'redux-actions'

import * as actions from './actions'

const defaultState = {
  user: {
    'userId': 123,
    'level': 1, // 2, 3,...
    'userName': 'trieucuong',
    'score': 100
  }
}

const handlers = {
  [actions.login]: (state, action) => ({
    ...state,
    ...{ user: action.payload }
  })
}

export default handleActions(handlers, defaultState)
