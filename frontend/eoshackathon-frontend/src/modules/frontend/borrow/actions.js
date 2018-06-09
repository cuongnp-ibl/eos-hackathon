import { createAction } from 'redux-actions'
import { MODULE_NAME } from './model'

// Update product detail info
export const postBorrow = createAction(`${MODULE_NAME}_postBorrow`)
export const getBorrowHistory = createAction(`${MODULE_NAME}_getBorrowHistory`)
