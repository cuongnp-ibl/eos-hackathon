import { combineReducers } from 'redux'
import { MODULE_NAME as HOME_MODULE_NAME } from '../modules/frontend/home/model'
import homeReducer from '../modules/frontend/home/reducers'

export default combineReducers({
  [HOME_MODULE_NAME]: homeReducer
})
