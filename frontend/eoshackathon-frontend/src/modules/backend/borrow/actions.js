import { createAction } from 'redux-actions'
import { MODULE_NAME } from './model'

// Update product detail info
export const getBorrowHistory = createAction(`${MODULE_NAME}_getBorrowHistory`)
export const postVerifyBorrow = createAction(`${MODULE_NAME}_postVerifyBorrow`)
