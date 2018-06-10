import { handleActions } from 'redux-actions'

import * as actions from './actions'

const defaultState = {}

const handlers = {}

export default handleActions(handlers, defaultState)
