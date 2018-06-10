import { createAction } from 'redux-actions'
import { MODULE_NAME } from './model'

// Update product detail info
export const postMoneyBack = createAction(`${MODULE_NAME}_postMoneyBack`)
